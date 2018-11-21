# Final project in computergame programing

## Usage
1. `npm install` 
2. `npm start`
3. `enjoy`


## KNOWN BUGS
Heroku will sometimes not load the third window, close and reopen the third player until you get into the game.  
This happens sometimes because the client does not recieve all the files that he needs to play the game.    
You can move with the W,S,D,A keys but they can register out of bounds inputs, it is handled by the server but the player turn
risks being wasted if he tries to move out of bounds.  
When all players press space at the same time or in better words when emit to the client, a race condition can occur
that overwrites the ready state of one player, causing him to press again ( race condition has been patched but even sometimes it does not seem to work)


## LINK TO HEROKU
ftlgame.herokuapp.com

## Authors
Helgi Grétar  
Rafnar  
Roman  
