import { Curve } from './curve';
import { Point as PixiPoint, Matrix, Texture } from 'pixi.js';
import { Point } from './point';

export class TrackSegment {
    private _curve: Curve;
    private _next?: TrackSegment;
    private _step: number;

    public constructor(rotation: number, previous: TrackSegment|null) {
        const transform = previous 
            ? previous.curve.transform 
            : new Matrix().translate(0,1).scale(400,400);

        const handle = previous 
            ? previous.curve.handle 
            : new PixiPoint();

        this._curve = new Curve(transform, rotation, handle);
        this._step = 0;

    }

    public step(delta:number): Point {
        this._step += delta;
        return this._curve.point(this._step);
    }

    public to(delta:number): Point {
        this._step = delta;
        return this._curve.point(this._step);
    }

    public project(point:Point): Point {
        return this._curve.project(point);
    }


    set next(value:TrackSegment) { 
        this._next = value; 
    }

    get next() {
        if(this._next) 
            return this._next;
        else 
            throw new Error("Next segment is not assigned");
    }

    get curve() { return this._curve; }
}