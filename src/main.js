
function init() {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    const container = new PIXI.Container();
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    const cur = new Curve(app.screen.width/2, app.screen.height/2);
    app.stage.addChild(cur.container);
}

class Curve {

    constructor(x, y) {
        this.nSteps = 6;
        this.width = 30;
        const cSource  = new PIXI.Point(x, y + 160);
        const cTarget  = new PIXI.Point(x, y);
        const cHandle1 = new PIXI.Point(380, 400);
        const cHandle2 = new PIXI.Point(500, 350);

        const curve = new Bezier(    cSource.x,  cSource.y, 
                                    cHandle1.x, cHandle1.y,
                                    cHandle2.x, cHandle2.y,
                                     cTarget.x,  cTarget.y);
        
        const asphalt = PIXI.Sprite.from('res/asphalt.png');
        asphalt.anchor.set(0.5);
        asphalt.x = x;
        asphalt.y = y;
                                    
        const container = new PIXI.Container();
        container.addChild(asphalt);

        const vertices = Curve.toVertices(curve, this.width, this.nSteps);
        const mask = new PIXI.Graphics();
        mask.lineStyle(1);
        mask.beginFill(0xFF0000, 0.6);
        mask.drawPolygon(vertices);
        mask.endFill();
        container.addChild(mask);
        asphalt.mask = mask;

        const dbgGraphics = new PIXI.Graphics();
        dbgGraphics.lineStyle(1);
        dbgGraphics.beginFill(0x99FF00, 0.6);
        dbgGraphics.drawCircle(cHandle1.x, cHandle1.y, 10);
        dbgGraphics.endFill();
        dbgGraphics.beginFill(0xFF9900, 0.6);
        dbgGraphics.drawCircle(cHandle2.x, cHandle2.y, 10);
        dbgGraphics.endFill();
        container.addChild(dbgGraphics);

        this._container = container;
    }

    get dbgGraphics() { return this._dbgGraphics; }
    get container() { return this._container; }
    
    static toVertices(curve, d, steps) {
        let vertices = [];
        const step = 1/steps;
        d = -d;
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
