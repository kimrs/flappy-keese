import * as PIXI from 'pixi.js';
import {Point} from './point';

import { CaveTile } from "./caveTile";

export class Cave
{
    private _container: PIXI.Container;

    constructor()
    {
        this._container = new PIXI.Container();
    }

    get container() { return this._container; }
    
    public Add(transform: PIXI.Matrix)
    {

        const p = transform.decompose(new PIXI.Transform());

        const r3 = Math.sqrt(3);
        const q = Math.round((r3/3 * p.position.x - 1/3*p.position.y) / 50);
        const r = Math.round((2/3*p.position.y) / 50);

        const caveTile1 = new CaveTile(q, r, p);
        //const caveTile2 = new CaveTile(q+1, r+0);
        //const caveTile3 = new CaveTile(q+1, r+1);
        //const caveTile4 = new CaveTile(q+0, r+1);
        //const caveTile5 = new CaveTile(q+0, r-1);
        //const caveTile6 = new CaveTile(q-1, r-1);
        //const caveTile7 = new CaveTile(q-1, r-0);

        this._container.addChild(caveTile1.container);
        //this._container.addChild(caveTile2.container);
        //this._container.addChild(caveTile3.container);
        //this._container.addChild(caveTile4.container);
        //this._container.addChild(caveTile5.container);
        //this._container.addChild(caveTile6.container);
        //this._container.addChild(caveTile7.container);
    }
}