import { Bodies, Vector } from "matter-js";
import { Component } from "../Component";

export class Wing extends Component {
    constructor(position: Vector, mirror: boolean = false) {
        super(position);

        const verts: Vector[] = [];

        verts.push(Vector.create(-50, -320));
        verts.push(Vector.create(0, -300));
        verts.push(Vector.create(200, -150));
        verts.push(Vector.create(300, -50));
        verts.push(Vector.create(300, 0));
        verts.push(Vector.create(0, 0));

        if (!mirror) {
            this.setBody(Bodies.fromVertices(position.x, position.y, [verts]));
        }
        else {
            this.setBody(Bodies.fromVertices(position.x, position.y, [verts.map((v => Vector.create(v.x, -v.y)))]));
        }
    }
}