let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let players = [];

io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    let playersAux = [];    
    for(let i=0; i<players.length; i++){
        if(players[i] !== socket.playerData && players[i] !={}){
          playersAux.push(players[i]);
        }
    }
    players = playersAux;
    io.emit('users-changed', {user: socket.playerData, players: players, event: 'left'}); 
  });

  socket.on('check-users',function(){
    io.emit('users', {players: players});    

  })
 
  socket.on('set-player-data', (playerData) => {
    socket.playerData = playerData;
    if(playerData !={}){
      players.push(playerData);
    }    
    io.emit('users-changed', {user: playerData, event: 'joined', players: players});    
  });
  
  socket.on('add-message', (message) => {    
    io.emit('message', {message: message.message, from: socket.playerData, created: new Date()});    
  });



});
 
var port = process.env.PORT || 3000;
 
http.listen(port, function(){
   console.log('listening in port ' + port);
});