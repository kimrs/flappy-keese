import * as PIXI from 'pixi.js';
import Bezier from 'bezier-js';
import {Point} from './point';

export class Curve {
    public transform: PIXI.Matrix;
    private nSteps: number;
    private width: number;
    private _handle: PIXI.Point;
    private _container: PIXI.Container;
    private _curve: Bezier;

    public constructor(transform: PIXI.Matrix, angle: number, handle: PIXI.Point) {
        this.nSteps = 13;
        this.width = 120;

        const srcHandle = transform.clone()
                            .append(PIXI.Matrix.IDENTITY.rotate(Math.PI))
                            .apply(handle);
        
        const nextTransform = new PIXI.Matrix()
            .translate(0, 1)
            .rotate(angle);
        transform.append(nextTransform);

        this._handle  = new PIXI.Point(-0.6 + Math.random() * 1.6 , -0.6);
        const trgHandle = transform.apply(this._handle);
        const target  = transform.apply(new PIXI.Point(0, 0));
        const source = transform.apply(new PIXI.Point(0, -1));

        this._curve = new Bezier(   source.x,  source.y, 
                                    srcHandle.x, srcHandle.y,
                                    trgHandle.x, trgHandle.y,
                                    target.x, target.y);
        
        this.transform = transform;
        const container = new PIXI.Container();

        const background = Curve.genBackground(this._curve);
        //container.addChild(background);

        const mask = Curve.genMask(this._curve, this.width, this.nSteps);
        container.addChild(mask);
        //background.mask = mask;

        //container.addChild(Curve.genDbgGraphics(curve, this.width, this.nSteps));

        this._container = container;
    }

    public point(at: number) : Point {
        const position = this._curve.get(at);
        const dv = this._curve.derivative(at);
        const rotation = Math.PI + Math.atan2(dv.y, dv.x);

        return new Point(position.x, position.y, rotation, at);
    }

    public project(at: Point) : Point {
        const pt = this._curve.project(at);
        const t = pt.t ? pt.t : 0.0;
        var dv = this._curve.derivative(t);
        dv = dv ? dv : new Point(0, 0, 0, 0);
        const rotation = Math.PI + Math.atan2(dv.y, dv.x);

        return new Point(pt.x, pt.y, rotation, t);
    }

    public get handle() { return this._handle; }

    public get container() { return this._container; }

    private static genBackground(curve: Bezier)
    {
        const bg = PIXI.Sprite.from('res/asphalt.png');
        bg.anchor.set(0.5);
        bg.x = curve.points[0].x;
        bg.y = curve.points[0].y;

        return bg;
    }

    private static genMask(curve: Bezier, width: number, nSteps:number)
    {
        const vertices = Curve.toVertices(curve, width, nSteps);
        const mask = new PIXI.Graphics();
        mask.lineStyle(1);
        mask.beginFill(0x545499, 0.6);
        mask.drawPolygon(vertices);
        mask.endFill();

        return mask;
    }

    private static genDbgGraphics(curve: Bezier, width: number, nSteps:number) {
        const dbgGraphics = new PIXI.Graphics();
        dbgGraphics.beginFill(0x00F9F9, 0.6);
        dbgGraphics.drawCircle(curve.points[1].x, curve.points[1].y, 10);
        dbgGraphics.endFill();
        dbgGraphics.beginFill(0xF900F9, 0.6);
        dbgGraphics.drawCircle(curve.points[2].x, curve.points[2].y, 10);
        dbgGraphics.endFill();
        dbgGraphics.lineStyle(1);

        const step = 1/nSteps;
        for(let t=0.0; t <= 1.0; t += step) {
            if(t==0.0)
                dbgGraphics.beginFill(0xFF0000, 0.6);
            else if(t >= 0.999)
                dbgGraphics.beginFill(0x0000FF, 0.6);
            else
                dbgGraphics.beginFill(0xFFFF00, 0.6);
            const pt = curve.get(t);
            const nv = curve.normal(t);
            dbgGraphics.moveTo(pt.x - width*nv.x, pt.y - width*nv.y);
            dbgGraphics.lineTo(pt.x + width*nv.x, pt.y + width*nv.y);
            dbgGraphics.endFill();
        }

        return dbgGraphics;
    }
    
    private static toVertices(curve:Bezier, d:number, steps:number) {
        let vertices = [];
        const step = 1/steps;
        //d = -d;
        for(let t=0.0; t<=1.0; t+=step) {
            const pt = curve.get(t);
            const nv = curve.normal(t);

            vertices.push(pt.x + d*nv.x);
            vertices.push(pt.y + d*nv.y);
        }

        d = -d;
        for(let t=1; t>= 0; t-=step) {
            const pt = curve.get(t);
            const nv = curve.normal(t);

            vertices.push(pt.x + d*nv.x);
            vertices.push(pt.y + d*nv.y);
        }

        return vertices;
    }
}