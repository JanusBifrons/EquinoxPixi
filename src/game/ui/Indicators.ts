import { Vector } from "matter-js";
import { Player } from "../Player";
import { GameObject } from "../objects/GameObject";
import { EGameObjectType } from "../objects/GameObjectTypes";
import { Colour } from "@/components/Colour";

export class Indicators {

    ///
    /// PRIVATE
    ///
    private _player: Player;
    private _gameObjects: GameObject[] = [];

    constructor(player: Player) {
        this._player = player;
    }

    public update(gameObjects: GameObject[]): void {
        this._gameObjects = gameObjects.filter(go => go.id != this._player.ship.id);
    }

    public draw(context: CanvasRenderingContext2D): void {


        for (const gameObject of this._gameObjects) {
            // console.log(gameObject);

            const difference = Vector.create(gameObject.x - this._player.ship.x, gameObject.y - this._player.ship.y);
            const angle = Math.atan2(difference.y, difference.x);
            const distance = Vector.magnitude(difference);

            if (distance < 1250) {
                continue;
            }

            let colour: Colour = Colour.White;

            switch (gameObject.type) {
                case EGameObjectType.Projectile:
                    colour = Colour.Red;
                    break;

                case EGameObjectType.Component:
                    continue;

                case EGameObjectType.Ship:
                    colour = Colour.Blue;
                    break;

                case EGameObjectType.World:
                    colour = Colour.Grey;
                    break;
            }

            const x: number = Math.cos(angle) * 250;
            const y: number = Math.sin(angle) * 250;

            context.save();
            context.translate(window.innerWidth / 2, window.innerHeight / 2);

            context.save();
            context.translate(x, y);
            context.rotate(angle);
            context.scale(0.25, 0.25);

            context.beginPath();
            context.strokeStyle = colour.toString();
            context.fillStyle = colour.toString();

            context.moveTo(-1, 1);
            context.lineTo(-1, -1);
            context.lineTo(1, 0);
            context.closePath();
            context.stroke();

            context.restore();






            //context.arc(x, y, 10, 0, Math.PI * 2);



            context.restore();
        }


    }
}