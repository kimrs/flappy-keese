import { Curve } from './curve';
import { Point, Matrix } from 'pixi.js';

export class TrackSegment {
    private _curve: Curve;
    private _next?: TrackSegment;

    public constructor(rotation: number, previous: TrackSegment|null) {
        const transform = previous 
            ? previous.curve.transform 
            : new Matrix()
                    .translate(0,1)
                    .scale(100,100);

        const handle = previous 
            ? previous.curve.handle 
            : new Point();

        this._curve = new Curve(transform, rotation, handle);
    }

    set next(value:TrackSegment) { 
        this._next = value; 
    }
    get next() {
        if(this._next)
            return this._next;
        throw new Error("Next segment not assigned");
    }

    get curve() { return this._curve; }
}