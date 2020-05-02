import * as PIXI from 'pixi.js';
import { Curve } from './curve';

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


const car = PIXI.Sprite.from('res/car.png');
trackContainer.addChild(car);
var step = 0;

app.ticker.add(() => {
    const position = curve1.point(step);
    car.position.x = position[0];
    car.position.y = position[1];
    car.rotation = position[2];


    step += 0.02;
    if(step >= 1)
        step = 0;
});