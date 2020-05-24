import { TrackQueue } from "./trackQueue";
import { IUpdateStrategy } from "./IUpdateStrategy";
import { Car } from "./car";
import { Point } from "./point";

export class FollowTrackAngleAndCarPositionUpdateStrategy implements IUpdateStrategy {
    private _trackQueue:TrackQueue;
    private _car:Car;

    constructor(trackQueue: TrackQueue, car: Car) {
        this._trackQueue = trackQueue;
        this._car = car;
    }

    public update(): Point {
        const ptCar = new Point(this._car.container.x, this._car.container.y, 0, 0);
        const ptTrack = this._trackQueue.current.project(ptCar);

        return new Point(ptCar.x, ptCar.y, ptTrack.r, ptTrack.t);
    }
}