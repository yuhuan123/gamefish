//bg
function drawbg(){
	ctx2.drawImage(bgpic,0,0,canWidth,canHeight)
}
//alga
var algaObj = function(){
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = [];
	this.alpha = 0;
}

algaObj.prototype.num = 50;
algaObj.prototype.init = function(){

	for (var i=0; i<this.num; i++){
		this.rootx[i] = i*16 + Math.random()*10;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight-250+Math.random()*100;
		this.amp[i] = Math.random()*50+60;
		}
    
}
algaObj.prototype.draw = function(){
	this.alpha +=deltaTime*0.0008;
	var l = Math.sin(this.alpha);

	ctx2.save();
	ctx2.strokeStyle = "#3b154e";
    ctx2.lineWidth = 20;
    ctx2.lineCap ="round";
    ctx2.globalAlpha="0.6";
    for(var i=0; i<this.num; i++){

    	ctx2.beginPath();
    	ctx2.moveTo(this.rootx[i],canHeight);
    	this.headx[i] = this.rootx[i]+l*this.amp[i];
    	ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);   	
    	ctx2.stroke();
    	
    }
    ctx2.restore();
}
//fruits
var fruitsObj = function(){
    this.alive = [];
    this.x = [];
    this.y = [];
    this.l = [];
    this.spd = [];
    this.algaNum = [];
    this.fruitsType = [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitsObj.prototype.num = 50;
fruitsObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.algaNum[i] = 0;
		this.fruitsType[i] =0
		this.spd[i] = Math.random()*0.017+0.003;
		this.fruitsType[i] = "";
		
	}
	this.orange.src = "./pic/orange.png";
	this.blue.src = "./pic/blue.png";
}
//draw difrent color fruits;control the size of fruits;set the dead fruits
fruitsObj.prototype.draw = function(){
    for(var i=0;i<this.num;i++){
    	if(this.alive[i]){
    		if(this.fruitsType[i] =="blue"){
    			var pic = this.blue;
    		}
    		else{
    			var pic = this.orange;
    		}
    		if(this.l[i]<=14){
    			var num = this.algaNum[i];
    			this.x[i] = alga.headx[num];
    			this.y[i] = alga.heady[num];
    		    this.l[i] += this.spd[i]*deltaTime;
    		    ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

    	     }
    	else{
    		this.y[i] -= this.spd[i]*7*deltaTime;
    	}
    	ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
    	if(this.y[i]<5){
    		this.alive[i] = false;
    	}
    	}
    	
    }
}
//make fruits born on alga ;blue fruits less than orange fruits
fruitsObj.prototype.born = function(i){

	this.algaNum[i] = Math.floor(Math.random()*alga.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran<0.2){
		this.fruitsType[i] = "blue";
	}else{
		this.fruitsType[i] =  "orange";
	}
	
}
//set the state of dead
fruitsObj.prototype.dead = function(i){
	this.alive[i] = false;
}
fruitsObj.prototype.update = function(){
	var num = 0;
	for(var i=0;i<this.num;i++){
          if(this.alive[i]) num++;
	}
}
//when num<15,let new fruits born
function fruitsmonitor(){
	var num =0;
	for(var i=0;i<fruits.num;i++){
		if(fruits.alive[i]){
			num++;
		}
	}	
	if(num<15){
	 for (var i=0;i<fruits.num;i++){
		if(!fruits.alive[i]){
			fruits.born(i);
			return;
	    }
	}			return;
	}
}

//big fish
var mmObj = function(){
	this.x ;
	this.y ;
	this.angle;
	this.mmTailTimer = 0;
	this.mmTailCount = 0;

	this.mmBodyTimer = 0;
    this.mmBodyCount = 0;

    this.mmEyeTimer = 0;
    this.mmEyeCount = 0;
    this.mmEyeInterval = 1000;
}
mmObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
}
//when mm eat fruits,let the fruits die
function mmFruitsCollistion(){
	if(!deta.gameOver){
		for(var i=0;i<fruits.num;i++){
		    if(fruits.alive[i]){
			var l = calLength2(fruits.x[i],fruits.y[i],mm.x,mm.y);
			if(l<600){
				fruits.dead(i);
				deta.fruitsNum++;
				mm.mmBodyCount++;
				if(mm.mmBodyCount>7){
					mm.mmBodyCount = 7;
				}
				if(fruits.fruitsType[i] =="blue"){
					deta.double =2;
				}
			}
		}
	}
	}
	
}
//let mm follow by mousemove
mmObj.prototype.draw = function(){

	this.x =  lerpDistance(mx,this.x,0.95);
	this.y =  lerpDistance(my,this.y,0.95);
    
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;
    this.angle = lerpAngle(beta,this.angle,0.6);
   
   this.mmTailTimer += deltaTime;
	if(this.mmTailTimer >50){
		this.mmTailCount = (this.mmTailCount +1)%8;
		this.mmTailTimer %= 50;
    }

    this.mmEyeTimer += deltaTime;
    if(this.mmEyeTimer > this.mmEyeInterval){
         this.mmEyeCount = (this.mmEyeCount+1)%2;
         this.mmEyeTimer %= this.mmEyeInterval;
         if(this.mmEyeCount == 0){
         	this.mmEyeInterval = Math.random()*1500 +2000;
         }
         else{
         	this.mmEyeInterval = 200;
         }
    }

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var mmTailCount = this.mmTailCount;
	var mmBodyCount = this.mmBodyCount;
	var mmEyeCount = this.mmEyeCount;

    if(deta.double == 1){
    	ctx1.drawImage(mmBodyOra[mmBodyCount],-mmBodyOra[mmBodyCount].width*0.5,-mmBodyOra[mmBodyCount].height*0.5);
    }else{
    	ctx1.drawImage(mmBodyBlue[mmBodyCount],-mmBodyBlue[mmBodyCount].width*0.5,-mmBodyBlue[mmBodyCount].height*0.5);
    }
    ctx1.drawImage(mmEye[mmEyeCount],-mmEye[mmEyeCount].width*0.5,-mmEye[mmEyeCount].height*0.5);  
    ctx1.drawImage(mmTail[mmTailCount],mmTail[mmTailCount].width*0.5-3,-mmTail[mmTailCount].height*0.5);
    ctx1.restore();
}

	


//small fish
var babyObj = function(){
	this.x ;
	this.y ;
	this.angle;

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 200;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canWidth*0.35 ;
	this.y = canHeight*0.5;
	this.angle = 0;
	


}
//let baby follow by mm
babyObj.prototype.draw = function(){
	if(!deta.gameOver){
		this.x = lerpDistance(mm.x,this.x,0.99);
	this.y = lerpDistance(mm.y,this.y,0.99);

	var deltaY = mm.y - this.y;
    var deltaX = mm.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	this.angle = lerpAngle(beta,this.angle,0.6);

	}
//tail translate
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer >50){
		this.babyTailCount = (this.babyTailCount +1)%8;
		this.babyTailTimer %= 50;
	}
//eye translate ;open its' eyes longer
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount+1)%2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random()*1500+2000;
		}else{
			this.babyEyeInterval = 200;
		}
	}
//body translate
	this.babyBodyTimer +=deltaTime;
	if(this.babyBodyTimer > 500){
		this.babyBodyCount = this.babyBodyCount+1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount>19){
			this.babyBodyCount =19;
			deta.gameOver = true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var babyTailCount = this.babyTailCount;
	var babyEyeCount = this.babyEyeCount;
	var babyBodyCount = this.babyBodyCount;
    
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
    ctx1.restore();
   
}
//when mm meat baby,baby will full blood
function mmbabycollision(){
	if(deta.fruitsNum>0 && !deta.gameOver){
		var l = calLength2(mm.x,mm.y,baby.x,baby.y);
		if(l<600){
		baby.babyBodyCount = 0;
        mm.mmBodyCount = 0;
        deta.addScore();
	}
	}
	
	
}
//score
var detaObj = function(){
	this.fruitsNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}

detaObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;


    ctx1.save();
	// ctx1.fillText("num "+ this.fruitsNum,w*0.45,h-50);
	// ctx1.fillText("double "+this.double,w*0.45,h-80); 
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "#fff";
	ctx1.fillText("score "+this.score,w*0.45,h-20); 
	if(this.gameOver){
		this.alpha += deltaTime*0.0005;
		if(this.alpha>1){this.alpha = 1;}
			ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
		    ctx1.fillText("GAME OVER",w*0.45,h*0.5);		
	}
	ctx1.restore();

}
detaObj.prototype.addScore = function(){
	this.score +=this.fruitsNum *100*this.double;
	this.fruitsNum = 0;
	this.double =1;
}

//dust
var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NO = [];
	this.alpha;

}
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){

		this.x[i] = Math.random()*canWidth;
		this.y[i] = Math.random()*canHeight;
		this.amp[i] = 20+Math.random()*15;
		this.NO[i] = Math.floor(Math.random()*7);
	}
		this.alpha = 0;
}
dustObj.prototype.draw = function(){
	this.alpha +=deltaTime*0.0008;
	var l = Math.sin(this.alpha);
	for(var i=0;i<this.num;i++){		
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
	}
}