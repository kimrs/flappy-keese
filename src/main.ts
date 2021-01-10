import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import { TrackQueue } from './trackQueue';
import { Bird } from './bird';
import { FollowTrackUpdateStrategy } from './FollowTrackUpdateStrategy'
import { BounceUpdateStrategy } from './BounceUpdateStrategy';

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
const fgContainer = new PIXI.Container();
const trackContainer = new PIXI.Container();
bgContainer.addChild(trackContainer);
const trackQueue = new TrackQueue(trackContainer);

const cave1 = PIXI.Texture.from('/res/cave-1.png');
const cave2 = PIXI.Texture.from('/res/cave-2.png');
const sp = new PIXI.Sprite(cave1);
sp.anchor.set(0.5);
sp.x = window.innerWidth / 2;
sp.y = 3* window.innerHeight /4;
sp.scale.x = 0.1;
sp.scale.y = 0.1;
fgContainer.addChild(sp);
app.stage.addChild(fgContainer);

const bird = new Bird(trackContainer, new FollowTrackUpdateStrategy(trackQueue));
trackQueue.update();
viewport.zoomPercent(0.0)
    .follow(bird.container, {radius: 0, speed: 0, acceleration: 0});
app.renderer.resize(window.innerWidth, window.innerHeight);
viewport.addChild(bgContainer);

app.ticker.add(() => {
    const step = bird.update();
    if(step >= 1) {
        trackQueue.toNext();
        trackQueue.update();
        trackContainer.swapChildren(bird.container, trackQueue.next.curve.container);
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
    sp.texture = sp.texture == cave2 ? cave1 : cave2;
}

function hitCallback() {
    gameRunning = false;
    bird.updateStrategy = new FollowTrackUpdateStrategy(trackQueue);
}