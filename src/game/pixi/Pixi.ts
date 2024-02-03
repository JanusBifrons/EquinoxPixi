'use client'

import { Application, Container, Graphics, IApplicationOptions, IPointData } from 'pixi.js';
import { GameObject } from "../objects/GameObject";
import { Body, Vector } from "matter-js";
import { hasValue } from '@/app/util';

export class Pixi {

    ///
    /// PRIVATE
    ///
    private _application: Application;
    private _stage: Container;
    private _gameObjects: GameObject[];

    constructor() {

    }

    ///
    /// PUBLIC
    ///

    public start(canvas: HTMLCanvasElement): void {
        this._application = new Application({
            view: canvas,
            resizeTo: window
        });

        this._application.ticker.add(this.draw.bind(this));

        this._stage = this._application.stage;
    }

    public update(gameObjects: GameObject[], lookAt: Vector): void {
        this._gameObjects = gameObjects;

        if (hasValue(this._application)) {
            this._stage.pivot = {
                x: lookAt.x - window.innerWidth,
                y: lookAt.y - window.innerHeight
            };

            this._stage.scale = {
                x: 0.5,
                y: 0.5
            } as IPointData;
        }
    }

    public draw(): void {

        for (const gameObject of this._gameObjects) {
            const bodyParts: Body[] = gameObject.body.parts;

            const container: Container = new Container();

            for (const part of bodyParts) {
                const graphics: Graphics = new Graphics();
                graphics.beginFill('red');

                for (let i = 0; i < part.vertices.length; i++) {


                    const vert = part.vertices[i];

                    if (i == 0) {
                        graphics.moveTo(vert.x, vert.y);
                    }
                    else {
                        graphics.lineTo(vert.x, vert.y);
                    }
                }

                graphics.closePath();
                container.addChild(graphics);
            }

            this._stage.addChild(container);
        }
    }
}