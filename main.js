var debug = true;
var watermark = true;
var keybinds = true;
var clantag = false;
var dimBg = true;
var doubletap = false;
var hideshots = false;
var autopeek = false;
var ver = "1.1"
var screen_size = Global.GetScreenSize();
var screen_width = screen_size[0]; // Correct: screen_size[0] is the width
var screen_height = screen_size[1]; // Correct: screen_size[1] is the height


UI.AddLabel("m3mes / github.com/Byfr0n/m3mes.js");
UI.AddLabel("MISC.");
UI.AddCheckbox("Enable watermark");
UI.AddCheckbox("Keybind list");
//UI.AddColorPicker("Watermark accent color");
UI.AddColorPicker("Accent color");
UI.AddCheckbox("Enable clantag");
UI.AddCheckbox("Dim background");
UI.AddLabel("ANTI-AIM");
UI.AddMultiDropdown( "Standing", [ "Random", "Offset jitter", "3-Way", "Spin" ] );
UI.AddMultiDropdown( "Standing pitch", [ "Random", "Up down up down", "Resolver breaker", "Down", "Up", "Defensive" ] );
UI.AddMultiDropdown( "In air", [ "Random", "Offset jitter", "3-Way", "Spin" ] );
UI.AddMultiDropdown( "In air pitch", [ "Random", "Up down up down", "Resolver breaker", "Down", "Up" ] );
UI.AddMultiDropdown( "Freestanding", [ "Random", "Offset jitter", "3-Way", "Spin" ] );
UI.AddMultiDropdown( "Freestanding pitch", [ "Random", "Up down up down", "Resolver breaker", "Down", "Up", "Defensive" ] );
UI.SetValue("Misc","PERFORMENCE & INFORMATION", "Information", "Restrictions",0);

function update() {
    watermark = UI.GetValue("Script items", "Enable watermark");
    keybinds = UI.GetValue("Script items", "Keybind list");
    //UI.SetEnabled("Script items", "Watermark accent color", watermark);
    UI.SetEnabled("Script items", "Accent color", watermark);
    clantag = UI.GetValue("Script items", "Enable clantag");
    dimBg = UI.GetValue("Script items", "Dim background");
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
    var accentColor = UI.GetColor("Script items", "Accent color");
    var darkerAccentColor = darkenColor(accentColor);
    if (watermark) {
        Render.GradientRect(15, 15, 70, 8, 1, darkerAccentColor, accentColor);
        Render.GradientRect(85, 15, 70, 8, 1, accentColor, darkerAccentColor);
        Render.GradientRect(15, 23, 140, 35, 0, darkerAccentColor, accentColor);
        Render.StringCustom(17, 23, 0, "m3mes anti-baim", [255, 255, 255, 255], font);
        if (debug) {
            Render.StringCustom(17, 40, 0, "debug " + server + " " + ver, [255, 255, 255, 255], font2);
        } else {
            Render.StringCustom(17, 40, 0, "release " + server + " " + ver, [255, 255, 255, 255], font2);
        }
    }
    
    if (keybinds) {
        Render.GradientRect(15, 500, 70, 60, 1, darkerAccentColor, accentColor);
        Render.GradientRect(85, 500, 70, 60, 1, accentColor, darkerAccentColor);
        Render.StringCustom(17, 500, 0, "Keybinds:", [255, 255, 255, 255], font);
        if (doubletap == 1) {
            Render.StringCustom(17, 513, 0, "Doubletap", [255, 255, 255, 255], font);
        }
        if (hideshots == 1) {
            Render.StringCustom(17, 526, 0, "Hideshots", [255, 255, 255, 255], font);
        }
        if (autopeek == 1) {
            Render.StringCustom(17, 539, 0, "Peeking!", [255, 15, 15, 255], font);
        }
    }
    if (dimBg && UI.IsMenuOpen()) {
        Render.FilledRect(0, 0, screen_width, screen_height, [0, 0, 0, 100]);
    }
}

function main() {
    update();
    render();
    if (watermark) {
        var accentColor = UI.GetColor("Script items", "Watermark accent color");
    }
}

function antiaim()
{
    //todo add shit
}

function updateMove() {
    doubletap = UI.IsHotkeyActive( "Rage", "GENERAL", "Exploits", "Doubletap" );
    hideshots = UI.IsHotkeyActive( "Rage", "GENERAL", "Exploits", "Hide shots" );
    autopeek = UI.IsHotkeyActive( "Misc", "GENERAL", "Auto peek");
    if (clantag)
    {
        var random = Math.floor(Math.random() * 9); 
        var random2 = Math.floor(Math.random() * 9); 
        Local.SetClanTag(random2+" m3me " + random);
    }
}

function move() {
    updateMove();
    antiaim();
}

Cheat.RegisterCallback("Draw", "main");
Cheat.RegisterCallback("CreateMove", "move");