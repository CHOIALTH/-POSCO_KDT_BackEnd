const { Socket } = require('dgram');
const express = require('express');
const app = express();
var http = require("http").Server( app ); //http는 기본 내장모듈이라 별도의 install ,express와 http를 연결하는 것!
var io = require( "socket.io" )( http );

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use( express.json() );

app.get("/", (req,res)=>{
    res.render("index");
})
var client_list = [];
io.on( "connection", function( socket ){ 
    //io라는 객체안의 on이라는 메소드 활용. on은 소켓으로 들어오는 모든 함수를 관리하는 역할을 한다. 소켓에 관한 모든 함수는 on 안에 적으면 된다.
    console.log( "Server Socket Connected");
    // io.emit("notice", socket.id);

    socket.on("login", function(id){
        console.log("clientId : " , id )
        io.emit("notice", `${id}님이 입장하였습니다!`);
        // socket.emit( "response", data + " : " + msg[data] );

    });

    socket.on("send", function(data){
        // data로 해도 된다.
        console.log("content : ", data)
        // var id = 
        io.emit("sendMsg", data)
    });



    // socket.on("send", function(content){
    //     // data로 해도 된다.
    //     // console.log("content : ", data)
    //     io.emit("sendMsg", content)
    // });
    
    // socket.on("welcome", (msg)=>{
    //     console.log("client : ", msg);
    // });

    

    
    //socket이 끊기면 자동으로 전동


    // socket.emit("welcome from server", {
    //     name : "kdt",
    //     msg : "반가워"
        
    // });

    // io.emit("welcome from server", {
    //     name : "kdt",
    //     msg : "이건 io 테스트"
        
    // });

    // socket.on("이벤트명", ("정보를 받아서 할 행동")=>{
    // })
    // socket.emit("");

});

http.listen(8000, ()=>{ //app.~ 이 아닌 http.~이 맞다.
    console.log( "Server : ", 8000);
});