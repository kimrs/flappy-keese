import { TrackQueue } from "./trackQueue";
import {IUpdateStrategy} from "./IUpdateStrategy";
import { Point } from "./point";

export class FollowTrackUpdateStrategy implements IUpdateStrategy {

    constructor(private trackQueue: TrackQueue) { }

    public update(): Point {
        return this.trackQueue.current.point();
    }
}