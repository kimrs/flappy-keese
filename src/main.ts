import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import { Curve } from './curve';
import { TrackQueue } from './trackQueue';

const app = new PIXI.Application();
document.body.appendChild(app.view);

const trackContainer = new PIXI.Container();
trackContainer.x = app.screen.width/2;
trackContainer.y = app.screen.height/2;

const viewport = new Viewport( {
    screenWidth: window.innerWidth, 
    screenHeight: window.innerHeight, 
    //worldWidth: 1000, 
    //worldHeight: 1000,
    interaction: app.renderer.plugins.interaction
});

app.stage.addChild(viewport);

const trackQueue = new TrackQueue(trackContainer);
trackQueue.add();
trackQueue.add();
trackQueue.add();

const car = PIXI.Sprite.from('res/car.png');
trackContainer.addChild(car);

viewport
    .wheel()
    .follow(car, {speed:4});
viewport.addChild(trackContainer);

var step = 0;
app.ticker.add(() => {
    const curve = trackQueue.current.curve;
    const position = curve.point(step);
    car.position.x = position[0];
    car.position.y = position[1];
    car.rotation = position[2];

    step += 0.02;
    if(step >= 1) {
        step = 0;
        trackQueue.toNext();
        trackQueue.add();
    }
});