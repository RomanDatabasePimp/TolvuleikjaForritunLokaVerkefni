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
}

/* DONT FUCKING ASK !!!! for some reason if we tried to define 
   this.sprite = g_sprites.cloud it would always show as undefined,
    even after countless tries of debuggin for some reason g_sprites is fine
    and had the img loaded but still when u would assign g_sprites.cloud it would be undefine */
Cloud.prototype.sprite = g_sprites;

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
  /* just like sex its better be safe than sorry i have no idea why
     the sprite behave so wierd just in this case here ....  */
  if(this.sprite.cloud) {
    this.sprite.cloud.scale = this.scale;
    this.sprite.cloud.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
  }
};

/* lets make some clouds */
const g_clouds = {
  upper_cloud : new Cloud({cx:55,cy:50,velX: 0.6,scale:0.9}),
  middle_cloud : new Cloud({cx:200,cy:300,velX: 0.8,scale:1.2}),
  bottom_cloud : new Cloud({cx:550,cy:500,velX: 0.4,scale:0.6}),
}
