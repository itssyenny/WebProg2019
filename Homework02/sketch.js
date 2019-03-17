let cvsWrapper = null;
const images = ["blue", "red", "yellow"].map(
    color => ["upflap", "midflap", "downflap"].map(
    flap => `assets/sprites/${color}bird-${flap}.png`));

const scores_img = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png",
                    "7.png", "8.png", "9.png"];

const backgroundImg = ["assets/sprites/background-night.png", "assets/sprites/background-day.png"];

// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets

let bgImg = [];
let baseImg;                    
let birdImg;
let bird;
let manybirds = [];
let pipes = [];
let pipeUp, pipeDown;

let score = 0;

let gameover;
let result = [];
let finished = false;
let touched = false;
let prevtouched = touched;
let readyImg;
var point;
var swoosh;
var wing;
var die;
let imgID, index, start = 0, end = 0;
let x1_constant = 1.5;
let x2_constant = 1.2;
let x2_constant2 = 1;

function preload() {
    point = loadSound("assets/audio/point.ogg");
    swoosh = loadSound("assets/audio/swoosh.ogg");
    wing = loadSound("assets/audio/wing.ogg");
    die = loadSound("assets/audio/die.ogg");
    baseImg = loadImage("assets/sprites/base.png");
    birdImg = loadImage("assets/sprites/bluebird-midflap.png");
    index = Math.floor(Math.random() * (end - start)) + start;
       
    pipeUp = loadImage("assets/sprites/pipe-red-upper.png");
    pipeDown = loadImage("assets/sprites/pipe-red-lower.png");
    readyImg = loadImage("assets/sprites/message.png");
    gameover = loadImage("assets/sprites/gameover.png");

    var cnt = 0;
    for(var i = 0; i < 2; i++) {
        bgImg[cnt] = loadImage(backgroundImg[i]);
        cnt++;
    }
    for(var k = 0; k < scores_img.length; k++) {
        result[k] = loadImage("assets/sprites/" + scores_img[k]);
    }

    var count = 0;
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            manybirds[count] = loadImage(images[i][j]);
            count++;
        }
    }
}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");
    // setup code belows
    reset();
}

function draw() {
    // Render function (called per frame.)
    background(0);

    push();
    x1 -= x1_constant;
    if(x1 < -bgImg[imgID].width) {
        x1 += bgImg[imgID].width;
    }
    x1 *= 1;
    translate(x1, y1);
    image(bgImg[imgID], 0, 0, 288 * bgScale, 512 * bgScale);
    image(bgImg[imgID], 260, 0, 288 * bgScale, 512 * bgScale);
    image(bgImg[imgID], 600, 0, 288 * bgScale, 512 * bgScale);
    pop();
    
    if(touched === false) {
        push();
        bird.x = width/2 - 20;
        bird.y = height/2 + 50 
        index = Math.floor(Math.random() * (end - start)) + start;        
        bird.show();
        pop();
        touched = false;
        image(readyImg, width/2 - 135, height/2-200, readyImg.width *1.5, readyImg.height * 1.5);
    }
    else {
        // console.log('FRAME COUNT = ' + frameCount);
        if((frameCount%80== 0) && bird.hit == false) {
            // console.log('MAKING AT ' + frameCount);
            pipes.push(new Pipe());
        }

        for(var i = pipes.length-1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();
            if(pipes[i].pass(bird)) {
                point.play();
                score++;
            }
            if(pipes[i].hits(bird)) {
                // console.log('HITS at pipe ' + bird.y);
                bird.hit = true;
                x1_constant = 0;
                x2_constant = 0;
                x2_constant2 = 0;
                for(var j = pipes.length-1; j >= 0; j--) {
                    pipes[j].speed = 0;
                }
            }

            if(bird.y > 560 && bird.y < 610) {
                GameOver();
            }

            if(pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }


        index = Math.floor(Math.random() * (end - start)) + start;
        bird.update();
        bird.show();
        MyScores();

        touched = true;
    }

    //base image
    push();
    x2 -= (3.5 * x2_constant);
    // x2 -= x2_constant2;
    if(x2 < -baseImg.width) {
        x2 += baseImg.width;
    }
    x2 *= 1;
    translate(x2,y2);
    image(baseImg, 0, 600, baseImg.width * baseScale, baseImg.height * baseImg);
    image(baseImg, baseImg.width+95, 600, baseImg.width * baseScale, baseImg.height * baseImg);
    image(baseImg, baseImg.width+190, 600, baseImg.width * baseScale, baseImg.height * baseImg);
    image(baseImg, baseImg.width+285, 600, baseImg.width * baseScale, baseImg.height * baseImg); 
    pop();

    if(touched && !prevtouched) {
        bird.up();
    }

    prevtouched = touched;
}

function mouseClicked() {
    if(mouseX > 0 && mouseY > 0) {
        touched = true;
    }
}

function keyPressed() {
    if(keyCode === 32) {
        wing.play();
        bird.up();
        if(finished) reset();
    } 
}

function touchStarted() {
    if(finished === true) {
        index = Math.floor(Math.random() * (end - start)) + start;
        reset();
    }
}

function GameOver() {
    die.play();
    image(gameover, 95, height/2-280, gameover.width * 1.2, gameover.height * 1.2);
    finished = true;
    touched = false;
    noLoop();
}

function reset() {
    x1_constant = 1.5;
    x2_constant = 1.2;
    x2_constant2 = 1;
    imgID = Math.floor(Math.random() * (2 - 0)) + 0;
    if(end >= 9) {
        start = 0;
        end = 3;
    } else {
        start = end;
        end = start + 3;
    }
    score = 0;
    finished = false;
    touched = false;
    x1 = 0; 
    y1 = 0; 
    bgScale = width / 288;

    x2 = 0; 
    y2 = 0;
    baseScale = width/baseImg.width;

    bird = new Bird();
    pipes = [];
    loop();
    
}

function MyScores() {
    if(score >= 0 && score <= 9) {
        image(result[score], 200, height/2-210, result[score].width * 2, result[score].height * 2);
    }
    else {
        var tmp = score;
        var arr = tmp.toString();
        var add = 175;

        for(var i = 0; i < arr.length; i++) {
            image(result[arr[i]], add, height/2-210, result[arr[i]].width * 2, result[arr[i]].height * 2);
            add += 40;
        }
    }
}

//Components
function Bird() {
    this.x = 64;
    this.y = height/2;

    this.gravity = 0.7;
    this.lift = -15;
    this.vy = 0;
    this.angle = 0;
    this.hit = false;

    this.show = function() {
        push();
        if(this.y > 556 && this.y < 610) {
            this.vy += this.gravity;
            if(this.hit == true) {
                while(this.angle < 7.85)  {
                    this.angle += 0.0225;
                }
                this.angle = 7.89;
            } 
            else {
                this.angle = 6.8;
            }
            this.y = 576;
        }

        translate(this.x, this.y);
        rotate(this.angle);
        image(manybirds[index], 0, 0, 34, 24);
        pop();
    }

    this.up = function() {
        this.vy += this.lift;        
    }
    
    this.update = function() {
        this.vy += this.gravity;
        if(this.vy < -10) this.vy = -10;
        if(this.vy > 20) this.vy = 20;
        if(this.vy < 0) this.angle -= 2.5;
        this.vy *= 0.9;
        this.y  += this.vy;

        var std = height - 112;
        if(this.y > std) {   //if the bird's position is out of the bound
            this.y = std;
            this.vy = 0;
        } 
        
        if(this.y < 0) {
            this.y = 0;
            this.vy = 0;
        }

        if(this.hit == true) {
            if(this.angle < 7.8) {
                this.angle += 0.0125;
                this.x += 0.0325;
                if(this.angle > 7.8) this.angle -= 0.0125;
            } 
            else {
                this.angle -= 0.0125;
            }
        } 
        else{
            this.angle = map(this.vy, -10, 20, -0.7, 0.7);
        }
    }
}

function Pipe() {
    var spacing = random(200, 295);
    var center = random(250, 350);

    this.top =  center - spacing/2;  
    this.bottom = height - (center + spacing / 2);

    this.x = width;
    this.width = 65;
    this.speed = 3.5;

    this.hasCollided = false;
    this.passed = false;

    this.pass = function(bird) {
        if(bird.x > this.x+this.width && !this.passed) {
            this.passed = true;
            return true;
        }
        return false;
    }

    this.hits = function(bird) {
        if (bird.y < this.top || bird.y >= height-this.bottom) {
            if (bird.x+24 > this.x && bird.x+24 < this.x + this.width) {
                bird.hit = true;
                this.hasCollided = true;
                return true;
            }
        }
        this.hasCollided = false;
        return false;
    }

    this.show = function() {
        image(pipeUp, this.x, 0, this.width, this.top);
        image(pipeDown, this.x, height-this.bottom, this.width, this.bottom);
    }

    this.update = function() {
        this.x -= this.speed;
    }

    this.offscreen = function() {
        return (this.x < -this.width); 
    }
}
