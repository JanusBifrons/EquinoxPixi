'use client'

import { Body, Engine, IEventCollision, Vector } from "matter-js";
import { Player } from "./Player";
import { Matter } from "./matter/Matter";
import { GameObject } from "./objects/GameObject";
import { Havoc } from "./objects/ships/fighters/Havoc";
import { Pixi } from "./pixi/Pixi";
import { Input } from "@/components/Input";
import { Debug } from "./objects/ships/Debug";
import { hasValue } from "@/app/util";
import { EGameObjectType } from "./objects/GameObjectTypes";
import { Ship } from "./objects/ships/Ship";
import { IFiredEventArgs } from "./Args";
import { Scrap } from "./objects/Scrap";
import { Indicators } from "./ui/Indicators";

export class Game {

    ///
    /// PRIVATE
    ///
    private _matter: Matter;
    private _pixi: Pixi;
    private _gameObjects: GameObject[] = [];
    private _player: Player;
    private _indicators: Indicators;

    constructor(canvas: HTMLCanvasElement) {
        this._matter = new Matter();
        this._pixi = new Pixi();

        // Attach events
        this._matter.beforeUpdate.addHandler(this.update.bind(this));
        this._matter.collisionStart.addHandler(this.onCollision.bind(this));

        // Start the engine
        this._matter.startEngine();

        // Start the pixi renderer
        this._pixi.start(canvas);

        // Start the renderer
        //this._matter.startRenderer(canvas);

        // Create the player
        this.createPlayer();

        // Create the UI
        this.createUI();

        //this.addGameObjects(new Havoc(Vector.create(500, 0)));

        // Create debug ships
        for (let i = 0; i < 100; i++) {
            this.addGameObjects(new Havoc(Vector.create(Math.random() * 50000, Math.random() * 50000)));
        }
    }

    ///
    /// PUBLIC
    ///

    public createUI(): void {
        this._indicators = new Indicators(this._player);

        this._pixi.addContainers([this._indicators.container]);
    }

    public createPlayer(): void {
        //this._player = new Player(new Debug(Vector.create(0, 0)));
        this._player = new Player(new Havoc(Vector.create(25000, 25000)));

        this.addGameObjects(this._player.ship);

        this._matter.lookAt = this._player.ship;
    }

    public addShipEvents(ship: Ship): void {
        ship.fired.addHandler((sender: Ship, args: IFiredEventArgs) => {
            this.addGameObjects(...args.projectiles);
        });

        ship.destroyed.addHandler(() => {
            const childComponents: Body[] = ship.body.parts.slice(1);

            this.addGameObjects(...childComponents.map(cp => new Scrap(cp)));
        });
    }

    public addGameObjects(...gameObjects: GameObject[]): void {
        // Add the objects to the array for tracking/updating
        this._gameObjects.push(...gameObjects);

        // Check if they're ships and attach the events if they are
        gameObjects.forEach((go) => {
            if (go.type == EGameObjectType.Ship) {
                this.addShipEvents(go as Ship)
            }
        });

        // Extract all of the bodies so we can add them at once
        const bodys = gameObjects.map(go => go.body);

        // Extract all of the containers 
        const containers = gameObjects.map(go => go.container);

        // Add the bodies as one group for efficiency 
        this._matter.addBodys(bodys);
        this._pixi.addContainers(containers);
    }

    public removeGameObjects(...gameObjects: GameObject[]) {
        // Remove the objects from the array
        gameObjects.forEach(go => this._gameObjects.splice(this._gameObjects.indexOf(go), 1));

        // Extract all of the bodies so we can remove them at once
        const bodys = gameObjects.map(go => go.body);

        // Extract all of the containers 
        const containers = gameObjects.map(go => go.container);

        // Add the bodies as one group for efficiency 
        this._matter.removeBodys(bodys);
        this._pixi.removeContainers(containers);
    }

    public update(): void {
        Input.Update();

        for (const gameObject of this._gameObjects) {
            gameObject.update();
        }

        this._indicators.update(this._gameObjects);

        this._player.update();
        this._pixi.update(this._player.ship.position);
    }


    ///
    /// EVENT HANDLERS
    ///

    public onCollision(sender: Matter, e: IEventCollision<Engine>): void {
        for (const collision of e.pairs) {
            const bodyA: Body = collision.collision.parentA ? collision.collision.parentA : collision.bodyA;
            const bodyB: Body = collision.collision.parentB ? collision.collision.parentB : collision.bodyB;

            const gameObjectA = this._gameObjects.find(obj => obj.id == bodyA.id);
            const gameObjectB = this._gameObjects.find(obj => obj.id == bodyB.id);

            this.onHandleCollision(gameObjectA, gameObjectB);
        }
    }

    public onHandleCollision(gameObjectA: GameObject, gameObjectB: GameObject): void {
        if (hasValue(gameObjectA)) {
            switch (gameObjectA.type) {
                case EGameObjectType.Ship:
                    if (hasValue(gameObjectB)) {
                        if (gameObjectB.type == EGameObjectType.Projectile) {
                            const ship = gameObjectA as Ship;
                            ship.destroy();

                            this.removeGameObjects(gameObjectA, gameObjectB);
                            return;
                        }
                    }
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

                            this.removeGameObjects(gameObjectA, gameObjectB);
                            return;
                        }
                    }
                    break;
            }
        }
    }
}