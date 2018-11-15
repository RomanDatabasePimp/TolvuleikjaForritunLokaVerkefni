// Multi-Image Preloader

"use strict";

/*jslint browser: true, devel: true, white: true */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Extend the Image prototype (aka augment the "class") 
// with my asyncLoad wrapper. 
//
// I prefer this approach to setting onload/onerror/src directly.
//
Image.prototype.asyncLoad = function(src, asyncCallback) {
    
    // Must assign the callback handlers before setting `this.src`,
    // for safety (and caching-tolerance).
    //
    // Uses the same handler for success *and* failure,
    // because they share a lot of the same logic.
    //
    // NB: The failure case can be identified by the "degenerate" nature
    // of the resulting "loaded" image e.g. test for this.width === 0
    //
    this.onload = asyncCallback;
    this.onerror = asyncCallback;
    
    // NB: The load operation can be triggered from any point 
    // after setting `this.src`.
    //
    // It *may* happen immediately (on some browsers) if the image is already
    // in-cache, but will most likely happen some time later when the load has
    // occurred and the resulting event is processesd in the queue.
    this.src = src;
};


// imagePreload
//
// Horrible stuff to deal with the asynchronous nature of image-loading 
// in the browser...
//
// It requires setting-up a bunch of handler callbacks and then waiting for them
// *all* to be exectued before finally triggering our own `completionCallback`.
//
// Makes use of "closures" to handle the necessary state-tracking between the
// intermediate callback handlers without resorting to global variables.
//
// IN  : `requiredImages` - an object of <name:uri> pairs for each image
// OUT : `loadedImages` - object to which our <name:Image> pairs will be added
// IN  : `completionCallback` - will be executed when everything is done
//
function imagesPreload(requiredImages,
                       loadedImages,
                       completionCallback) {

    var numImagesRequired,
        numImagesHandled = 0,
        currentName,
        currentImage,
        preloadHandler;

    // Count our `requiredImages` by using `Object.keys` to get all 
    // "*OWN* enumerable properties" i.e. doesn't traverse the prototype chain
    numImagesRequired = Object.keys(requiredImages).length;

    // A handler which will be called when our required images are finally
    // loaded (or when the fail to load).
    //
    // At the time of the call, `this` will point to an Image object, 
    // whose `name` property will have been set appropriately.
    //
    preloadHandler = function () {

        loadedImages[this.name] = this;

        if (0 === this.width) {
            console.log("loading failed for", this.name);
        }

        // Allow this handler closure to eventually be GC'd (!)
        this.onload = null;
        this.onerror = null;

        numImagesHandled += 1;

        if (numImagesHandled === numImagesRequired) {

            completionCallback();
        }
    };

    // The "for..in" construct "iterates over the enumerable properties 
    // of an object, in arbitrary order." 
    // -- unlike `Object.keys`, it traverses the prototype chain
    //
    for (currentName in requiredImages) {

        // Skip inherited properties from the prototype chain,
        // just to be safe, although there shouldn't be any...
        
        // I prefer this approach, but JSLint doesn't like "continue" :-(
        //if (!requiredImages.hasOwnProperty(currentName)) { continue; }
        
        if (requiredImages.hasOwnProperty(currentName)) {
            currentImage = new Image();
            currentImage.name = currentName;

            currentImage.asyncLoad(requiredImages[currentName], preloadHandler);
        }
    }
}

// All preloaded images
var g_images = {};
/**
 * Request preloads can be used to preload images, add all images to their correct file (client/img/*)
 * then link the file here and add the name of the sprite.
 */


function requestPreloads() {

  var requiredImages = {
    grassTile: './client/img/grassTile.png',
    player: './client/img/Player/player_06.png',
    highLight: './client/img/highLight.png',
    house: './client/img/house.png',
    terrain: './client/img/crate_04.png',
    key: './client/img/keys/platformPack_item014.png',
    powerUp: './client/img/keys/platformPack_item003.png',
    tallGrass: './client/img/tallGrass_tile.png',
    //Sara
    saraPlayer: './client/img/Player/sara_player.png',
    saraHidden: './client/img/Player/sara_hidden.png',
    saraLeft1: './client/img/Player/sara_20.png',
    saraLeft2: './client/img/Player/sara_21.png',
    saraRight1: './client/img/Player/sara_17.png',
    saraRight2: './client/img/Player/sara_18.png',
    saraDown1: './client/img/Player/sara_06.png',
    saraDown2: './client/img/Player/sara_07.png',
    saraUp1: './client/img/Player/sara_08.png',
    saraUp2: './client/img/Player/sara_09.png',
    //Monster
    monster: './client/img/Monster/platformChar_idle.png',
    monsterHidden: './client/img/Monster/monster_hidden.png',
    monsterClimb1: './client/img/Monster/platformChar_climb1.png',
    monsterClimb2: './client/img/Monster/platformChar_climb2.png',
    monsterDuck: './client/img/Monster/platformChar_duck.png',
    monsterHappy: './client/img/Monster/platformChar_happy.png',
    monsterWalk1: './client/img/Monster/platformChar_walk1.png',
    monsterWalk2: './client/img/Monster/platformChar_walk2.png',
    //Bob
    bobRight1: './client/img/Player/player_17.png',
    bobHidden: './client/img/Player/bob_hidden.png',
    bobRight2: './client/img/Player/player_18.png',
    bobLeft1: './client/img/Player/player_20.png',
    bobLeft2: './client/img/Player/player_21.png',
    //Sama mynd og player
    bobDown1: './client/img/Player/player_06.png',
    bobDown2: './client/img/Player/player_07.png',
    bobUp1: './client/img/Player/player_08.png',
    bobUp2: './client/img/Player/player_09.png',
    cloud: './client/img/clouds.png'
  };

  imagesPreload(requiredImages, g_images, preloadDone);
  mainInit();
}

var g_sprites = {};
/**
 * Once finished, add the sprite as a new object of the g_sprites.
 * Called via g_sprites.sprite
 * kicks off by drawing an empty
 */
function preloadDone() {

  g_sprites.grassTile = new Sprite(g_images.grassTile);
  g_sprites.tallGrass = new Sprite(g_images.tallGrass);
  g_sprites.player = new Sprite(g_images.player);
  g_sprites.highLight = new Sprite(g_images.highLight);
  g_sprites.house = new Sprite(g_images.house);
  g_sprites.terrain = new Sprite(g_images.terrain);
  g_sprites.key = new Sprite(g_images.key);
  g_sprites.powerUp = new Sprite(g_images.powerUp);
  //----------Sara--------------//
  g_sprites.saraPlayer = new Sprite(g_images.saraPlayer);
  g_sprites.saraHidden = new Sprite(g_images.saraHidden);
  g_sprites.saraDown1 = new Sprite(g_images.saraDown1);
  g_sprites.saraDown2 = new Sprite(g_images.saraDown2);
  g_sprites.saraLeft1 = new Sprite(g_images.saraLeft1);
  g_sprites.saraLeft2 = new Sprite(g_images.saraLeft2);
  g_sprites.saraUp1 = new Sprite(g_images.saraUp1);
  g_sprites.saraUp2 = new Sprite(g_images.saraUp2);
  //---------Monster------------//
  g_sprites.monster = new Sprite(g_images.monster);
  g_sprites.monsterHidden = new Sprite(g_images.monsterHidden);
  g_sprites.monsterClimb1 = new Sprite(g_images.monsterClimb1);
  g_sprites.monsterClimb2 = new Sprite(g_images.monsterClimb2);
  g_sprites.monsterDuck = new Sprite(g_images.monsterDuck);
  g_sprites.monsterHappy = new Sprite(g_images.monsterHappy);
  g_sprites.monsterWalk1 = new Sprite(g_images.monsterWalk1);
  g_sprites.monsterWalk2 = new Sprite(g_images.monsterWalk2);
  //---------Bob----------------//
  g_sprites.bobRight1 = new Sprite(g_images.bobRight1);
  g_sprites.bobHidden = new Sprite(g_images.bobHidden);
  g_sprites.bobRight2 = new Sprite(g_images.bobRight2);
  g_sprites.bobLeft1 = new Sprite(g_images.bobLeft1);
  g_sprites.bobLeft2 = new Sprite(g_images.bobLeft2);
  g_sprites.bobDown1 = new Sprite(g_images.bobDown1);
  g_sprites.bobDown2 = new Sprite(g_images.bobDown2);
  g_sprites.bobUp1 = new Sprite(g_images.bobUp1);
  g_sprites.bobUp2 = new Sprite(g_images.bobUp2);
  g_sprites.cloud = new Sprite(g_images.cloud);
}
