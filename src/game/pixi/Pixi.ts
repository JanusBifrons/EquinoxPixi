'use client'

import { Application, Container, Graphics, IApplicationOptions, IPointData, Texture, TilingSprite } from 'pixi.js';
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

        this._stage = this._application.stage;
    }

    public addContainers(containers: Container[]): void {
        this._stage.addChild(...containers);
    }

    public removeContainers(containers: Container[]): void {
        this._stage.removeChild(...containers);
    }

    public update(lookAt: Vector): void {
        if (hasValue(this._application)) {
            this._stage.pivot = {
                x: lookAt.x - window.innerWidth * 2,
                y: lookAt.y - window.innerHeight * 2
            };

            this._stage.scale = {
                x: 0.25,
                y: 0.25
            } as IPointData;
        }
    }
}