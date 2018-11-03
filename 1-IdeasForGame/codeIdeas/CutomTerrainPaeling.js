


House.prototype.houseStartFrom = [1,2]; // from what point in the matrix we start
House.prototype.houseExtendsBy = [4,4]; // define how many tiles we take to make this house 1
/* f.x in this example we start in the array pos i=1 and j=2
   and the house size will be of 4 tiles to the left and 4 tiles down */

/* map is our map matrix of tiles */
House.prototype.createHouse = function(g_map){
   for(let i= this.houseStartFrom[0]; i < this.houseExtendsBy[0]; i++) {
     for(let j= this.houseStartFrom[1]; j < this.houseExtendsBy[1]; j++){
       g_map[i][j].__doIBelongToSomeoneElse = this;//??? somthing like this
     }
   }
};