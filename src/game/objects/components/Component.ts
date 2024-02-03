import Matter, { Body, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";

export abstract class Component extends GameObject {
    constructor(position: Vector) {
        super(position, EGameObjectType.Component);
    }
}