import Matter, { Body, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";
import { Graphics } from "pixi.js";

export abstract class Component extends GameObject {

    ///
    /// PRIVATE
    ///
    private _offset: Vector;

    constructor(position: Vector) {
        super(position, EGameObjectType.Component);

        this._offset = position;

        console.log(this._offset);
    }
}