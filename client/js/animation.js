let steps = [
    {step : { x:0,y:0}},
    {step : { x:0,y:1}},
    {step : { x:0,y:2}}   
]
function moveMen(){
var car = new Car(20,10);
var carImg = new Image();
carImg.src = "https://i.stack.imgur.com/L2XQW.png";
let i =0;
function Car(x,y)
{
    this.x = x;
    this.y = y;
}
Car.prototype.advancePosition = function(x,y)
{
   this.x = lerp(car.x, car.x + x, 0.32);
   this.y = lerp(car.y, car.y + 0, 0.32);
}
 function update()
 {
   car.advancePosition(0.41,0.4);
 }
function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}
function render()
{
    i++
    if(i%2 == 0 || i%3==0 || i%4 == 0|| i%5 == 0){
        carImg.src = './client/img/Player/player_17.png'
    }else{
        carImg.src = './client/img/Player/player_18.png'
    }
  g_ctx.beginPath();
  //g_ctx.clearRect(0,0, canvas.width, canvas.height);
  g_ctx.drawImage(carImg, car.x, car.y);
  g_ctx.closePath();
}

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||                    window.mozRequestAnimationFrame|| window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 100);
        };
      })();

(function mainLoop(){
  requestAnimFrame(mainLoop);
  render(i);
  update();
})()
};