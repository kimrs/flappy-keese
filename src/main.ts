import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import { TrackQueue } from './trackQueue';
import { Car } from './car';
import { FollowTrackUpdateStrategy } from './FollowTrackUpdateStrategy'
import { EmptyUpdateStrategy } from './EmptyUpdateStrategy';
import { Crosshair } from './crosshair';
import { FollowTrackAngleAndCarPositionUpdateStrategy } from './FollowTrackAngleAndCarPositionUpdateStrategy';

const WIDTH = 2000;
const HEIGHT = 2000;

const app = new PIXI.Application();
document.body.appendChild(app.view);

const bgContainer = new PIXI.Container();
bgContainer.x = app.screen.width/2;
bgContainer.y = app.screen.height/2;

const viewport = new Viewport( {
    screenWidth: window.innerWidth, 
    screenHeight: window.innerHeight, 
    interaction: app.renderer.plugins.interaction
});

app.stage.addChild(viewport);

const trackContainer = new PIXI.Container();
bgContainer.addChild(trackContainer);
const trackQueue = new TrackQueue(trackContainer);
trackQueue.update();

const car = new Car(trackContainer, new FollowTrackUpdateStrategy(trackQueue));
const crossHair = new Crosshair(bgContainer, new FollowTrackAngleAndCarPositionUpdateStrategy(trackQueue, car));

viewport.zoomPercent(0.1)
    .wheel( {smooth: 3})
    .decelerate()
    .follow(car.container, {radius: 100})
    .pinch();

app.renderer.resize(window.innerWidth, window.innerHeight);
viewport.resize(window.innerWidth, window.innerHeight, WIDTH, HEIGHT);
viewport.addChild(bgContainer);

app.ticker.add(() => {
    const step = car.update();
    crossHair.update();
    if(step >= 1) {
        trackQueue.toNext();
        trackQueue.update();
        trackContainer.swapChildren(car.container, trackQueue.next.curve.container);
    }
});


app.view.addEventListener('mousedown', onClick);

function onClick() {
    //car.updateStrategy = new EmptyUpdateStrategy();
}