// Global variables
var h = 0;
var start = true;
var x ;
// actiates from index.html
// Function calls the progressBar 400 times and that is how the column is going up.
function startProgressBar() {
    x = setInterval(progresBar, 10);
    return;
}
// progressBar controls how high the columns goes and what seconds message it is displaying.
function progresBar(){
   h++;
   document.getElementById("bar").style.height =h + "px";
   let seconds = 0;
   if(h<=80){
      seconds = 5;
   }
   else if(h>=81 && h<=160){
      seconds = 4;
   }
   
   else if(h>=161 && h<=240){
      seconds = 3;
   }
   
   else if(h>=241 && h<=320){
      seconds = 2;
   }
   
   else if(h>=321 && h<=399){
      seconds = 1;
   }
   else{
   seconds = 0;
   }
   
   document.getElementById("status").innerHTML = Math.floor(seconds)+ ' Sec';
   
   if (document.getElementById("bar").style.height == 400 + "px")

   {
      h = 0;
      document.getElementById("bar").style.height = 0 + "px";
      clearInterval(x);
   }
   return;
}