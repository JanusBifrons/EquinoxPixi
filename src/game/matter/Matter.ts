import { hasValue } from "@/app/util";
import { Event } from "@/components/Event";
import { Body, Composite, Engine, Events, IRunnerOptions, Render, Runner, Vector, World } from "matter-js";
import { Ship } from "../objects/ships/Ship";

export class Matter {
    ///
    /// PRIVATE
    ///
    private _engine: Engine;
    private _world: World;
    private _runner: Runner;
    private _render: Render;
    private _lookAt: Ship;

    ///
    /// EVENTS
    ///
    public beforeUpdate: Event = new Event();

    constructor() {
    }

    ///
    /// PUBLIC
    ///

    public addBodys(bodys: Body[]): void {
        Composite.add(this._world, bodys);
    }

    public startEngine(): void {
        // Create a MatterJS engine
        this._engine = Engine.create({
            enableSleeping: true
        });

        // Keep a direct reference to the game world
        this._world = this._engine.world;

        // Disable gravity by default
        this._engine.gravity.x = 0
        this._engine.gravity.y = 0;

        this._runner = Runner.create();

        Runner.run(this._runner, this._engine);

        Events.on(this._runner, 'beforeUpdate', this.onBeforeUpdate.bind(this));
    }

    public startRenderer(canvas: HTMLCanvasElement, options?: Matter.IRendererOptions): void {
        this._render = Render.create({
            canvas: canvas,
            engine: this._engine,
            options: {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                showSleeping: true,
                //background: 'transparent',
                //wireframeBackground: 'transparent',
                //showAxes: true,
                //showBounds: true,
                showCollisions: true,
                showVelocity: true,
                showDebug: true,
                showInternalEdges: true,
                showConvexHulls: true,
                //showIds: true,
                //showMousePosition: true,
                //showPositions: true,
                wireframes: false,
                //wireframeBackground: 'black'
            },
        });

        // Begin the renderer
        Render.run(this._render);
    }

    public stopRenderer(): void {
        Render.stop(this._render);
    }

    ///
    /// EVENT HANDLERS
    ///

    public onBeforeUpdate(): void {
        this.beforeUpdate.raise(this);

        if (hasValue(this._lookAt)) {
            //Render.lookAt(this._render, this._player.ship, Vector.create(500, 500), true);
            Render.lookAt(this._render, this._lookAt, Vector.create(2500, 2500), true);
        }
    }

    ///
    /// PROPERTIES
    ///

    public get lookAt(): Ship {
        return this._lookAt;
    }

    public set lookAt(ship: Ship) {
        this._lookAt = ship;
    }
}