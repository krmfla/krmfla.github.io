var gameApp = {
    "reset": function () {
		"use strict";
		this.compose = [];
        this.mapArray = [];
        this.level = 0; //map diffcult
        this.mainEl = document.getElementById("main");
        this.els = document.getElementsByClassName("map");
        this.character = document.getElementById("character");
        this.character.classList.remove("hit"); //reset status
        this.scoreEl = document.getElementById("score");
		this.powerEl = document.getElementById("powerLv");
		this.hitPointEl = document.getElementById("heartBar");
        this.speed = 500; //walking speed
        this.interval = null; //map update interval
        this.location = 3; //character locate
        this.score = 0;
		this.power = 0;
		this.hitPoint = 2;
		this.enemyLvMax = 5; 
        this.inProcess = "ready"; //ready, running, fail
    },
	
    "init": function () {
		"use strict";
        //create array map
        this.reset();
		//this.createCompose(20, 10, false, false, false);
		this.createCompose(20, 10, 3, 1, 1);
        this.createMap();
        this.render();
        this.renderCharacter();
		this.renderStatus();
        this.displayScore();
        this.inProcess = "running";
    },
	
	"createCompose": function(block, gold, enemy, heart, sword) {
		var base = 0;
		var flat = 100 - block - gold;
		(enemy) ? flat -= enemy : enemy = 1;
		(heart) ? flat -= heart : heart = 1;
		(sword) ? flat -= sword : sword = 1;
		this.compose[0] = flat;
		this.compose[1] = flat + block;
		this.compose[2] = flat + block + gold;
		this.compose[3] = flat + block + gold + enemy;
		this.compose[4] = flat + block + gold + enemy + heart;
		this.compose[5] = flat + block + gold + enemy + heart + sword;
		//compose percentage
		//[0]none, [1]tree, [2]gold, [3]enemy, [4]heart, [5]sword;
		console.log("ratio:" + this.compose);
		console.log(flat + ", " + block + ", " + gold + ", " + enemy + ", " + heart + ", " + sword);
	},
	
    "createElement": function() {
		"use strict";
        //var ratio = Math.floor((Math.random() * 100) + 1);
		/*
		switch (level) {
			case 1:
				compose = [70, 90, 100, 110, 120, 130];
				break;
			case 2:
				compose = [60, 90, 100, 110, 120, 130];
				break;
			default:
				//compose = [80, 90, 100, 110, 120, 130];
				//compose = [75, 80, 85, 90, 95, 100];
				compose = [73, 83, 93, 98, 99, 100];
				break;
		};
		*/
		var compose = this.compose;
		var ratio = Math.floor((Math.random() * 100) + 1);
		//map value
        //0: grass, 1: tree, 2: gold, 3: treasure, 4: treasures, 5: sword, 6:heart, 10~19: enemy;
		if (ratio <= compose[0]) {
			return 0;
		} else if (ratio > compose[0] && ratio <= compose[1]) {
			return 1;
		} else if (ratio > compose[1] && ratio <= compose[2]) {
			//TODO: raise value
			return 2;
		} else if (ratio > compose[2] && ratio <= compose[3]) {
			var enemyLV = Math.floor((Math.random() * 10) + 10);
			if (enemyLV > (this.enemyLvMax + 10)) { enemyLV = (this.enemyLvMax + 10) };
			return enemyLV;
			//return 10;
		} else if (ratio > compose[3] && ratio <= compose[4]) {
			return 4;
		} else if (ratio > compose[4] && ratio <= compose[5]) {
			return 5;
		} else {
			return 0;
		};
    },

    "createLine": function () {
        var line = [],
			theElement = null;
        for (var i = 0, max = 6; i < max; i++) {
            theElement = this.createElement(this.level);
            line.push(theElement);
        }
        return line;
    },
	
    "createMap": function () {
        for (var i = 0, max = 5; i < max; i++) {
            this.mapArray.push(this.createLine());
        }
        var flatGrass = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.mapArray.push(flatGrass);
        this.mapArray.push(flatGrass);
        this.mapArray.push(flatGrass);
    },
	
    "updateMap": function () {
        this.mapArray.unshift(this.createLine());
        this.mapArray.pop();
    },
	
    "update": function() {
        this.updateMap();
        this.render();
        this.hitTest();
    },
	
    "move": function(direction) {
        switch (direction) {
            case "left":
                if (this.location > 0) {
                    this.location -= 1;
                }
                break;
            case "right":
                if (this.location < 5) {
                    this.location += 1;
                }
                break;
        }
        this.renderCharacter();
        this.hitTest();
    },
	
    "hitTest": function () {
        var hit = this.mapArray[7][this.location];
		if(hit >= 10) {
			var _enemyLv = hit - 10;
			//console.info("lv:" + _enemyLv);
			
			if (this.power >= _enemyLv) {
				this.interactive();
                this.mcAnimate(_enemyLv);
			} else {
				this.getHurt();
			}
			return;
		}
		
        switch (hit) {
			case 0:
				break;
            case 1:
				this.getHurt();
                break;
            case 2:
                this.interactive();
                this.mcAnimate();
                //setTimeout
                setTimeout(function() {
                    gameApp.score += 1;
                    gameApp.displayScore();
                }, 650);
                //level up
                if (this.score == 10) {
                    this.level += 1;
                } else if (this.score == 20) {
                    this.level += 1;
                }
                break;
			case 4:
				this.updateStatus("hitPoint", 1);
				this.interactive();
				break;
			case 5:
				this.updateStatus("power", 1);
				this.interactive();
				break;
			default:
				break;
        }
    },
	
	"interactive": function() {
		this.mapArray[7][this.location] = 0;
        this.els[7].children[this.location].className = "bg0";
	},
	
	"getHurt": function() {
		this.updateStatus("hitPoint", -1);
		//console.log("hit pointer:" + this.hitPoint);
		this.renderStatus();
		if (this.hitPoint > 0) { 
			//break; 
		} else {
			this.inProcess = "fail";
            this.character.classList.add("hit");
            this.stop();
		};        
	},
	
    "stop": function () {
        clearInterval(gameApp.interval);
        setTimeout(function() {
            document.getElementById("btn-start").classList.remove("hide");
            document.getElementsByClassName("mapBtn")[0].classList.add("hide");
            document.getElementsByClassName("mapBtn")[1].classList.add("hide");
            gameApp.inProcess = "ready";
        }, 1500);
    },
	
    "displayScore": function () {
        this.scoreEl.innerText = this.score;
    },
	
	"updateStatus": function(status, value) {
		this[status] += value;
		this.renderStatus();
	},
	
    "render": function () {
        for (var i = 0, max = 8; i < max; i++) {
            for (var x = 0, length = 6; x < length; x++) {
                this.els[i].children[x].className = "bg" + this.mapArray[i][x];
            }
        }
    },
	
    "renderCharacter": function () {
        this.character.style.left = (this.location * 16.66) + "%";
    },
	
	"renderStatus": function() {
		this.powerEl.innerText = this.power;
		this.hitPointEl.style.width = (this.hitPoint * 10) + "px";
	},
	
    "mcAnimate": function () {
        var mClip = document.createElement("DIV");
        mClip.className = "clip";
        mClip.style.left = (this.location * 16.66) + "%";
        mClip.style.bottom = 0;
        this.mainEl.appendChild(mClip);
        setTimeout(function () {
            mClip.style.width = "20px";
            mClip.style.height = "20px";
            mClip.style.left = "85%";
            mClip.style.bottom = "85%";
        }, 50);
        setTimeout(function () {
            var deleteMC = document.getElementsByClassName("clip")[0];
            gameApp.mainEl.removeChild(mClip);
        }, 650);
    },
	
	
};
//====== function kits =======
function gameStart() {
    document.getElementById("btn-start").classList.add("hide");
    document.getElementsByClassName("mapBtn")[0].classList.remove("hide");
    document.getElementsByClassName("mapBtn")[1].classList.remove("hide");
    gameApp.init();
    //setInterval
    gameApp.interval = setInterval(function () {
        gameApp.update();
    }, gameApp.speed);
};

function controll_moving(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    switch (event.keyCode) {
        case 13:
            if (gameApp.inProcess === "ready") {
                gameStart();
            }
            break;
        case 37:
            if (gameApp.inProcess === "running") {
                gameApp.move("left");
            }
            break;
        case 39:
            if (gameApp.inProcess === "running") {
                gameApp.move("right");
            }
            break;
    }
}

function imgComplete() {
	//圖片載入完成後動作
}

function clickEvent(event) {
    //how to get fast???
    if (event.target.dataset)
        var getEvent = event.target.dataset.action;
    switch (getEvent) {
        case "start":
            if (gameApp.inProcess === "ready") {
                gameStart();
            }
            break;
        case "left":
            if (gameApp.inProcess === "running") {
                gameApp.move("left");
            }
            break;
        case "right":
            if (gameApp.inProcess === "running") {
                gameApp.move("right");
            }
            break;
    }
}
//====== event binding =======
var gameSection = document.getElementById("gameSection");
document.addEventListener("keydown", controll_moving);
gameSection.addEventListener("click", clickEvent);
//====== initial ======
//gameStart();
gameApp.inProcess = "ready";

//develop test
var switchEl = document.getElementById("switchBox");
switchEl.addEventListener("click", switchMap);

function switchMap() {
    console.log(event.target.id);
    if (event.target.id === "switchBox") return;
    document.getElementById("main").className = "main " + event.target.id;
}