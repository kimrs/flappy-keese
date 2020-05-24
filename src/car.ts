import { Container, Sprite} from 'pixi.js';
import { IUpdateStrategy} from './IUpdateStrategy';

export class Car {
    private _sprite: Sprite;
    private _updateStrategy: IUpdateStrategy;

    public constructor(container: Container, updateStrategy: IUpdateStrategy) {
        this._updateStrategy = updateStrategy;
        this._sprite = Sprite.from('res/car.png');
        this._sprite.anchor.set(0.5);

        container.addChild(this._sprite);
    }

    public get container() { return this._sprite; }

    set updateStrategy(updateStrategy:IUpdateStrategy) {
        this._updateStrategy = updateStrategy;
    }

    public update(): number {
        if(!this._updateStrategy)
            return 0;

        const orientation  = this._updateStrategy.update();
        this._sprite.x = orientation.x;
        this._sprite.y = orientation.y;
        this._sprite.rotation = orientation.r;

        return orientation.t;
    }
}