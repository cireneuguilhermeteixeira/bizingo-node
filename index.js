
const utilsRpc = require('./client/www/handler-rpc');


var express = require('express');
var http = require('http');
var path = require('path');
const remoConfig = require('remo.io');
const handlerSuccess = require('./utils/handler-success');
const handlerError = require('./utils/handler-error');
const app = express();


/*
    configure and create web server
*/
// serve application files
app.use(express.static(path.join(__dirname,  "./client/www")));
// serve remo.io library
app.use(express.static(path.join(__dirname,  "./dist/browser")));

const httpServer = http.createServer(app);


const api = {

    hello:(what)=> {
        console.log("Hello " + what + " from client!");
        return "Hello from server!";
    },

    connectOnePlayer:(player)=>{
        if(players.length == 0){
            players.push(player);
            return api.hello("teste");
            //return handlerSuccess("Usuário "+player.id+" entrou.");
        }else if(players.length ==1){
            if(players[0].id == player.id){
                return handlerError("Já existe um player "+player.id+" conectado.");
            }else {
                players.push(player);
                return api.hello("teste");
                //return handlerSuccess("Usuário "+player.id+" entrou.");
            }
        }else if(players.length >1){
            return handlerError("Sala já está lotada.");
        }
    },


    somePromise: function(value) {
        return new Promise((resolve, reject) => {
            if (value != null) {
                resolve(value+1)
            } else {
                reject("Specify a value!");
            }
        });
    },


    callMeBack: function(cb1, cb2) {
        cb1("Server called you back");
        cb2("Server called you back again");
    },

    echo: (param) => param,
    // you can also expose builtins...
    log: console.log,
    // ... or even all functions of a module
    fs: require('fs'),
}
const remoServer = remoConfig.createServer({ httpServer, api });

/*
    serve clients
*/
httpServer.listen(3000, () => {
    console.log("\nexample running at http://localhost:" + httpServer.address().port);
});
