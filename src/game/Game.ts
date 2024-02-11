'use client'

import { Body, Engine, IEventCollision, Mouse, MouseConstraint, Vector } from "matter-js";
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
import { EUIEventType, IFiredEventArgs, IUIUpdateEventArgs, UIEventArgs } from "./Args";
import { Scrap } from "./objects/world/Scrap";
import { Indicators } from "./ui/Indicators";
import { Captial } from "./objects/ships/capitals/Capital";
import { Projectile } from "./objects/projectiles/Projectile";
import { AI } from "./ai/AI";
import { StatBar } from "./ui/StatBar";
import { Event } from "@/components/Event";

export class Game {

    ///
    /// PRIVATE
    ///
    private _matter: Matter;
    private _pixi: Pixi;
    private _gameObjects: GameObject[] = [];
    private _player: Player;
    private _AI: AI[] = [];
    private _indicators: Indicators;

    ///
    /// EVENTS
    ///
    public updateUI: Event = new Event();

    constructor() {

    }

    ///
    /// PUBLIC
    ///

    public setCanvas(canvas: HTMLCanvasElement): void {
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
        this.createPlayer(canvas);

        // Create the UI
        this.createUI();

        //this.addGameObjects(new Captial(Vector.create(10000, 0)));

        const havoc = new Havoc(Vector.create(0, 0));

        const bot = new AI(havoc, this._player.ship);

        //this.addAI(bot);

        //this.addGameObjects(new Havoc(Vector.create(500, 0)));

        // Create debug ships
        for (let i = 0; i < 100; i++) {
            //this.addGameObjects(new Havoc(Vector.create(Math.random() * 50000, Math.random() * 50000)));
        }
    }

    public addAI(ai: AI) {
        this._AI.push(ai);

        this.addGameObjects(ai.ship);
    }

    public createUI(): void {
        this._indicators = new Indicators(this._player);

        this._pixi.addContainers([this._indicators.container]);
    }

    public createPlayer(canvas: HTMLCanvasElement): void {
        this._player = new Player(new Havoc(Vector.create(-5000, 0)));
        //this._player = new Player(new Havoc(Vector.create(25000, 25000)));

        this.addGameObjects(this._player.ship);

        this._matter.lookAt = this._player.ship;
    }

    public attachShipEvents(ship: Ship): void {
        ship.fired.addHandler((sender: Ship, args: IFiredEventArgs) => {
            this.addGameObjects(...args.projectiles);
        });
    }

    public attachGameObjectEvents(gameObject: GameObject): void {
        gameObject.destroyed.addHandler(() => {
            if (gameObject.type == EGameObjectType.Ship) {
                const childComponents: Body[] = gameObject.body.parts.slice(1);

                this.addGameObjects(...childComponents.map(cp => new Scrap(cp)));
                this.removeGameObjects(gameObject);
            }
            else {
                this.removeGameObjects(gameObject);
            }
        });
    }

    public addGameObjects(...gameObjects: GameObject[]): void {
        // Add the objects to the array for tracking/updating
        this._gameObjects.push(...gameObjects);

        // Attach events
        gameObjects.forEach((go) => {
            this.attachGameObjectEvents(go);

            if (go.type == EGameObjectType.Ship) {
                this.attachShipEvents(go as Ship)
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

    public update(sender: any, elapsedTime: number): void {
        Input.Update();

        // if (isNaN(elapsedTime)) {
        //     elapsedTime = 1000 / 60;
        // }

        console.log(elapsedTime);

        for (const gameObject of this._gameObjects) {
            gameObject.update(elapsedTime);
        }

        for (const ai of this._AI) {
            ai.update();
        }

        this.updateUI.raise(this, {
            stats: this._player.ship.stats
        } as IUIUpdateEventArgs);

        this._indicators.update(this._gameObjects);

        this._player.update();

        const x = this._player.ship.position.x - (window.innerWidth * 4);
        const y = this._player.ship.position.y - (window.innerHeight * 4);
        const lookAt: Vector = Vector.create(x, y);

        const scale = Vector.create(0.125, 0.125);

        this._pixi.update(lookAt, scale);
    }


    ///
    /// EVENT HANDLERS
    ///

    public onUIEvent(e: UIEventArgs): void {
        switch (e.type) {
            default:
            case EUIEventType.Default:
                console.log("UI Event!");
                break;

            case EUIEventType.ToggleInteralDampening:
                console.log(e.value);
                break;
        }
    }

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
        // If one or the other is null... we can't do anything
        if (!hasValue(gameObjectA) || !hasValue(gameObjectB)) {
            return;
        }

        // Get the projectile
        const projectile: Projectile = gameObjectA.type == EGameObjectType.Projectile ? gameObjectA as Projectile : gameObjectB.type == EGameObjectType.Projectile ? gameObjectB as Projectile : null;
        const gameObject: GameObject = gameObjectA.type != EGameObjectType.Projectile ? gameObjectA : gameObjectB.type != EGameObjectType.Projectile ? gameObjectB : null;

        // If there is no projectile
        if (!hasValue(projectile)) {
            return;
        }

        // If there is no non-projectile
        if (!hasValue(gameObject)) {
            return;
        }

        // Now just have the projectile hit the game object...
        gameObject.hit(projectile.damage);

        this.removeGameObjects(projectile);
    }
}