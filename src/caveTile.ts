import * as PIXI from 'pixi.js';

export class CaveTile
{
    private _graphics: PIXI.Graphics;

    public constructor(q: number, r:number, t:PIXI.Transform)
    {
        const size = 50;
        const r3 = Math.sqrt(3);

        const vPath = [ 
            new PIXI.Point(  0.0,   1.0),
            new PIXI.Point( r3/2,   0.5),
            new PIXI.Point( r3/2,  -0.5),
            new PIXI.Point(  0.0,  -1.0),
            new PIXI.Point(-r3/2,  -0.5),
            new PIXI.Point(-r3/2,   0.5)]

        var path:PIXI.Point[] = new Array(6);

        const transformation = new PIXI.Matrix()
            .translate(q * size, r * size);
        
        const d = transformation.apply(new PIXI.Point(0.0, 0.0));
            
        for(var i = 0; i<6; i++)
            path[i] = transformation.apply(vPath[i]);


        this._graphics = new PIXI.Graphics();
        this._graphics.beginFill(0xDE3249);
        this._graphics.drawPolygon(path);
        this._graphics.endFill();

    //    this._graphics.beginFill(0x0E3249);
    //    this._graphics.drawCircle(t.position.x, t.position.y, 20);
    //    this._graphics.endFill();
    }

    get container() { return this._graphics; }
}