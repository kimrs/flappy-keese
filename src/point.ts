
export class Point {
    x: number;
    y: number;
    r: number;
    t: number;

    constructor(x:number, y:number, r:number, t:number)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.t = t;
    }

    public distance = (to: Point) => ((x:number, y:number) => Math.sqrt(x*x + y*y))(this.x - to.x, this.y - to.y);
}