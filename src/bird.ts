import { Graphics, Sprite, Texture} from 'pixi.js';
import { IUpdateStrategy} from './UpdateStrategy/IUpdateStrategy';

export class Bird {
    private _sprite: Sprite;
    private _graphics: Graphics;
    private _updateStrategy: IUpdateStrategy;
    private _keese1: Texture;
    private _keese2: Texture;

    public constructor(updateStrategy: IUpdateStrategy) {
        this._updateStrategy = updateStrategy;
        this._keese1 = Texture.from('res/keese-1.png');
        this._keese2 = Texture.from('res/keese-2.png');
        this._sprite = new Sprite(this._keese1);
        this._sprite.anchor.set(0.5);
        this._graphics = new Graphics();
        this._graphics.lineStyle(2, 0xFF4400);
        this._graphics.drawCircle(0, 0, 10);
    }

    public get container() { return this._sprite; }

    set updateStrategy(updateStrategy:IUpdateStrategy) {
        this._updateStrategy = updateStrategy;
    }

    public update(): number {
        if(!this._updateStrategy)
            return 0;

        const prevY = this._sprite.y;
        const prevX = this._sprite.x;
        const orientation  = this._updateStrategy.update();
        if(prevY - orientation.y > 0)
            this._sprite.texture = this._keese2;
        else
            this._sprite.texture = this._keese1;
        
        if(prevX - orientation.x > 0 && this._sprite.scale.x == -1)
        {
            this._sprite.anchor.set(0);
            this._sprite.scale.x = 1;
            this._sprite.anchor.set(0.5);
        }else if(prevX - orientation.x <= 0 && this._sprite.scale.x == 1)
        {
            this._sprite.anchor.set(0);
            this._sprite.scale.x = -1;
            this._sprite.anchor.set(0.5);
        }

        this._sprite.x = orientation.x;
        this._sprite.y = orientation.y;
        //this._sprite.rotation = orientation.r;

        return orientation.t;
    }
}