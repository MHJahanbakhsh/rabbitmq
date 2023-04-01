import * as amqp from 'amqplib';
// import amqp from 'amqplib/callback_api'; this will use callback instead of promises

async function connect(){
    try{
        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs") //this makes sure your queue exists.if it doesn't i'll create one for you

        channel.consume('jobs',message=>{
            console.log(message.content.toString())
        })
        console.log('waiting for messages')
    }
    catch(err){
        console.error(err)
    }
}

connect()