'use client'

import { Vector } from "matter-js";
import { Player } from "./Player";
import { Matter } from "./matter/Matter";
import { GameObject } from "./objects/GameObject";
import { Havoc } from "./objects/ships/fighters/Havoc";
import { Pixi } from "./pixi/Pixi";
import { Input } from "@/components/Input";

export class Game {

    ///
    /// PRIVATE
    ///
    private _matter: Matter;
    private _pixi: Pixi;
    private _gameObjects: GameObject[] = [];
    private _player: Player;

    constructor(canvas: HTMLCanvasElement) {
        this._matter = new Matter();
        this._pixi = new Pixi();

        // Attach events
        this._matter.beforeUpdate.addHandler(this.update.bind(this));

        // Start the engine
        this._matter.startEngine();

        // Start the pixi renderer
        this._pixi.start(canvas);

        // Start the renderer
        //this._matter.startRenderer(canvas);

        // Create the player
        this.createPlayer();
    }

    ///
    /// PRIVATE
    ///

    public createPlayer(): void {
        this._player = new Player(new Havoc(Vector.create(-200, 0)));

        this.addGameObjects(this._player.ship);

        this._matter.lookAt = this._player.ship;
    }

    public addGameObjects(...gameObjects: GameObject[]): void {
        // Add the objects to the array for tracking/updating
        this._gameObjects.push(...gameObjects);

        // Extract all of the bodies so we can add them at once
        const bodys = gameObjects.map(go => go.body);

        // Extract all of the containers 
        const containers = gameObjects.map(go => go.container);

        // Add the bodies as one group for efficiency 
        this._matter.addBodys(bodys);
        this._pixi.addContainers(containers);
    }

    ///
    /// PUBLIC
    ///

    public update(): void {
        Input.Update();

        for (const gameObject of this._gameObjects) {
            gameObject.update();
        }

        this._player.update();
        this._pixi.update(this._player.ship.position);
    }
}