function init() {
    stage = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(512, 384, {view:document.getElementById("game-canvas")});

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xDE3249);
    graphics.drawCircle(100, 100, 50);
    graphics.endFill();
    stage.addChild(graphics);

    renderer.render(stage);
}
