var can1 ;
var can2 ;
var ctx1 ;
var ctx2 ;
var lastTime;//上一帧的时间
var deltaTime;//两帧之间的时间差
var bgpic = new Image();
var canWidth;
var canHeight;
var alga;
var fruits;
var mm;
var mmTail = [];
var mmEye = [];
var mmBodyOra = [];
var mmBodyBlue = [];
var mx;
var my;
var baby;
var babyTail = [];
var babyEye = [];
var babyBody = [];
var deta;
var dust;
var dustPic = [];


document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	can1 = document.getElementById("canvas1");//fishes,dust,ui,cirle
    can2 = document.getElementById("canvas2");//background,fruits
    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove', onMousemove,false);

    bgpic.src="background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;

	alga = new algaObj();
	alga.init();
	fruits = new fruitsObj();
	fruits.init();
	mm = new mmObj();
	mm.init();
	baby = new babyObj();
	baby.init();
	deta = new detaObj();
   
   mx = canWidth*0.5;
   my = canHeight*0.5;

   	ctx1.fillStyle = "white";
	ctx1.font = "30px Verdana";
    ctx1.textAlign= "center";
//dust
    for(var i=0;i<7;i++){
    	dustPic[i] = new Image();
    	dustPic[i].src = "./pic/dust"+i+".png";
    }
    dust = new dustObj();
    dust.init();



//big fish
   for(var i=0;i<8;i++){
   	mmTail[i] = new Image();
   	mmTail[i].src = "./pic/bigTail"+i+".png";
   }
    for(var i=0;i<2;i++){
   	mmEye[i] = new Image();
   	mmEye[i].src ="./pic/bigEye" +i+".png";
   }
   for(var i=0;i<8;i++){
   	mmBodyOra[i] = new Image();
    mmBodyBlue[i] = new Image();
   	mmBodyOra[i].src = "./pic/bigSwim" + i+".png"; 
  	mmBodyBlue[i].src = "./pic/bigSwimBlue" +i+".png";
   }

//small fish
   for(var i=0;i<8;i++){
   	babyTail[i] = new Image();
   	babyTail[i].src = "./pic/bigTail"+i+".png";
   }
   for(var i=0;i<2;i++){
   	babyEye[i] = new Image();
   	babyEye[i].src ="./pic/babyEye" +i+".png";
   }
   for(var i=0;i<20;i++){
   	babyBody[i] = new Image();
   	babyBody[i].src = "./pic/babyFade" + i+".png";
   }
}
function gameloop(){
	window.requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime>50) deltaTime = 50;
    drawbg();
    alga.draw();
    fruitsmonitor();
    fruits.draw();

    ctx1.clearRect(0,0,canWidth,canHeight);
    mm.draw();
    baby.draw();
    mmFruitsCollistion();
    mmbabycollision();
    deta.draw();
    dust.draw();
    
}
function onMousemove(e){
	if(!deta.gameOver){
		if(e.offSetx || e.layerX){
		mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	
	    }
    }
}
	
