// GENERIC UPDATE LOGIC

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
var NOMINAL_UPDATE_INTERVAL = 100;

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
var g_prevUpdateDt = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
var g_prevUpdateDu = null;

// Track odds and evens for diagnostic / illustrative purposes
var g_isUpdateOdd = false;

function update(dt) {

  // Remember this for later
  var original_dt = dt;
   
  // Warn about very large dt values -- they may lead to error
  if (dt > 200) {
//    console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
    dt = NOMINAL_UPDATE_INTERVAL;
  }
    
  // If using variable time, divide the actual delta by the "nominal" rate,
  // giving us a conveniently scaled "du" to work with.
  var du = (dt / NOMINAL_UPDATE_INTERVAL);
  
  /* kalla á föll sem þurfa að uppfærast in terms of rendering not game logic  */

  // call the character update logic for helgis walking 
  g_animations["bob"].update(du);
  g_animations["sara"].update(du);
  g_animations["monster"].update(du);    
    
  // call the animation for the cloud shit
  for(let cloud in g_clouds) {
    g_clouds[cloud].update(du);
  }

  g_prevUpdateDt = original_dt;
  g_prevUpdateDu = du;
  g_isUpdateOdd = !g_isUpdateOdd;
}