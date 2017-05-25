import Pacman from './Pacman.js'

/** 
 * Játék osztály
  */


var KEY = {'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222};

(function () {
	/* 0 - 9 */
	for (var i = 48; i <= 57; i++) {
        KEY['' + (i - 48)] = i;
	}
	/* A - Z */
	for (i = 65; i <= 90; i++) {
        KEY['' + String.fromCharCode(i)] = i;
	}
	/* NUM_PAD_0 - NUM_PAD_9 */
	for (i = 96; i <= 105; i++) {
        KEY['NUM_PAD_' + (i - 96)] = i;
	}
	/* F1 - F12 */
	for (i = 112; i <= 123; i++) {
        KEY['F' + (i - 112 + 1)] = i;
	}

})();


        var NONE        = 4,
    WAITING     = 5,
    PAUSE       = 6,
    PLAYING     = 7,
    COUNTDOWN   = 8,
    EATEN_PAUSE = 9,
    DYING       = 10

class PACMAN{

    constructor (){
        this.state        = 5,
       this.audio        = null,
        this.ghosts       = [],
       this.ghostSpecs   = ["#00FFDE", "#FF0000", "#FFB8DE", "#FFB847"],
       this.eatenCount   = 0,
       this.level        = 0,
       this.tick         = 0,
       this.ghostPos,
        this.userPos, 
       this.stateChanged = true,
       this.timerStart   = null,
        this.lastTime     = 0,
       this.ctx          = null,
       this.timer        = null,
       this.map          = Pacman.Map(10),
       this.user         = null,
       this.stored       = null;

       this.load.bind(this);
    }
    

     getTick() { 
        return this.tick;
    };
/**
 * score kiirás
   */
     drawScore(text, position) {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font      = "12px BDCartoonShoutRegular";
        this.ctx.fillText(text, 
                     (position["new"]["x"] / 10) * this.map.blockSize, 
                     ((position["new"]["y"] + 5) / 10) * this.map.blockSize);
    }
    
     dialog(text) {
        this.ctx.fillStyle = "#FFFF00";
        this.ctx.font      = "14px BDCartoonShoutRegular";
        var width = this.ctx.measureText(text).width,
            x     = ((this.map.width * this.map.blockSize) - width) / 2;        
        this.ctx.fillText(text, x, (this.map.height * 10) + 8);
    }
/**
* hang kikapcsolás
  */
     soundDisabled() {
        return localStorage["soundDisabled"] === "true";
    };
    
     startLevel() {        
        this.user.resetPosition();
        for (var i = 0; i < this.ghosts.length; i += 1) { 
            this.ghosts[i].reset();
        }
        this.audio.play("start");
        this.timerStart = this.tick;
        setState(COUNTDOWN);
    }    
/** 
 *  új játék
 */
     startNewGame() {
        setState(WAITING);
        this.level = 1;
        this.user.reset();
        this.map.reset();
        this.map.draw(this.ctx);
        startLevel();
    }
/**
 *   Iránítás
*/
     keyDown(e) {
        if (e.keyCode === KEY.N) {
            this.startNewGame();
        } else if (e.keyCode === KEY.S) {
            this.audio.disableSound();
            localStorage["soundDisabled"] = !soundDisabled();
        } else if (e.keyCode === KEY.P && this.state === PAUSE) {
            this.audio.resume();
            this.map.draw(this.ctx);
            setState(this.stored);
        } else if (e.keyCode === KEY.P) {
            this.stored = this.state;
            setState(PAUSE);
            this.audio.pause();
            this.map.draw(this.ctx);
            this.dialog("Paused");
        } else if (this.state !== PAUSE) {   
            return this.user.keyDown(e);
        }
        return true;
    }    
/** 
 *  életvesztés
 */
     loseLife() {        
        setState(5);
        this.user.loseLife();
        if (this.user.getLives() > 0) {
            startLevel();
        }
    }

/**
 * állapot beállítása
 */
     setState(nState) { 
        this.state = nState;
        this.stateChanged = true;
    };
    
     collided(user, ghost) {
        return (Math.sqrt(Math.pow(ghost.x - this.user.x, 2) + 
                          Math.pow(ghost.y - this.user.y, 2))) < 10;
    };

     drawFooter() {
        
        var topLeft  = (this.map.height * this.map.blockSize),
            textBase = topLeft + 17;
        
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, topLeft, (this.map.width * this.map.blockSize), 30);
        
        this.ctx.fillStyle = "#FFFF00";

        for (var i = 0, len = this.user.getLives(); i < len; i++) {
            this.ctx.fillStyle = "#FFFF00";
            this.ctx.beginPath();
            this.ctx.moveTo(150 + (25 * i) + this.map.blockSize / 2,
                       (topLeft+1) + this.map.blockSize / 2);
            
            this.ctx.arc(150 + (25 * i) + this.map.blockSize / 2,
                    (topLeft+1) + this.map.blockSize / 2,
                    this.map.blockSize / 2, Math.PI * 0.25, Math.PI * 1.75, false);
            this.ctx.fill();
        }

        this.ctx.fillStyle = !soundDisabled() ? "#00FF00" : "#FF0000";
        this.ctx.font = "bold 16px sans-serif";
        //this.ctx.fillText("d", 10, textBase);
        this.ctx.fillText("s", 10, textBase);

        this.ctx.fillStyle = "#FFFF00";
        this.ctx.font      = "14px BDCartoonShoutRegular";
        this.ctx.fillText("Score: " + this.user.theScore(), 30, textBase);
        this.ctx.fillText("Level: " + this.level, 260, textBase);
    }

     redrawBlock(pos) {
        this.map.drawBlock(Math.floor(pos.y/10), Math.floor(pos.x/10), this.ctx);
        this.map.drawBlock(Math.ceil(pos.y/10), Math.ceil(pos.x/10), this.ctx);
    }

     mainDraw() { 

        var diff, u, i, len, nScore;
        
        this.ghostPos = [];

        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            this.ghostPos.push(this.ghosts[i].move(this.ctx));
        }
        u = this.user.move(this.ctx);
        
        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            redrawBlock(this.ghostPos[i].old);
        }
        redrawBlock(u.old);
        
        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            this.ghosts[i].draw(this.ctx);
        }                     
        this.user.draw(this.ctx);
        
        this.userPos = u["new"];
        
        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            if (collided(this.userPos, this.ghostPos[i]["new"])) {
                if (this.ghosts[i].isVunerable()) { 
                    this.audio.play("eatghost");
                    this.ghosts[i].eat();
                    this.eatenCount += 1;
                    nScore = this.eatenCount * 50;
                    drawScore(nScore, this.ghostPos[i]);
                    this.user.addScore(nScore);                    
                    setState(EATEN_PAUSE);
                    this.timerStart = this.tick;
                } else if (this.ghosts[i].isDangerous()) {
                    this.audio.play("die");
                    setState(DYING);
                    this.timerStart = this.tick;
                }
            }
        }                             
    };

     mainLoop() {

        var diff;

        if (this.state !== PAUSE) { 
            ++this.tick;
        }

        this.map.drawPills(this.ctx);

        if (this.state === PLAYING) {
            mainDraw();
        } else if (this.state === WAITING && this.stateChanged) {            
            this.stateChanged = false;
            this.map.draw(this.ctx);
            this.dialog("Press N to start a New game");            
        } else if (this.state === EATEN_PAUSE && 
                   (this.tick - this.timerStart) > (Pacman.FPS / 3)) {
            this.map.draw(this.ctx);
            setState(PLAYING);
        } else if (this.state === DYING) {
            if (this.tick - this.timerStart > (Pacman.FPS * 2)) { 
                loseLife();
            } else { 
                redrawBlock(this.userPos);
                for (i = 0, len = this.ghosts.length; i < len; i += 1) {
                    redrawBlock(this.ghostPos[i].old);
                    this.ghostPos.push(this.ghosts[i].draw(this.ctx));
                }                                   
                this.user.drawDead(this.ctx, (this.tick - this.timerStart) / (Pacman.FPS * 2));
            }
        } else if (this.state === COUNTDOWN) {
            
            diff = 5 + Math.floor((this.timerStart - this.tick) / Pacman.FPS);
            
            if (diff === 0) {
                this.map.draw(this.ctx);
                setState(PLAYING);
            } else {
                if (diff !== this.lastTime) { 
                    this.lastTime = diff;
                    this.map.draw(this.ctx);
                    this.dialog("Starting in: " + diff);
                }
            }
        } 

        drawFooter();
    }

     eatenPill() {
        this.audio.play("eatpill");
        this.timerStart = this.tick;
        this.eatenCount = 0;
        for (i = 0; i < this.ghosts.length; i += 1) {
            this.ghosts[i].makeEatable(this.ctx);
        }        
    };
    
     completedLevel() {
        setState(WAITING);
        this.level += 1;
        this.map.reset();
        this.user.newLevel();
        startLevel();
    };

     keyPress(e) { 
        if (this.state !== WAITING && this.state !== PAUSE) { 
            e.preventDefault();
            e.stopPropagation();
        }
    };
    
     init(wrapper, root) {
        
        var i, len, ghost,
            blockSize = wrapper.offsetWidth / 19,
            canvas    = document.createElement("canvas");
        
        canvas.setAttribute("width", (blockSize * 19) + "px");
        canvas.setAttribute("height", (blockSize * 22) + 30 + "px");

        wrapper.appendChild(canvas);

        this.ctx  = canvas.getContext('2d');

        this.audio = Pacman.Audio({"soundDisabled":false});
        this.map   =  Pacman.Map(blockSize);
        this.user  = new Pacman.User({ 
            "completedLevel" : this.completedLevel, 
            "eatenPill"      : this.eatenPill 
        }, this.map);

        for (i = 0, len = this.ghostSpecs.length; i < len; i += 1) {
            ghost = new Pacman.Ghost({"getTick":this.getTick}, this.map, this.ghostSpecs[i]);
            this.ghosts.push(ghost);
        }
        
        this.map.draw(this.ctx);
        this.dialog("Loading ...");

        var extension = 'ogg';

        var audio_files = [
            ["start", root + "audio/opening_song." + extension],
            ["die", root + "audio/die." + extension],
            ["eatghost", root + "audio/eatghost." + extension],
            ["eatpill", root + "audio/eatpill." + extension],
            ["eating", root + "audio/eating.short." + extension],
            ["eating2", root + "audio/eating.short." + extension]
        ];

        this.load(audio_files, ()=> { this.loaded(); });
    };

     load(arr, callback) { 
        
        if (arr.length === 0) { 
            callback();
        } else { 
            var x = arr.pop();
            this.audio.load(x[0], x[1], ()=> { this.load(arr, callback); });
        }
    };
        
    loaded() {

        this.dialog("Press N to Start");
        
        document.addEventListener("keydown", this.keyDown, true);
        document.addEventListener("keypress", this.keyPress, true); 
        
        this.timer = window.setInterval(this.mainLoop, 1000 / Pacman.FPS);
    };
};

export default PACMAN;
