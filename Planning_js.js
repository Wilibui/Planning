let b;
let u;
let day;
let studieBlocks = [];
let y;
let xl1;
let xl2;

let c =[255, 255, 255];

function setup() {
  createCanvas(windowWidth, windowHeight);
  plan();
  day = 0;
}


function draw() {
  resizeCanvas(windowWidth, windowHeight);
  u = height/10;
  b = width/23;
  background(170, 0, 0);
  let date = new Date();
  day = (date.getDay())-1;
  if (day <= -1) {
    day = 6;
  }

  for (let studieBlock of studieBlocks) {
    studieBlock.update();
    studieBlock.show();
  }

  for (let i = 8; i <= 20; i++) {
    let j = map(i, 8, 20, 2*u, height-u);
    strokeWeight(u/10);
    stroke(0);
    line(b/2, j, 3*b/2, j);
    noStroke();
    fill(0);
    textAlign(CENTER, BOTTOM);
    textSize(u/2);
    text(i, b, j);
  }

  for (let i = 0; i <= 7; i++) {
    j = i*2.5*b + 2*b;
    strokeWeight(u/10);
    stroke(0);
    line(j, u, j, height-u);
    noStroke();
    if(day == i){fill(255);}
    else{fill(0);}
    textAlign(CENTER, CENTER);
    switch(i){
      case 0:
        d = "Mon";
        break;
      case 1:
        d = "Tue";
        break;
      case 2:
        d = "Wed";
        break;
      case 3:
        d = "Thu";
        break;
      case 4:
        d = "Fri";
        break;
      case 5:
        d = "Sat";
        break;
      case 6:
        d = "Sun";
        break;
      case 7:
        d = "";
        break;   
    }
    text(d, j+1.25*b, 1.5*u);   
  }  
  strokeWeight(u/10);
  stroke(0);
  line(2*b, 2*u, 19.5*b, 2*u);
  line(2*b, height-u, 19.5*b, height-u);
  
  y = map(hour()+minute()/60, 8, 20, 2*u, height-u);
  strokeWeight(u/20);
  stroke(c[0], c[1], c[2]);
  line(2*b, y, 22*b, y);
  textAlign(CENTER, BOTTOM);
  textSize(u/2);
  fill(c[0], c[1], c[2]);
  noStroke();
  text(hour() + ":" + minute(), 21*b, y);
}

class StudieBlock {
  constructor(day, start, stop, vak) {
    this.day = day - 1;
    this.start = start;
    this.stop = stop;
    this.vak = vak;
  }

  update() {
    this.yStart = map(this.start, 8, 20, 2*u, height-u);
    this.yStop = map(this.stop, 8, 20, 2*u, height-u);
    this.x = 2*b + this.day*2.5*b;
    this.h = this.yStop-this.yStart;
  }

  show() {
    if (day == this.day && this.start <= hour()+minute()/60 && hour()+minute()/60 <= this.stop) {
      this.a = 255;
    } else {
      this.a = 100;
    } 
    stroke(0);
    switch(this.vak) { 
    case "D&E":
      fill(255, 255, 0, this.a);
      break;
    case "Mat":
      fill(255, 0, 255, this.a);
      break;
    case "Wis":
      fill(0, 255, 0, this.a);
      break;      
    case "O&E":
      fill(200, this.a);
      break;      
    case "Che":
      fill(0, 255, 255, this.a);
      break;
    default:  
      fill(255, this.a);
    }   
    strokeWeight(u/10);
    rect(this.x, this.yStart, 2.5*b, this.h);
    textAlign(CENTER, CENTER);
    noStroke();
    if (this.h < u/0.8) {
      textSize(map(this.h, u/0.8, 0, 0.9*u, 0));
    } else {
      textSize(0.9*u);
    }
    fill(0);
    text(this.vak, this.x + 1.25*b, this.yStart + this.h/2);
    print(u/this.h);
  }
}
