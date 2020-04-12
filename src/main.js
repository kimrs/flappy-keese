
function init() {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    const container = new PIXI.Container();
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    
    const asphalt = PIXI.Sprite.from('res/asphalt.png');
    asphalt.anchor.set(0.5);

    container.addChild(asphalt);
    app.stage.addChild(container);

    const mask = new PIXI.Graphics();
    mask.lineStyle(0);
    mask.moveTo(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(mask);
    //container.mask = mask;
    
    mask.beginFill(0xDE3249, 0.4);

    mask.lineTo(50, 0);
    mask.lineTo(50, 100);
    mask.lineTo(0, 100);
    mask.endFill();
}
