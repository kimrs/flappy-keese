import { TrackQueue } from "./trackQueue";
import {IUpdateStrategy} from "./IUpdateStrategy";
import { Point } from "./point";
import { IPoint } from "pixi.js";

export class BounceUpdateStrategy implements IUpdateStrategy {
    private fall: number = -5;
    private acceleration: number = 0.15;
    constructor(private trackQueue: TrackQueue, private playerPos:IPoint, private hitDetection:()=>void) {}

    public update(): Point {
        this.playerPos.y += this.fall;
        this.fall += this.acceleration;

        const point = this.trackQueue.current.step(0.005);
        this.playerPos.x = point.x;
        const closestToPlayer = this.trackQueue.current.project(new Point(this.playerPos.x, this.playerPos.y, 0, 0));
        const t = closestToPlayer.t > point.t ? closestToPlayer.t : point.t;
        
        this.trackQueue.current.to(t);
        const pos = new Point(this.playerPos.x, this.playerPos.y, 0, t); 

        if(closestToPlayer.distance(pos) > 120 && t < 1)  
            this.hitDetection();

        return pos;
    }
}