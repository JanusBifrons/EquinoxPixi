import { Body, Vector } from "matter-js";
import { GameObject } from "./GameObject";
import { EGameObjectType } from "./GameObjectTypes";
import { Colour } from "@/components/Colour";

export class Scrap extends GameObject {
    constructor(body: Body) {
        super(body.position, EGameObjectType.Scrap);

        Body.setPosition(body, body.position);

        this.setBody([body], true);
    }
}