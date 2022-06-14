function stage2(){
    background(0);
    background(backimg);
    textSize(15);
    fill(255);
    text("Tom", 280, 426);
    text("Hi-Hat", 280, 479);
    text("Snare", 280, 532);
    text("Kick", 280, 585);
    text("Cymbal", 280, 638);
    text("Floor-Tom", 280, 692);
    // for(var v = 0; v<6 ; v++){
    //     image(instrument_img[v], 210, 403 + (53*v), 40, 40);
    // }
    image(instrument_img[0], 213, 405, 40, 30);
    image(instrument_img[1], 210, 449, 45, 45);
    image(instrument_img[2], 209, 509, 45, 42);
    image(instrument_img[3], 206, 557, 48, 48);
    image(instrument_img[4], 207, 611, 45, 45);
    image(instrument_img[5], 207, 663, 50, 50);

    image(volume, 1195, 360, 20, 20);
    text("Volume", 1225, 376);

    Tone.Transport.bpm.value = map(tempo.getPos(), 510, 1100, 40, 300);
    // console.log(Tone.Transport.bpm.value);

    fill("#24252B");
    rect(366, 355, 736, 30);
    fill(255);
    text("Tempo :", 380, 375);
    textSize(12);
    text(int(Tone.Transport.bpm.value) + "bpm", 440, 375);

    highlight = (beats-1) % nSteps;
    for(var track=0; track<nTracks; track++){
        for(var step=0; step<nSteps; step++){
            if(cells[track][step] == 1){
                if(step === highlight){
                    stroke("#A6A6A6");
                    strokeWeight(4);
                }
                else{
                    stroke("#A6A6A6");
                    strokeWeight(1);
                }
                fill("#5EC6D4");
                rect(366 + (step * 46.9), 400 + (track * 53), 33, 40);
                noStroke();
            }
            else{
                if(step === highlight){
                    stroke("#A6A6A6");
                    strokeWeight(4);
                }
                else{
                    stroke("#A6A6A6");
                    strokeWeight(1);
                }
                if(step < 4){
                    fill('#24252B');
                    rect(366 + (step * 46.9), 400 + (track * 53), 33, 40);
                    noStroke();
                }
                else if(step < 8){
                    fill("#383C3F");
                    rect(366 + (step * 46.9), 400 + (track * 53), 33, 40);
                    noStroke();
                }
                else if(step < 12){
                    fill('#24252B');
                    rect(366 + (step * 46.9), 400 + (track * 53), 33, 40);
                    noStroke();
                }
                else if(step < 16){
                    fill("#383C3F");
                    rect(366 + (step * 46.9), 400 + (track * 53), 33, 40);
                    noStroke();
                }
            }
        }
    }
    // console.log(tempo.getPos())
    v1.update();
    v1.display();
    v2.update();
    v2.display();
    v3.update();
    v3.display();
    v4.update();
    v4.display();
    v5.update();
    v5.display();
    v6.update();
    v6.display();

    tempo.update();
    tempo.display();

    masterV.update();
    masterV.display();

    fill(255);
    textSize(17);
    image(volume, 213, 162, 25, 25);
    text("Master Volume", 250, 181);


    drawDrum();
    image(logo, 212, 75, 250, 40);
    
    if(drum_judge === "true"){
        drawDrumEffect();
    }
    

    

    if(judge === 'true'){
        image(pause, 240, 260, 30, 30);
        fill(255);
        mouseOn();
        text("Pause", 288, 281);
        fill(255);
    } else if(judge === "false"){
        image(play, 240, 260, 30, 30);
        fill(255);
        mouseOn();
        text("Play", 288, 281);
        fill(255);
    }
    
    if(drum_judge === 'true'){
        image(pause, 370, 260, 30, 30);
        fill(255);
        if (((mouseX >= 369) && (mouseX <= 512)) && ((mouseY >= 260) && (mouseY <= 290))) {
            fill("#5EC6D4");
        }
        text("Drum Off", 418, 281);
        fill(255);
    } else if(drum_judge === "false"){
        image(play, 370, 260, 30, 30);
        fill(255);
        if (((mouseX >= 369) && (mouseX <= 512)) && ((mouseY >= 260) && (mouseY <= 290))) {
            fill("#5EC6D4");
        }
        text("Drum On", 418, 281);
        fill(255);
    }

    savedraw();
    keyDown();

}


function mousePressed(){
	if(366<mouseX && mouseX<1136 && 400<mouseY && mouseY<714){
        var temp_i = ((mouseX-366)/46.9) - (ceil((mouseX-366)/46.9)-1);
        var temp_j = ((mouseY-400)/53) - (ceil((mouseY-400)/53)-1);
        if(temp_i < 0.7 && temp_j < 0.755){
            var i = floor((mouseX-366)/46.9);
            var j = floor((mouseY-400)/53);
            cells[j][i] = -cells[j][i];
        }
    
    }
}

function togglePlay(){
	if(judge == 'true'){
        Tone.context.resume()
        Tone.Transport.stop();
        judge = "false";
        console.log(judge);
    } else {
        Tone.context.resume()
        Tone.Transport.start();
        judge = "true";
        console.log(judge);
    }
}

function toggleDrumPlay(){
    if(drum_judge == 'true'){
        drum_judge = 'false';
    } else {
        drum_judge = 'true';
    }
}

function mouseClicked(){
    if (((mouseX >= 240) && (mouseX <= 332)) && ((mouseY >= 257) && (mouseY <= 291))) {
        togglePlay();
    }
    if (((mouseX >= 369) && (mouseX <= 512)) && ((mouseY >= 260) && (mouseY <= 290))) {
        toggleDrumPlay();
    }
    if (((mouseX >= 1156) && (mouseX <= 1259)) && ((mouseY >= 111) && (mouseY <= 137))) {
        saveBeat();
        if(memory_index != 0 && memory_index != 3 && memory_index%3 == 0){
            beat_text_arr[2] += 3;
        } else if(memory_index != 1 && memory_index%3 == 1){
            beat_text_arr[0] += 3;
        } else if(memory_index != 2 && memory_index%3 == 2){
            beat_text_arr[1] += 3;
        }
    }
    if (((mouseX >= 1148) && (mouseX <= 1260)) && ((mouseY >= 155) && (mouseY <= 298))) {
        loadBeat();
    }
}

function mouseOn(){
    if (((mouseX >= 240) && (mouseX <= 332)) && ((mouseY >= 257) && (mouseY <= 291))) {
        fill("#5EC6D4");
    }
}


function drawDrum(){
    strokeWeight(1);
    fill("#191919");
    stroke("#5EC6D4");
    rect(580, 75, 523, 245);
    image(drumframe, 545, 64, 543, 255);
    noStroke();
}

function drawDrumEffect(){
    for(var i = 0; i<6 ; i++){
        if(drum_effect[i] == 'true'){
            if(i == 0){
                tint(255, 180);
                image(illu_img[0], drum_pos[0][0], drum_pos[0][1], 76, 35);
                image(illu_img[1], drum_pos[1][0], drum_pos[1][1], 94, 45);
            } else if(i == 1){
                tint(255, 120);
                image(illu_img[2], drum_pos[i+1][0], drum_pos[i+1][1], 123, 42);
            } else if(i == 2){
                tint(255, 180);
                image(illu_img[3], drum_pos[i+1][0], drum_pos[i+1][1], 114, 42);
            } else if(i == 3){
                tint(255, 180);
                image(illu_img[4], drum_pos[i+1][0], drum_pos[i+1][1], 560, 230);
            } else if(i == 4){
                tint(255, 120);
                image(illu_img[5], drum_pos[i+1][0], drum_pos[i+1][1], 157, 66);
            } else if(i == 5){
                tint(255, 180);
                image(illu_img[6], drum_pos[i+1][0], drum_pos[i+1][1], 137, 26);
            }
            noTint();
            drum_effect[i] == 'false';
            
        }
    }
}

function savedraw(){
    textSize(22);
    textStyle('bold');
    if (((mouseX >= 1182) && (mouseX <= 1285)) && ((mouseY >= 111) && (mouseY <= 137))) {
        fill("#5EC6D4");
    }
    text("Save Beat", 1186, 130);

    textStyle(NORMAL);
    textSize(17);
    fill(255);
    if (((mouseX >= 1193) && (mouseX <= 1290)) && ((mouseY >= 158) && (mouseY <= 187))) {
        fill("#5EC6D4");
    }
    text("ｏ Beat " + beat_text_arr[0], 1196, 180);
    fill(255);
    if (((mouseX >= 1193) && (mouseX <= 1290)) && ((mouseY >= 211) && (mouseY <= 238))) {
        fill("#5EC6D4");
    }
    text("ｏ Beat " + beat_text_arr[1], 1196, 230);
    fill(255);
    if (((mouseX >= 1193) && (mouseX <= 1290)) && ((mouseY >= 261) && (mouseY <= 288))) {
        fill("#5EC6D4");
    }
    text("ｏ Beat " + beat_text_arr[2], 1196, 280);
    fill(255);
}

function saveBeat(){
    for(var track=0; track<nTracks; track++){
        memory[memory_index % 3][track] = [];
        for(var step=0; step<nSteps; step++){
            memory[memory_index % 3][track][step] = cells[track][step];
        }
    }
    // 초기화
    for(var track=0; track<nTracks; track++){
        for(var step=0; step<nSteps; step++){
            cells[track][step] = -1;
        }
    }
    memory_index = memory_index + 1;
}

function loadBeat(){
    if (((mouseX >= 1157) && (mouseX <= 1254)) && ((mouseY >= 158) && (mouseY <= 187))) {
        for(var track=0; track<nTracks; track++){
            for(var step=0; step<nSteps; step++){
                cells[track][step] = memory[0][track][step];
            }
        }
    }
    if (((mouseX >= 1157) && (mouseX <= 1254)) && ((mouseY >= 211) && (mouseY <= 238))) {
        for(var track=0; track<nTracks; track++){
            for(var step=0; step<nSteps; step++){
                cells[track][step] = memory[1][track][step];
            }
        }
    }
    if (((mouseX >= 1157) && (mouseX <= 1254)) && ((mouseY >= 261) && (mouseY <= 288))) {
        for(var track=0; track<nTracks; track++){
            for(var step=0; step<nSteps; step++){
                cells[track][step] = memory[2][track][step];
            }
        }
    }
}

function keyDown(){
    if(drum_judge == "true"){
        if (keyIsDown(221)){
            drum_effect[4] = "true";
        }else{
            drum_effect[4] = "false";
        }
        if (keyIsDown(219)){
            drum_effect[5] = "true";
        }else{
            drum_effect[5] = "false";
        }
        if (keyIsDown(186)){
            drum_effect[0] = "true";
        }else{
            drum_effect[0] = "false";
        }
        if (keyIsDown(81)){
            drum_effect[1] = "true";
        }else{
            drum_effect[1] = "false";
        }
        if (keyIsDown(87)){
            drum_effect[2] = "true";
        }else{
            drum_effect[2] = "false";
        }
        if (keyIsDown(68)){
            drum_effect[3] = "true";
        }else{
            drum_effect[3] = "false";
        }
    }
}

function keyPressed(){
    if(drum_judge == "true"){
        if (key == ']'){
            var dr = kit.get(drumNames[4]);
            dr.start();
        }
        if (key == '['){
            var dr = kit.get(drumNames[5]);
            dr.start();
            console.log(keyCode);
        }
        if (key == ';'){
            var dr = kit.get(drumNames[0]);
            dr.start();
            console.log(keyCode);
        }
        if (key == 'q'){
            var dr = kit.get(drumNames[1]);
            dr.start();
        }
        if (key == 'w'){
            var dr = kit.get(drumNames[2]);
            dr.start();
        }
        if (key == 'd'){
            var dr = kit.get(drumNames[3]);
            dr.start();
        }
    }
}