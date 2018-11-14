/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* we thought it would be pretty gay if there would be clouds to hinder the players
   visibility on the tiles, cuz u know we be satists */

/* USage : new Cloud(descr) 
     For : descr is a arbitrary amount of values in our case 
           cx,cy,velX
    After: creates a new cloud to fuck with the clients */
function Cloud(descr) {
  for(let property in descr) {
    this[property] = descr[property];
  }
  this.sprite = this.sprite || g_sprites.cloud;
}

Cloud.prototype.halfWidth = 264;
Cloud.prototype.halfHeight = 89.5;

Cloud.prototype.wrapPosition = function () {
    this.cx = wrapRange(this.cx, 0, 640);
    this.cy = wrapRange(this.cy, 0, 640);
};

/* Usage : c.update(du)
    For  : c is a Cloud
           du is constant that represents time in multiples
   After : updates the cloud position */
Cloud.prototype.update = function (du) {
 this.cx += this.velX * du;
 this.wrapPosition();
};

/* Usage : c.render(du)
    For  : c is a Cloud
           ctx is the drawing context
   After : renders the fck cloud */
Cloud.prototype.render = function (ctx) {
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, 0);
};

/* lets make some clouds */
const g_clouds = {
  upper_cloud : new Cloud({cx:0,cy:50,velX: 4}),
  middle_cloud : new Cloud({cx:50,cy:150,velX: 4}),
  bottom_cloud : new Cloud({cx:0,cy:200,velX: 4}),
}
