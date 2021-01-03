module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('addBooking', booking => {  //fronend send
            // io.emit('sendBooking', booking)
            socket.broadcast.emit('sendBooking', booking)  //backend send
            // io.to(socket.guideId).emit('sendBooking', )
        })
        socket.on('updateBooking', booking => {  //fronend send
            console.log('booking++++++++++++++++++++++++++:', booking)
            socket.broadcast.emit('approveBooking', booking)  //backend send
        })
        // socket.on('addBooking', booking => {
            // io.emit('sendApproveBooking', booking)
            // io.to(socket.guideId).emit('sendBooking', )
        // })
    //     socket.on('guideId', id=>{
    //         if (socket.guideId) {
    //             socket.leave(socket.guideId)
    //         }
    //         socket.join(id)
    //         socket.guideId = id;
    //     })
        
     }) 
}




