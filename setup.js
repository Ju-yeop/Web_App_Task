function preload() {
    backimg = loadImage('./data/backgroundimg.png');
    stage1_back = loadImage('./data/stage1_back.png');
    volume = loadImage('./data/volume.png');
    drumframe = loadImage('./data/drumframe.png');
    logo = loadImage('./data/logo.png');
    for(var v = 0; v<6 ; v++){
        instrument_img[v] = loadImage('./data/instrument' + (v+1) + '.png');
    }
    play = loadImage('./data/play.png');
    pause = loadImage('./data/pause.png');
    for(var w = 0; w<7 ; w++){
        illu_img[w] = loadImage('./data/' + (w+1) + '일러.png');
    }
    stage1_logo = loadImage('./data/stage1_logo.png');
    ft1 = loadFont('./data/static/SmoochSans-Black.ttf');
    ft2 = loadFont('./data/static/SmoochSans-Bold.ttf');
    ft3 = loadFont('./data/static/SmoochSans-ExtraBold.ttf');
    ft4 = loadFont('./data/static/SmoochSans-Regular.ttf');
    ft5 = loadFont('./data/static/SmoochSans-Light.ttf');
}

function setup() {
    let main = createCanvas(1536,745);;
    main.parent('item');
    v1 = new scrollbar(1160, 420, 150, 8, 5);
    v2 = new scrollbar(1160, 473, 150, 8, 5);
    v3 = new scrollbar(1160, 526, 150, 8, 5);
    v4 = new scrollbar(1160, 579, 150, 8, 5);
    v5 = new scrollbar(1160, 632, 150, 8, 5);
    v6 = new scrollbar(1160, 685, 150, 8, 5);
    scrollbar_arr = [v1, v2, v3, v4, v5, v6];

    tempo =  new scrollbar(505, 370, 580, 5, 20);

    masterV = new scrollbar(212, 210, 320, 9, 5);

    for(var track=0; track<nTracks; track++){
        cells[track] = [];
        for(var step=0; step<nSteps; step++){
            cells[track][step] = -1;
        }
    }

    for(var index = 0; index <3; index++){
        for(var track=0; track<nTracks; track++){
            memory[index][track] = [];
            for(var step=0; step<nSteps; step++){
                memory[index][track][step] = cells[track][step];
            }
        }
    }
}

function draw() {
    if(stage == 1){
        stage1();
    }else if(stage == 2){
        stage2();
    }
}

function scrollbar(xp, yp, sw, sh, l) {
    this.swidth = sw;
    this.sheight = sh;
    var widthtoheight = sw - sh;
    this.ratio = sw / widthtoheight;
    this.xpos = xp;
    this.ypos = yp - this.sheight / 2;
    this.spos = this.xpos + this.swidth / 2 - this.sheight / 2;
    this.newspos = this.spos;
    this.sposMin = this.xpos;
    this.sposMax = this.xpos + this.swidth - this.sheight;
    this.loose = l;
    this.over = false;
    this.locked = false;

    this.update = function() {
        if (this.overEvent()) {
            this.over = true;
        } else {
            this.over = false;
        }
        if (mouseIsPressed && this.over) {
        this.locked = true;
        }
        if (!mouseIsPressed) {
            this.locked = false;
        }
        if (this.locked) {
            this.newspos = constrain(mouseX - this.sheight / 2, this.sposMin, this.sposMax);
        }
        if (abs(this.newspos - this.spos) > 1) {
            this.spos = this.spos + (this.newspos - this.spos) / this.loose;
        }
        }

    this.constrain = function(val, minv, maxv) {
        return min(max(val, minv), maxv);
    }

    this.overEvent = function() {
        if (mouseX > this.xpos && mouseX < this.xpos + this.swidth && mouseY > this.ypos && mouseY < this.ypos + this.sheight) {
            return true;
        } else {
            return false;
        }
    }

    this.display = function() {
        noStroke();
        fill("#383C3F");
        rect(this.xpos, this.ypos, this.swidth, this.sheight);
        if (this.over || this.locked) {
            fill("#5EC6D4");
        } else {
            fill("#E7E6E6");
        }
        circle(this.spos + 5, this.ypos + 3, this.sheight*1.5);
    }

    this.getPos = function() {
        return this.spos * this.ratio;
    }
}
