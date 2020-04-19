
function init() {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    const trackContainer = new PIXI.Container();
    trackContainer.x = app.screen.width/2;
    trackContainer.y = app.screen.height/2;

    app.stage.addChild(trackContainer);

    let transform = new PIXI.Matrix();
    transform.translate(0, 1);
    transform.scale(100, 100);
    
    const curve1 = new Curve(transform, Math.PI/2, new PIXI.Point(0, 0));
    trackContainer.addChild(curve1.container);

    const curve2 = new Curve(curve1.transform, Math.PI/8, curve1.handle);
    trackContainer.addChild(curve2.container);

    const curve3 = new Curve(curve2.transform, Math.PI/8, curve2.handle);
    trackContainer.addChild(curve3.container);

    const curve4 = new Curve(curve3.transform, Math.PI/8, curve3.handle);
    trackContainer.addChild(curve4.container);
}

class TrackQueue {

}

class Curve {

    constructor(transform, angle, handle) {
        this.nSteps = 6;
        this.width = 20;

        const srcHandle = transform.clone()
                            .append(PIXI.Matrix.IDENTITY.rotate(Math.PI))
                            .apply(handle);
        
        const nextTransform = new PIXI.Matrix();
        nextTransform.translate(0, 1);
        nextTransform.rotate(angle);
        transform.append(nextTransform);

        this._handle  = new PIXI.Point(-0.6 +   Math.random() * 1.2 , -0.5);
        const trgHandle = transform.apply(this._handle);
        const target  = transform.apply(new PIXI.Point(0, 0));
        const source = transform.apply(new PIXI.Point(0, -1));

        const curve = new Bezier(   source.x,  source.y, 
                                    srcHandle.x, srcHandle.y,
                                    trgHandle.x, trgHandle.y,
                                    target.x, target.y);
        
        this.transform = transform;
        const container = new PIXI.Container();

        const background = Curve.genBackground(curve);
        container.addChild(background);

        const mask = Curve.genMask(curve, this.width, this.nSteps);
        container.addChild(mask);
        background.mask = mask;

        container.addChild(Curve.genDbgGraphics(curve, this.width, this.nSteps));

        this._container = container;
    }
    get handle() { return this._handle; }

    get container() { return this._container; }

    static genBackground(curve)
    {
        const bg = PIXI.Sprite.from('res/asphalt.png');
        bg.anchor.set(0.5);
        bg.x = curve.points[0].x;
        bg.y = curve.points[0].y;

        return bg;
    }

    static genMask(curve, width, nSteps)
    {
        const vertices = Curve.toVertices(curve, width, nSteps);
        const mask = new PIXI.Graphics();
        mask.lineStyle(1);
        mask.beginFill(0xFF0000, 0.6);
        mask.drawPolygon(vertices);
        mask.endFill();

        return mask;
    }

    static genDbgGraphics(curve, width, nSteps) {
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
    
    static toVertices(curve, d, steps) {
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
