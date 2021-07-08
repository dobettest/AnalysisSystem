const chalk = require('chalk');
const http = require('http');
const socketIo = require('socket.io')
const createSocket = (app, port = 9090) => {
    const Server = http.Server(app)
    // 引入socket.io并立即实例化，把server挂载上去
    const io = socketIo(Server);
    Server.listen(port, () => {
        console.log("socket server listen on" + port)
    })
    return io;
}
exports.createSocket = createSocket;
class Room {
    constructor(name, id, io) {
        this.roomId = id;
        this.roomName = name;
        this.userList = [];
        this.io = io;
    }
    joinRoom(id) {
        let u = this.userList.find((v) => v === id);
        if (u) {
            return "用户已存在此房间"
        }
        return "用户成功加入房间"
    }
    leaveRoom() {
        //let index = this.userList.findIndex((u) => u.clientId === user.clientId);
        //this.userList.splice(index, 1);
        this.io.emit("userLeave")
    }
    robot(q) {
    }
}
module.exports = (app) => {
    const io = createSocket(app);
    const AI = new Room("AI", Date.now(), io);
    io.on("connection", (ws) => {
        ws.on("login", (data) => {
            if(ws.user){
                return ;
            }
            ws.user = { ...data }
        })
        ws.on("sendMessage", (data) => {
            io.emit("receivedMessage",data)
        })
        ws.on("disconnect", () => {
            io.emit("userLeave", ws.user)
        })
    })
}