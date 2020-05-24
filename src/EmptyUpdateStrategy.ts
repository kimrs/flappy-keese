import {IUpdateStrategy} from "./IUpdateStrategy";
import {Point} from "./point";

export class EmptyUpdateStrategy implements IUpdateStrategy {

    public update(): Point{
        return new Point(0, 0, 0, 0);
    }
}