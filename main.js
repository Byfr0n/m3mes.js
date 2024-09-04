var debug = true;
var watermark = true;
var clantag = false;
var ver = "1.0"

UI.AddLabel("m3mes / github.com/Byfr0n/m3mes.js");
UI.AddCheckbox("Enable watermark");
UI.AddColorPicker("Watermark accent color");
UI.AddCheckbox("Enable clantag");

function update() {
    watermark = UI.GetValue("Script items", "Enable watermark");
    UI.SetEnabled("Script items", "Watermark accent color", watermark);
    clantag = UI.GetValue("Script items", "Enable clantag");
}

function darkenColor(color) {
    var r = Math.max(color[0] - 50, 0);
    var g = Math.max(color[1] - 50, 0);
    var b = Math.max(color[2] - 50, 0);
    var a = color[3];
    //var a = 0
    return [r, g, b, a];
}

function render() {
    var font = Render.AddFont("Consolas", 12, 400)
    var font2 = Render.AddFont("Consolas", 7, 400)
    server = World.GetServerString();
    current_map = World.GetMapName();
    if (watermark) {
        var accentColor = UI.GetColor("Script items", "Watermark accent color");
        var darkerAccentColor = darkenColor(accentColor);
        Render.GradientRect(15, 15, 70, 8, 1, darkerAccentColor, accentColor);
        Render.GradientRect(85, 15, 70, 8, 1, accentColor, darkerAccentColor);
        Render.GradientRect(15, 23, 140, 35, 0, darkerAccentColor, accentColor);
        Render.StringCustom( 17, 23, 0, "m3mes anti-baim", [ 255, 255, 255, 255 ], font );
        if(debug)
            {
                Render.StringCustom( 17, 40, 0, "debug " + server + " "  + ver, [ 255, 255, 255, 255 ], font2 );
            }
            else
            {
                Render.StringCustom( 17, 40, 0, "release " + server + " " + ver, [ 255, 255, 255, 255 ], font2 );
            }
    }
}

function main() {
    update();
    render();
    if (watermark) {
        var accentColor = UI.GetColor("Script items", "Watermark accent color");
    }
}

function updateMove() {
    if (clantag)
    {
        var random = Math.floor(Math.random() * 9); 
        var random2 = Math.floor(Math.random() * 9); 
        Local.SetClanTag(random2+" m3me " + random);
    }
}

function move() {
    updateMove();
}

Cheat.RegisterCallback("Draw", "main");
Cheat.RegisterCallback("CreateMove", "move");