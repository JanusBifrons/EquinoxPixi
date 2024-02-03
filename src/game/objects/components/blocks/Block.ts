import { Component } from "../Component";
import { Bodies, Vector, Body } from "matter-js";

export class Block extends Component {
    constructor(position: Vector, public width: number, public height: number) {
        super(position);

        this.setBody(Bodies.rectangle(position.x, position.y, this.width, this.height));
    }
}