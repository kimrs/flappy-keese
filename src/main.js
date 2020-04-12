
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
    
    mask.beginFill(0xDE3249, 0.6);
    container.mask = mask;

    mask.moveTo(app.screen.width / 2, app.screen.height / 2 + 120);
    //mask.bezierCurveTo(300, 400, 500, 350, app.screen.width / 2,app.screen.height / 2);
    const curve = new Bezier(   app.screen.width/2, app.screen.height/2 + 120, 
                                300               , 400                      , 
                                500               , 350                      , 
                                app.screen.width/2, app.screen.height/2      );
    const lut = curve.getLUT(16);
    lut.forEach(e => {
      mask.drawCircle(e.x, e.y, 4);  
    });

    mask.endFill();
    app.stage.addChild(mask);

    
    
}
