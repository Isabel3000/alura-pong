//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 24;
let raio = diametro /2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 7;
let raqueteAltura = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  //verificaColisaoRaquete2(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente(xRaquete,yRaquete);
  //movimentaRaquetePlayer2();
  verificaColisaoRaqueteOponente();
  //verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
    circle(xBolinha,yBolinha,diametro);
 }

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || 
      xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  } 
  if (yBolinha + raio > height || 
      yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
  
  yRaquete = constrain(yRaquete, 10, 290);
}

function movimentaRaquetePlayer2(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10
  }
  
  yRaquete = constrain(yRaquete, 10, 290);
}

function verificaColisaoRaquete(x,y){
  if (xBolinha - raio < x + raqueteComprimento && yBolinha - raio < y + raqueteAltura && yBolinha + raio > y){
    velocidadeXBolinha *= -1;
    raquetada.play();
    
  }
}

function verificaColisaoRaquete2(x, y){
  colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar()
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 290)
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function verificaColisaoRaqueteOponente(){
  // deixar comentado!! && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete
  if (xBolinha + raio > xRaqueteOponente){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,165,0));
  rect(230,10,40,25);
  fill(255);
  text(meusPontos, 250, 30);
  fill(color(255,165,0));
  rect(330,10,40,25);
  fill(255);
  text(pontosOponente, 350,30);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
  }
}