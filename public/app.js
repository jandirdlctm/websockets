console.log("working");

var app = new Vue({
    el: '#app',
    data: {
        socket: null,
        newMessage: "",
        receivedMessages: [],
        senderName: "",
    },
    methods:{
        connectSocket: function(){
            this.socket = new WebSocket("ws://localhost:3000")
            this.socket.onmessage = (event) =>{
                this.receiveMessage(event);
            }
        },
        receiveMessage: function(event){
            var data = JSON.parse(event.data);
            this.receivedMessages.push(data);
        },
        sendMessage: function(){
            var data = {
                senderName: this.senderName,
                message: this.newMessage
            };
            this.socket.send(JSON.stringify(data));
        }
    },
    created: function(){
        this.connectSocket();
    }
})





