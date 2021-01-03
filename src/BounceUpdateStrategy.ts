import { TrackQueue } from "./trackQueue";
import {IUpdateStrategy} from "./IUpdateStrategy";
import { Point } from "./point";

export class BounceUpdateStrategy implements IUpdateStrategy {
    private fall: number = -3;
    private acceleration: number = 0.15;
    constructor(private trackQueue: TrackQueue, private y:number, private hitDetection:()=>void) {
     }

    public update(): Point {
        this.y += this.fall;
        this.fall += this.acceleration;
        
        const cp = this.trackQueue.current.point();
        const np = new Point(cp.x, this.y, cp.r, cp.t);

        const closestToPlayer = this.trackQueue.current.project(np);
        if(closestToPlayer.distance(np) > 50)
            this.hitDetection();

        return np;
    }
}