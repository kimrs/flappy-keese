import { Container, Graphics} from 'pixi.js';
import { IUpdateStrategy } from './IUpdateStrategy';

const MAX_RANGE =   Math.PI/2;
const MIN_RANGE = - Math.PI/2;
export class Crosshair
{
    private _arcGraphics : Graphics;
    private _crosshairGraphics : Graphics;
    private _step : number;
    private _angle : number;
    
    public constructor(container : Container, private updateStrategy: IUpdateStrategy) {
        this._step = Math.PI / 32;
        this._angle = MIN_RANGE + this._step;

        this._arcGraphics = new Graphics();
        this._arcGraphics.lineStyle(2, 0xFFFF00, 0.5);
        this._arcGraphics.arc(-20, 0, 50, MAX_RANGE, MIN_RANGE);
        container.addChild(this._arcGraphics);

        this._crosshairGraphics = new Graphics();
        this._crosshairGraphics.lineStyle(2, 0xFF4400);
        this._crosshairGraphics.drawCircle(-70, 0, 6);
        this._arcGraphics.addChild(this._crosshairGraphics);
    }

    public update() {
        const pt = this.updateStrategy.update();
        this._arcGraphics.x = pt.x;
        this._arcGraphics.y = pt.y;
        this._arcGraphics.rotation = pt.r;
        this._crosshairGraphics.rotation = this._angle;
        
        if(this._angle >= MAX_RANGE || this._angle <= MIN_RANGE)
            this._step *= -1;
        this._angle += this._step;
    }

}