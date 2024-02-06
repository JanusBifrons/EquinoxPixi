import { Vector } from "matter-js";
import { Player } from "../Player";
import { GameObject } from "../objects/GameObject";
import { EGameObjectType } from "../objects/GameObjectTypes";
import { Colour } from "@/components/Colour";
import { Container, Graphics, Transform } from "pixi.js";
import { hasValue } from "@/app/util";

interface IndicatorItem {
    id: number;
    indicator: Graphics;
    distance: number;
}

export class Indicators {

    ///
    /// PRIVATE
    ///
    private _player: Player;
    private _gameObjects: GameObject[] = [];
    private _indicatorItems: IndicatorItem[] = [];
    private _container: Container;

    constructor(player: Player) {
        this._player = player;

        this._container = new Container();
    }

    public update(gameObjects: GameObject[]): void {
        this._gameObjects = gameObjects.filter(go => go.id != this._player.ship.id);

        // Keep this container in screen space
        this._container.position = Vector.sub(this._player.ship.position, Vector.create(window.innerWidth * 2, window.innerHeight * 2));

        this._gameObjects.forEach((go) => {
            const indicatorItem: IndicatorItem = this._indicatorItems.find(i => i.id == go.id);

            if (hasValue(indicatorItem)) {
                this.updateIndicator(indicatorItem, go);
            }
            else {
                this.createNewIndciator(go);
            }
        });
    }

    public createNewIndciator(gameObject: GameObject): void {
        let colour: Colour;
        let distance: number;

        switch (gameObject.type) {
            case EGameObjectType.Projectile:
                colour = Colour.Red;
                distance = 1000;
                break;

            default:
            case EGameObjectType.Ship:
                colour = Colour.Blue;
                distance = 750;
                break;

            case EGameObjectType.World:
                colour = Colour.Grey;
                distance = 600;
                break;

            case EGameObjectType.Scrap:
                colour = Colour.Grey;
                distance = 500;
                break;
        }

        const graphics = new Graphics();
        graphics.beginFill(colour.toString());
        graphics.moveTo(-25, 25);
        graphics.lineTo(-25, -25);
        graphics.lineTo(25, 0);
        graphics.closePath();
        graphics.endFill();

        const newItem = {
            id: gameObject.id,
            indicator: graphics,
            distance
        } as IndicatorItem;

        this._indicatorItems.push(newItem);

        this._container.addChild(newItem.indicator);
    }

    public updateIndicator(indicator: IndicatorItem, gameObject: GameObject): void {
        const difference = Vector.create(gameObject.x - this._player.ship.x, gameObject.y - this._player.ship.y);
        const angle = Math.atan2(difference.y, difference.x);
        const x: number = Math.cos(angle) * indicator.distance;
        const y: number = Math.sin(angle) * indicator.distance;

        indicator.indicator.position = Vector.create(window.innerWidth * 2 + x, window.innerHeight * 2 + y);
        indicator.indicator.rotation = angle;
    }

    public get container(): Container {
        return this._container;
    }
}