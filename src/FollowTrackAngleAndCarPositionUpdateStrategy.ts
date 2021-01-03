import { TrackQueue } from "./trackQueue";
import { IUpdateStrategy } from "./IUpdateStrategy";
import { Bird } from "./bird";
import { Point } from "./point";

export class FollowTrackAngleAndCarPositionUpdateStrategy implements IUpdateStrategy {
    private _trackQueue:TrackQueue;
    private _bird:Bird;

    constructor(trackQueue: TrackQueue, bird: Bird) {
        this._trackQueue = trackQueue;
        this._bird = bird;
    }

    public update(): Point {
        const ptCar = new Point(this._bird.container.x, this._bird.container.y, 0, 0);
        const ptTrack = this._trackQueue.current.project(ptCar);

        return new Point(ptCar.x, ptCar.y, ptTrack.r, ptTrack.t);
    }
}