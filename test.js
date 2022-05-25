// var connection, channel
 
// const connetToRabbitMQ = async () => {
 
//     try {
 
//         const amqpServer = 'amqp://<public_ip>:<port_number>'
 
//         connection = await amqp.connect(amqpServer)
 
//         channel = await connection.createChannel()
 
//         await channel.assertQueue('data-channel')
 
//         console.log('Connected with RabbitMQ!')
 
//     } catch(err) {
 
//         console.log('Error in Connection!')
 
//     }
 
// }
 
// connetToRabbitMQ()
 
// const addDataToRabbitMQ = async (data) => {
 
//     await channel.sendToQueue('data-channel', Buffer.from(JSON.stringify(data)))
 
// }
 
// app.post('/', (req, res) => {
 
//     addDataToRabbitMQ(req.body)
 
//     console.log('Data Sent: ', req.body)
 
//     res.json({ message: 'Data Sent' })
 
// })


// // receiver 

// const amqp = require('amqplib')
 
// const processData = async (data) => {
 
//     setTimeout(() => {
 
//         console.log('Data Processed: ', data)
 
//     }, 10000)
 
// }
 
// const connectToRabbitMQ = async () => {
 
//     try {
 
//         const amqpServer = 'amqp://<public_ip>:<port_number>'
 
//         const connection = await amqp.connect(amqpServer)
 
//         const channel = await connection.createChannel()
 
//         await channel.assertQueue('data-channel')
 
//         console.log('Connected with RabbitMQ!')
 
//         channel.consume('data-channel', (data) => {
 
//             const userData = JSON.parse(Buffer.from(data.content))
 
//             processData(userData)
 
//             channel.ack(data)
 
//         })
 
//     } catch(err) {
 
//         console.log('Error in Connection!', err)
//     }
// }
// connectToRabbitMQ()

let data = 5;
console.log(data);
delete data ;
console.log(data);