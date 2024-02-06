import Matter, { Body, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";
import { Graphics } from "@pixi/graphics";
import { Container } from "pixi.js";
import { Colour } from "@/components/Colour";

export abstract class Component extends GameObject {
    constructor(position: Vector) {
        super(position, EGameObjectType.Component);
    }
}