import { TrackQueue } from "./trackQueue";
import {IUpdateStrategy} from "./IUpdateStrategy";
import { Point } from "./point";

export class FollowTrackUpdateStrategy implements IUpdateStrategy {
    private _trackQueue:TrackQueue;

    constructor(trackQueue: TrackQueue) {
        this._trackQueue = trackQueue;
    }

    public update(): Point {
        return this._trackQueue.current.point();
    }
}