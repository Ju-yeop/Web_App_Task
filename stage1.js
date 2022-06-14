function stage1() {
  background(stage1_back);
  textFont(ft2);
  image(stage1_logo, 500, 265, 600, 75);

  fill(255);

  if (mouseX > 707 && mouseY > 377 && mouseX < 860 && mouseY < 419) {
    if (textx > 702) {
      textx = textx - 2;
      texts = texts + 1;
    }
    if (mouseIsPressed) {
      stage = 2;
    }
  } else {
    if (textx < 717) {
      textx = textx + 2;
      texts = texts - 1;
    }
  }

  textSize(texts);
  text("Drum  Play", textx, 410);
  textFont('Helvetica');

}
