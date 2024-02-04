'use client'

import React, { RefObject } from "react";
import { ReactNode } from "react";
import { Bodies, Collision, Composite, Engine, Events, IEvent, IEventCollision, Mouse, MouseConstraint, Render, Runner, Vector, World, Body } from 'matter-js';
import { Input } from "./Input";
import { GameObject } from "@/game/objects/GameObject";
import { Player } from "@/game/Player";
import { IFiredEventArgs } from "@/game/Args";
import { Keys } from "./Keys";
import { Scrap } from "@/game/objects/Scrap";
import { EGameObjectType } from "@/game/objects/GameObjectTypes";
import { Grid } from "./Grid";
import { Indicators } from "@/game/ui/Indicators";
import { Ship } from "@/game/objects/ships/Ship";
import { Havoc } from "@/game/objects/ships/fighters/Havoc";
import { UI } from "@/game/ui/UI";
import { hasValue } from "@/app/util";

export class Game extends React.Component {

    ///
    /// PRIVATE
    ///
    private _div: RefObject<HTMLDivElement>;
    private _player: Player;
    private _gameObjects: GameObject[] = [];
    private _debugShip: Ship;
    private _UI: UI;
    private _indicators: Indicators;

    ///
    /// MATTER 
    ///
    private _engine: Engine;
    private _world: World;
    private _runner: Runner;
    private _render: Render;
    private _mouse: Mouse;

    constructor(props: any) {
        super(props);

        this._div = React.createRef();
    }

    public componentDidMount(): void {
        this.createWorld();
        this.attachMouse();
        this.createPlayer();
        this.createUI();

        this._debugShip = new Havoc(Vector.create(350, 0));
        // //this._debugShip = new Debug(Vector.create(250, 0));
        this._debugShip.body.label = "Debug Ship";

        this.addShip(this._debugShip);

        for (let i = 0; i < 10; i++) {
            this.addShip(new Havoc(Vector.create(Math.random() * 100000, Math.random() * 100000)));
        }

        for (let i = 0; i < 1; i++) {
            //this.addGameObject(new Asteroid(Vector.create(0, 0), 1000));
        }
    }

    public createUI(): void {
        this._UI = new UI(this._render.context);
        this._indicators = new Indicators(this._player);
    }

    public addShip(ship: Ship): void {
        this.addGameObjects(ship);

        ship.fired.addHandler((sender: Ship, args: IFiredEventArgs) => {
            this.addGameObjects(...args.projectiles);
        });

        ship.destroyed.addHandler(() => {
            const childComponents: Body[] = ship.body.parts.slice(1);

            this.removeGameObject(ship);

            this.addGameObjects(...childComponents.map(cp => new Scrap(cp)));
        });
    }

    public addGameObjects(...gameObjects: GameObject[]): void {
        // Add the objects to the array for tracking/updating
        this._gameObjects.push(...gameObjects);

        // Extract all of the bodies so we can add them at once
        const bodys = gameObjects.map(go => go.body);

        // Add the bodies as one group for efficiency 
        this.addBodysToWorld(bodys);
    }

    public addBodysToWorld(bodys: Body[]) {
        Composite.add(this._engine.world, bodys);
    }

    public removeGameObject(gameObject: GameObject): void {
        const index = this._gameObjects.indexOf(gameObject);
        if (index > -1) {
            this._gameObjects.splice(index, 1);
        }

        if (hasValue(gameObject?.body)) {
            Composite.remove(this._engine.world, [gameObject.body]);
        }
    }

    private createPlayer(): void {
        this._player = new Player(new Havoc(Vector.create(-200, 0)));
        //this._player = new Player(new Debug(Vector.create(0, 0)));

        this.addShip(this._player.ship);
    }

    private attachMouse(): void {
        this._mouse = Mouse.create(this._render.canvas);

        const mouseConstraint = MouseConstraint.create(this._engine, {
            mouse: this._mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            },
        });

        Composite.add(this._world, mouseConstraint);

        this._render.mouse = this._mouse;
    }

    private createWorld(): void {
        // create an engine
        this._engine = Engine.create({
            enableSleeping: true
        });

        // create a renderer
        this._render = Render.create({
            element: this._div.current,
            engine: this._engine,
            options: {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                showSleeping: true,
                //background: 'transparent',
                //wireframeBackground: 'transparent',
                //showAxes: true,
                //showBounds: true,
                showCollisions: true,
                showVelocity: true,
                showDebug: true,
                showInternalEdges: true,
                showConvexHulls: true,
                //showIds: true,
                //showMousePosition: true,
                //showPositions: true,
                wireframes: false,
                //wireframeBackground: 'black'
            },
        });

        // Keep direct ref to world
        this._world = this._engine.world;

        // Disable gravity
        this._engine.gravity.x = 0;
        this._engine.gravity.y = 0;

        // Begin the renderer
        Render.run(this._render);

        // Create the game runner
        this._runner = Runner.create();

        // Start the engine
        Runner.run(this._runner, this._engine);

        // Attach event handlers
        Events.on(this._runner, 'beforeUpdate', this.onBeforeUpdate.bind(this));
        Events.on(this._render, 'beforeRender', this.onBeforeRender.bind(this));
        Events.on(this._render, 'afterRender', this.onAfterRender.bind(this));
        Events.on(this._engine, 'collisionStart', this.onCollisionStart.bind(this));
    }

    ///
    /// EVENT HANDLERS
    ///

    public onHandleCollision(gameObjectA: GameObject, gameObjectB: GameObject): void {

        if (hasValue(gameObjectA)) {
            switch (gameObjectA.type) {
                case EGameObjectType.Ship:
                    if (hasValue(gameObjectB)) {
                        if (gameObjectB.type == EGameObjectType.Projectile) {
                            const ship = gameObjectA as Ship;
                            ship.destroy();

                            this.removeGameObject(gameObjectB);
                        }
                    }

                    break;

                case EGameObjectType.Projectile:
                    this.removeGameObject(gameObjectA);
                    break;
            }
        }


        if (hasValue(gameObjectB)) {
            switch (gameObjectB.type) {
                case EGameObjectType.Ship:
                    if (hasValue(gameObjectA)) {
                        if (gameObjectA.type == EGameObjectType.Projectile) {
                            const ship = gameObjectB as Ship;
                            ship.destroy();

                            this.removeGameObject(gameObjectA);
                        }
                    }
                    break;

                case EGameObjectType.Projectile:
                    this.removeGameObject(gameObjectB);
                    break;
            }
        }
    }

    public onCollisionStart(e: IEventCollision<Engine>): void {
        for (const collision of e.pairs) {
            const bodyA: Body = collision.collision.parentA ? collision.collision.parentA : collision.bodyA;
            const bodyB: Body = collision.collision.parentB ? collision.collision.parentB : collision.bodyB;

            const gameObjectA = this._gameObjects.find(obj => obj.id == bodyA.id);
            const gameObjectB = this._gameObjects.find(obj => obj.id == bodyB.id);

            this.onHandleCollision(gameObjectA, gameObjectB);
        }
    }

    public onBeforeRender(): void {
        if (this._world?.bodies?.length > 0) {
            Mouse.setOffset(this._mouse, this._player.ship.position);

            //Render.lookAt(this._render, this._player.ship, Vector.create(500, 500), true);
            Render.lookAt(this._render, this._player.ship, Vector.create(2500, 2500), true);
        }
    }

    public onAfterRender(): void {
        this._UI.render();
        this._indicators.draw(this._render.context);
    }

    public onBeforeUpdate(): void {
        Input.Update();

        this._player.update();

        for (const gameObject of this._gameObjects) {
            gameObject.update();
        }

        this._indicators.update(this._gameObjects);
    }

    ///
    /// PUBLIC
    ///

    public render(): ReactNode {
        return (
            <div ref={this._div} className="flex">
            </div>
        );
    }
}