import { TrackQueue } from "../trackQueue";
import {IUpdateStrategy} from "./IUpdateStrategy";
import { Point } from "../point";

export class FollowTrackUpdateStrategy implements IUpdateStrategy {

    constructor(private trackQueue: TrackQueue) { }

    setAcceleration(acceleration: number): void {
    }

    public update(): Point {
        //return this.trackQueue.current.step(0.005);
        return this.trackQueue.current.step(0.005);
    }
}