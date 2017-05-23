(function(){
	var meteor=angular.module('meteor',[]);
	meteor.directive('meteor',['$timeout',function($interval,$timeout){
		return {
			restrit:'E',
			replace: true,
			template:'<canvas></canvas>',
			link:function(scope,el){
				var WIN_WIDHT=document.documentElement.clientWidth;
				var WIN_HEIGHT=document.documentElement.clientHeight;
				el[0].setAttribute('style','position:absolute;top:0;left:0');
				el[0].width=WIN_WIDHT;
				el[0].height=WIN_HEIGHT;
				var context=el[0].getContext('2d');
				function drammanystary(count,context){
					for(var i=0;i<count;i++){
							var origin = new Object();
							origin.x=Math.random()*WIN_WIDHT;
							origin.y=Math.random()*el[0].height;
							drawstar(context,origin);
					}
				};
				el.bind('touchmove',function(e){
					p={x:e.touches[0].pageX,y:e.touches[0].pageY};
					context.clearRect(0,0,WIN_WIDHT,WIN_HEIGHT);
					drawstar(context,p);
				});
				
				var allstars=new Array();
				el.bind('click',function(e){
					var p={x:e.pageX,y:e.pageY};
					for(var i=0,count=10;i<count;i++){
							var star=new Object();
							star.x=p.x;
							star.y=p.y;
							var r=Math.round(Math.random()*255);
							var g=Math.round(Math.random()*255);
							var b=Math.round(Math.random()*255);
							var alpha=Math.round(Math.random());
							star.fillStyle='rgb('+r+','+g+','+b+')';
							star.vx=Math.random()*20-10;
							star.vy=Math.random()*10-5;
							
							allstars.push(star);
					};
				});
				
				setInterval(function(){
					context.clearRect(0,0,WIN_WIDHT,WIN_HEIGHT);
					for(item in allstars){
						var star=allstars[item];
						star.x=star.x+star.vx;
						star.vy=star.vy+0.4;
						star.y=star.y+star.vy;
						
						if(star.x<0||star.x>WIN_WIDHT){
							star.vx=-star.vx;
						}
						if(star.y>=WIN_HEIGHT){
							star.vy=-star.vy;
							
						}
						if(star.y>WIN_HEIGHT+40){
							allstars.splice(item,1);
						}else{
							drawstar(context,{x:star.x,y:star.y},star.fillStyle);
						}
					}
				},1000/60)
				function drawstar(context,origin,color){
					var R=20,r=10;
				
					var star=Star(origin,R,r);	
					var length=star.length;
					context.beginPath();

					context.moveTo(star[0].x,star[0].y);
					for(var i=1;i<length;i++){
						var path=star[i];			
						context.lineTo(path.x,path.y);
					};
					context.fillStyle=color;
					context.lineTo(star[0].x,star[0].y);
					context.closePath();
					context.fill();
				};
				function Star(origin,R,r){
					var thta=(2*Math.PI)/5;
					   return [
						{x:origin.x,y:origin.y-R},
						{x:origin.x-r*Math.cos(Math.PI/2-thta/2),y:origin.y-r*Math.sin(Math.PI/2-thta/2)},
						{x:origin.x-R*Math.cos(Math.PI/2-thta),y:origin.y-R*Math.sin(Math.PI/2-thta)},
						{x:origin.x-r*Math.cos(thta*3/2-Math.PI/2),y:origin.y+r*Math.sin(thta*3/2-Math.PI/2)},
						{x:origin.x-R*Math.sin(Math.PI-2*thta),y:origin.y+R*Math.cos(Math.PI-2*thta)},
						{x:origin.x,y:origin.y+r},
						{x:origin.x+R*Math.sin(Math.PI-2*thta),y:origin.y+R*Math.cos(Math.PI-2*thta)},
						{x:origin.x+r*Math.cos(thta*3/2-Math.PI/2),y:origin.y+r*Math.sin(thta*3/2-Math.PI/2)},
						{x:origin.x+R*Math.cos(Math.PI/2-thta),y:origin.y-R*Math.sin(Math.PI/2-thta)},
						{x:origin.x+r*Math.cos(Math.PI/2-thta/2),y:origin.y-r*Math.sin(Math.PI/2-thta/2)},
						]
				}
			}
		}
	}]);
})()