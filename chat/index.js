const app = require("express")()

const http = require("http").createServer(app)

const io = require("socket.io")(http)

http.listen('5555',()=>{
  console.log('http://127.0.0.1:5555')
})


// 创建 聊天服务器代码

io.on('connection', socket =>{

  // 接收room 参数 
  let roomKey = socket.handshake.query.room

  // 进入这个房间
  socket.join(roomKey)

  io.in(roomKey).emit('message', '有人进入了聊天室')

  // 接收客户端的消息
  socket.on('ontify', data=>{
    console.log(data)
    io.in(roomKey).emit('ontify', data)
  })

  socket.on('disconnect', ()=>{
    console.log('有人退出了聊天室')
  })
})