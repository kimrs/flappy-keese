import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import { TrackQueue } from './trackQueue';
import { Bird } from './bird';
import { FollowTrackUpdateStrategy } from './UpdateStrategy/FollowTrackUpdateStrategy'
import { BounceUpdateStrategy } from './UpdateStrategy/BounceUpdateStrategy';

let gameRunning = false;

const app = new PIXI.Application();
document.body.appendChild(app.view);

const viewport = new Viewport( {
    screenWidth: app.screen.width, 
    screenHeight: app.screen.height, 
    interaction: app.renderer.plugins.interaction
});
app.stage.addChild(viewport);

const bgContainer = new PIXI.Container();
const trackQueue = new TrackQueue();
bgContainer.addChild(trackQueue.container);

const bird = new Bird(new FollowTrackUpdateStrategy(trackQueue));
trackQueue.container.addChild(bird.container);
trackQueue.update();
viewport.zoomPercent(0.00)
    .wheel()
    .follow(bird.container, {radius: 0, speed: 0, acceleration: 0});
app.renderer.resize(window.innerWidth, window.innerHeight);
viewport.addChild(bgContainer);

app.ticker.add(() => {
    const step = bird.update();
    if(step >= 1) {
        trackQueue.toNext();
        trackQueue.update();
        trackQueue.container.swapChildren(bird.container, trackQueue.next.curve.container);
    }
});

app.view.addEventListener('mousedown', onClick);

function onClick() {
    if(!gameRunning)
    {
        console.log("Game started");
        gameRunning = true;
    }
    if(gameRunning)
    {
        bird.updateStrategy = new BounceUpdateStrategy(trackQueue, bird.container.position, hitCallback);
    }
}

function hitCallback() {
    gameRunning = false;
    bird.updateStrategy = new FollowTrackUpdateStrategy(trackQueue);
}