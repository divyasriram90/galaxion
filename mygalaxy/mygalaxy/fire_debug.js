delay=0;
life=4;
score=0;
timer=0;
eventQ = [];
aliensQ= [];
var hero_img = new Image();
hero_img.src = "hero.jpg";

var alien_image = new Image();
alien_image.src = "alien1.jpg";

var red_alien_img = new Image();
red_alien_img.src = "red_alien.png";

var explode = new Image();
explode.src = "fire.gif";

var red_alienQ=[];
var alienbulQ=[];
var bulletObjs = [];
var heros;
var con;
var foo;
var canvas;

window.requestAnimFrame = (function(callback){
            return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1);
            };
        })();
	
 	function KeyEventObj(type,key)
	{
		this.type = type;
		this.key = key;
		}

	function bullet(x,y) 
	{
				this.x = x;
				this.y = y;
				this.blast=0;
				this.destroy=0;
				this.width=this.height=8;
				this.alive = true;
				
			this.update = function() {
				if(!this.blast)
					{
					this.y -=5;
					}
				if(this.y < 50) {
					this.alive = false;
					}
				}
			
			this.draw = function() {
				
				if(this.alive)
					{
				 	con.beginPath();
        				con.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
        				con.fillStyle = "#1975FF";
        				con.fill();
       				 	con.lineWidth = 4;
        				con.strokeStyle = "blue";
      				  	con.stroke();
					}	
				else
					{
					
					if(this.blast<3)
						{
						con.drawImage(explode,this.x,this.y,30,30);
						this.blast++;
						}
						
					}
				
				}
		
		}
		
	function alien_bullet(x,y) 
	{
				this.x = x;
				this.y = y;
				this.radius=5;
				this.destroy=0;
				this.width=this.height=10;
				this.alive = true;
			this.update = function() 
				{
				    this.y +=3; 				    
				if(this.y>520) 
						{
						this.alive=false;						
						}
				}
			
			this.dead = function(){
					if(!this.alive)
						{return true;}
					else
						{return false;}
				}
				
			this.draw = function() {
				
				if(this.alive)
					{
				 	con.beginPath();
        				con.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        				con.fillStyle = "#FF5C33";
        				con.fill();
       				 	con.lineWidth = 4;
        				con.strokeStyle = "#7D0000";
      				  	con.stroke();
					}	
				}
		
		}

	function hero(x,y) 
	{
			this.x = x;
			this.y = y;
			this.width=40;
			this.height=40;
			this.center_x=20;
			this.delta = 5;
			this.alive = true;
			this.blast=0;
			//this.life=4;
			this.left=false;
			this.right=false;
			this.destroy=0
			this.update = function() {			
				
			    if(this.left)
					{
					if(this.x>0)
						this.x -= this.delta;
					}
					
					 
				if(this.right)
					{
					if(this.x<750)
						this.x += this.delta;
					}
			}
			
		this.draw = function() {
				
				switch(life)
				{
				case 4: con.drawImage(hero_img,0,0,40,40);	
				case 3: con.drawImage(hero_img,0,40,40,40);
				case 2: con.drawImage(hero_img,0,80,40,40);
				
				}
				
				if(this.alive)
					{
						con.drawImage(hero_img,this.x,this.y,40,40);	
					}
				else
					{
						if(this.blast<10)
						{
						con.drawImage(explode,this.x,this.y,100,80);
						this.blast++;
						}
						else
						{
						this.blast=0;
						this.destroy=1;
						}
					}	
			}
		
		
		}
		
	function alien(x,y)
	{
			this.destroy=0;
			this.x=x;
			this.y=y;
			this.counter=0;
			this.count=0;
			this.alive=true;
			this.width=30;
			this.height=30;
			this.left=0;
			this.right=0;
			this.cen_x=this.width/2;
			this.cen_y=this.height/2;
			this.flag=0;
			this.blast=0;
			this.update = function()
			{	
				if(this.x<300)
					this.left=1;
				else
					this.right=1;				
			}
			
			this.dead= function()
				{
					if(!this.alive)
						return true;
					else
						return false;
				}
				
			this.draw = function()
			{
			 	if(this.alive)
					{
					con.drawImage(alien_image,this.x,this.y,this.width,this.height);
					}
					else
					{
						if(this.count<10)
						{
						con.drawImage(explode,this.x,this.y,60,50);
						this.count++;
						}
						else
						this.destroy=1;
					}
			}
	
		}	
				
	function red_alien(x,y)
	{
			this.destroy=0;
			this.x=x;
			this.y=y;
			this.fly=false;
			this.count=0;
			this.amp=x;
			this.rotate=1;
			this.angle=1;
			this.prev=1000;
			this.start=x;
			this.direction=1;
			this.alive=true;
			this.width=30;
			this.height=30;
			this.blast=0;
		this.update = function()
			{
				if(this.start>400)
					this.direction=1;    //toggle between directions of 2 aliens
				else 
					this.direction=-1;
				this.angle++;
					
			if(this.fly)
				{
					if(this.count<5)
						this.count+= 1;		//delay in the movement
					else
					{
					this.count = 0;
						if(this.y < 500) 
						{
        					// Sine wave equation
        					this.x = this.amp+ (this.direction* 250 * Math.sin(this.y*Math.PI/180));
        					this.x = Math.floor(this.x);
        			
        					if(this.prev>this.x)
        						this.rotate=1;
        					else
        						this.rotate=-1;
        							
							console.log(this.x);
        					this.y+=5;
        					this.amp--;
        					this.prev=this.x;
   			 			}   					
					}
			    }
			}
		this.reset= function()
				{
					this.x=this.amp=this.start;
					this.y=10;
					this.alive=true;
					
				}
				
		this.draw = function()
			{
			 		if(this.alive)
			 		{
			 		con.save();
			 		con.translate(this.x,this.y);
			 		con.translate(this.width/2,this.height/2);
			 		con.rotate(this.rotate*(this.angle)/30);
			 		if((this.angle/30)>10)
			 			this.angle=0;
			 		//con.drawImage(red_alien_img,this.x,this.y,this.width,this.height);
			 		con.drawImage(red_alien_img,-this.width/2,-this.height/2,this.width,this.height);
			 		con.restore();
			 		}	
			 		else
					{
						if(this.blast<30)
						{
						con.drawImage(explode,this.x,this.y,100,80);
						this.blast++;
						}
						else
						{
						this.destroy=1;
						score=score+500;
						}
					}		 	
			}	
		}			
			
	function bullets_update()
	{
			for(var b in bulletObjs) 
				{
				var bullet = bulletObjs[b];
				if(bullet.y<0)
					bulletObjs.splice(b,1);
				bullet.update();
 				}
	}
	
	function red_alien_update()
	{	var total_red=1;
			for(r in red_alienQ)  				 	//TOGGLE BETWEEN THE RED_ALIENS
				{
				if (red_alienQ[r].y==500 || (red_alienQ[r].alive==false && red_alienQ[r].destroy==1))
					{				
					red_alienQ[r].fly=false;
					red_alienQ[r].reset();
						if(r==total_red)	
							red_alienQ[0].fly=true;
						else
							red_alienQ[(r+1)%2].fly=true;
					}	
				
				if(red_alienQ[r].fly)  				 //RED_ALIENS SHOOTING BULLETS
				{
					if(delay>50)
					{
					alienbulQ.push(new alien_bullet(red_alienQ[r].x+15,red_alienQ[r].y+30));
					delay=0;
					}
					delay++;
				}
				red_alienQ[r].update();
				}
	}
	
	function aliens_update()
	{
		len=aliensQ.length-1;
        for (var a in aliensQ)
			{
			var alien=aliensQ[a];
			alien.update();
				if(alien.destroy)
					{
						aliensQ.splice(a,1);
						score=score+100;
					}
			}
		red_alien_update();
	}

 	function collisions_with_alien()
	{
		if(bulletObjs.length)
			{
				for(var a in aliensQ)
				 {
				  for(var b in bulletObjs)
					{
					if(aliensQ[a].x <= bulletObjs[b].x + bulletObjs[b].width && aliensQ[a].x + aliensQ[a].width >= bulletObjs[b].x && aliensQ[a].y <= bulletObjs[b].y + bulletObjs[b].height && aliensQ[a].y + aliensQ[a].height >= bulletObjs[b].y )
						{						
						bulletObjs[b].alive=false;
						aliensQ[a].alive=false;
						aliensQ[a].draw();	
						bulletObjs.splice(b,1);					
						}
					}
				 }	
				 for(var a in alienbulQ)  //COLLISIONS BETWEEN 2 BULLETS
				 {
				  for(var b in bulletObjs)
					{
					if(alienbulQ[a].x <= bulletObjs[b].x + bulletObjs[b].width && alienbulQ[a].x +alienbulQ[a].width >= bulletObjs[b].x && alienbulQ[a].y <= bulletObjs[b].y + bulletObjs[b].height && alienbulQ[a].y + alienbulQ[a].height >= bulletObjs[b].y )
						{						
						bulletObjs[b].alive=false;
						alienbulQ[a].alive=false;
						alienbulQ[a].draw();
						if(bulletObjs[b].blast==3)
								bulletObjs.splice(b,1);	
						alienbulQ.splice(a,1);					
						}
					}
				 }
				for(var a in red_alienQ)
				 {
				  for(var b in bulletObjs)
					{
					if(red_alienQ[a].x <= bulletObjs[b].x + bulletObjs[b].width && red_alienQ[a].x + red_alienQ[a].width >= bulletObjs[b].x && red_alienQ[a].y <= bulletObjs[b].y + bulletObjs[b].height && red_alienQ[a].y + red_alienQ[a].height >= bulletObjs[b].y )
						{						
						bulletObjs[b].alive=false;
						red_alienQ[a].alive=false;
						red_alienQ[a].draw();						
						}
					}
				 }	 
							 
			}
	}
	
	function display(type)
	{
	  con.fillStyle = "red";
  	con.font = "bold 32px Arial";
  	con.fillText(type, 150, 300);
	}

	function collisions_with_hero()
	{
	var hit=0;
			for(var a in aliensQ)  						//collisions with normal aliens
				 {				 
					if(aliensQ[a].x < heros.x + heros.width && aliensQ[a].x + aliensQ[a].width > heros.x && aliensQ[a].y < heros.y + heros.height && aliensQ[a].y + aliensQ[a].height > heros.y )	
						{
						hit=1;	
						break;
						}														
				 }
			for(var a in red_alienQ)   					//collisions with red flying aliens
				 {				 
					if(red_alienQ[a].fly)
					{
					if(red_alienQ[a].x < heros.x + heros.width && red_alienQ[a].x + red_alienQ[a].width > heros.x && red_alienQ[a].y < heros.y + heros.height && red_alienQ[a].y + red_alienQ[a].height > heros.y )					
						{
						hit=1;	
						break;
						}							
					}					
				 }
			for(var a in alienbulQ) 					//collisions with  bullets
				 {
				 if( alienbulQ[a].x >= heros.x && alienbulQ[a].x <= heros.x+heros.width && alienbulQ[a].y >= heros.y)						
					{
					hit=1;
					break;
					}
				}	
			if(hit)
					{
						if(heros.alive == true)
							{
							life=life-1;
							heros.alive=false;
							}
				}
			heros.draw()

					
	}
	
	function alienbullet_update()
	{
	if (alienbulQ.length)
			{
				for(var b in alienbulQ) 
					{
					var bullet = alienbulQ[b];
					bullet.update();
					if(bullet.dead())
						{
						alienbulQ.splice(b,1);
						}
 					}
 			}
	}

	function update()
	{
			// Get the events from the Q and process them
			processEvent();	//created bullets - alive
			collisions_with_hero();
			collisions_with_alien();
			bullets_update();
			aliens_update();
			alienbullet_update();
			if(heros.alive==false && heros.destroy==1)
			{
			delete heros;
			heros=new hero(250,500); 
			}
			
			heros.update();
			document.getElementById('score').value=score;
			var bar = new Date();
			var baz = (bar-foo)/1000;
			document.getElementById('time').value=baz;
		}
			
	function random_alien()
	{
	var len=aliensQ.length-1;
		for(i=0;i<3;i++)
		{
			alien_index=Math.floor((Math.random()*len)+1); //Alien to shoot bullets
			alienbulQ.push(new alien_bullet(aliensQ[alien_index].x+aliensQ[alien_index].cen_x,aliensQ[alien_index].y+aliensQ[alien_index].height));
		}
	}	
	
	function processEvent() 
	{
			
			event = eventQ.shift();
			if(event)
			{	
				if(event.key == 32) 		//UP
					{ 
					if(bulletObjs.length<3)
					bulletObjs.push(new bullet(heros.x+heros.center_x,heros.y));
					}
				if(event.key == 37) 		//LEFT
					{ 					  
					  heros.left=true;					  
					}
				if(event.key == 39)		//RIGHT
					{
					heros.right=true;
					}
					 
				if(event.key== "up")
					{
						if(heros.left)
							heros.left=false;
						if(heros.right)
							heros.right=false;
					
					}	
				 heros.update();
			}
		}

	function render() 
	{
			for(var b in bulletObjs) 
				{
				var bullet = bulletObjs[b];
				bullet.draw();
				}
			
			for(var a in aliensQ)
				{
				var alien=aliensQ[a];
				alien.draw();
				}
			
			heros.draw();
		
			for(var b in alienbulQ) 
				{
				var bullet = alienbulQ[b];
				bullet.draw();
 				}
 			
 			for(var r in red_alienQ)
 				{
 				if(red_alienQ[r].fly==true)
					red_alienQ[r].draw();
				}
		}
	

	function step() {
			update();
			con.clearRect(0,0,1000,1000);
			
			if(life==1)
				{
				display("     Sorry Try Harder...:( !!!");
				return;
				}				
			if(life==0)
				{
				display("     Your Game has been Stopped");
				return;
				}
			if(aliensQ.length==0)
				{				
				display("CONGRATULATONS..YOU WIN..!!!\\m/");				
				return;
				}
				
			render(); 
			requestAnimFrame(step);

		}

	function reset()
	{	for(i=0;i<320;i+=80) 
			aliensQ.push(new alien(250+i,50));
		for(i=0;i<480;i+=80) 
			aliensQ.push(new alien(180+i,100));
		for(i=0;i<320;i+=80) 
			aliensQ.push(new alien(250+i,150));
		
		red_alienQ.push(new red_alien(350,10));
		red_alienQ.push(new red_alien(405,10));
		red_alienQ[0].fly=true;
		heros=new hero(250,500); 
	}
	
	function stopgame()
	{
		life=0;
	}
	
	function newgame()
	{

	life = 0;
	delay=0;
	score=0;
	eventQ = [];
	aliensQ= [];
	red_alienQ=[];
	alienbulQ=[];
 	bulletObjs = [];
 	document.getElementById('score').value=0;
 	document.getElementById('time').value=0;
 	hero_img = new Image();
	hero_img.src = "hero.jpg";
	alien_image = new Image();
	alien_image.src = "alien1.jpg";
 	red_alien_img = new Image();
	red_alien_img.src = "red_alien.png";
	explode = new Image();
	explode.src = "fire.gif";
	clearInterval(timer);
	 	window.onload();
	 
	 
	}
	
window.onload = function(){
		life=4;		
		canvas = document.getElementById('ca');
		canvas.focus();
		foo = new Date();
		reset();
		con = canvas.getContext('2d');
		canvas.onclick = function() {
			bulletObjs.push(new bullet(heros.x+heros.center_x,heros.y));	//SHOOT - MOUSE CLICK;
		}
		canvas.onkeydown = function() {			
	     		eventQ.push(new KeyEventObj('keydown',event.which)); 
				};		
		canvas.onkeyup = function() {			
	     		eventQ.push(new KeyEventObj('keydown',"up")); 
				};
				 timer=setInterval("random_alien()",2000);
step();
};