const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

var server = require('http').createServer(app);
io = require('socket.io').listen(server), 
awsIot = require('aws-iot-device-sdk'); 



//paths
const partialPath = path.join(__dirname, "../templates/partials");
const viewPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");


const NODE_ID = 'UII-DEVICE-W' + "-ClientApp"; 
const INIT_DELAY = 15; 
const TAG = 'Midori-chan_web'; 
var incriment = 0;
 
console.log(TAG, 'Connecting...'); 
randomNumber = Math.floor(Math.random() * Math.floor(1000))
 
var device = awsIot.device({ 
  keyPath: '662d207eed-private.pem.key', 
  certPath: '662d207eed-certificate.pem.crt', 
  caPath: 'RootCA-VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem', 
  clientId: "Midori-chan" +randomNumber, 
  host: 'a2nywzd6gfj3q6-ats.iot.ap-south-1.amazonaws.com', 
  port: 8883, 
  region: 'ap-south-1', 
  debug: false, // optional to see logs on console 
}); 
 
device.on('connect', function() { 
    console.log(TAG, 'device connected!'); 
    //device.subscribe('$aws/things/UII-DEVICE-W/shadow/get/accepted'); 
    //device.subscribe('$aws/things/UII-DEVICE-W/shadow/get/rejected'); 
    // Publish an empty packet to topic `$aws/things/Pi3-DHT11-Node/shadow/get` 
    // to get the latest shadow data on either `accepted` or `rejected` topic 

    //device.subscribe('SetStatusCommand');
    //device.subscribe('SetInputParameters');
    //device.subscribe('getTestParameters');

    //device.subscribe('thw_reading');
    //device.subscribe('motor_status');
    //device.subscribe('OnConnectionWithDevice');

    //device.publish('UpdateDeviceButtonStatus', JSON.stringify({ test_data: 2}));
  //  device.publish('UpdateTestData', JSON.stringify({ test_data: 2}));
   // device.publish('OnConnectionWithDevice', JSON.stringify({ test_data: 2}));


  // setTimeout(onConnection, 2000);



    //device.publish('$aws/things/UII-DEVICE-W/shadow/get', ''); 
    //device.publish('ledOn', JSON.stringify({ test_data: 2}));

  }); 

  device.on('reconnect', function() {

         console.log('reconnect');

      });
   
  device.on('message', function(topic, payload) { 
    console.log(TAG, 'Message Received ' , topic);
   // console.log(topic, payload); 

    if (topic.includes('/thw'))
    {
      console.log("topic received");
        console.log(JSON.parse(payload.toString()));
   
        io.sockets.emit('setData', 
        JSON.parse(payload.toString()),topic); 

    } else if(topic.includes('/motstat'))
    {
        io.sockets.emit('ack Motor status', 
        JSON.parse(payload.toString()),topic);

    }
    payload = JSON.parse(payload.toString()); 
    console.log(TAG, 'message from ', topic, JSON.stringify(payload, null, 4)); 

    //setTimeout(sendData, 5000);
  });


//hbs path setting
hbs.registerPartials(partialPath);
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  // res.render("midori");
  res.render("login");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/midori", (req, res) => {
  res.render("midori");
});



function handler (req, res) {
  res.render("midori");
}







app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT || 5000;
/* app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
 */
server.listen({port: port});

console.log('thw');

io.sockets.on('connection', function (socket) {
  console.log("Socket Connection " ,socket.id);
  //Send client with his socket id
  socket.emit('your id', 
      { id: socket.id});
      console.log("Socket Connection 22 ");

      socket.emit('on connection', 
      { id: socket.id});
      console.log("Socket Connection 22 ");
         
  //device.publish('getTestParameters', JSON.stringify({ test_data: 0}));
  

      

  //socket.emit('ack button status', { instrumrntObject: activeInstr });
  


  socket.on('motor action', function (data) {
    
    console.log("input Para" + data , data.user);

    device.publish(data.user + '/motact',JSON.stringify( { motor_action: data.motor_action })) ;
   
});

socket.on('onSubscribe', function (data) {
 var loggedInUser  = data.User;
 console.log(data);

if(loggedInUser != undefined)
{
  console.log(loggedInUser + "/thw");

  device.subscribe(loggedInUser + "/thw");
  device.subscribe(loggedInUser + "/motstat");
}

 
 
});


  socket.on('inputParameter update event', function (data) {
      console.log("input Para" + data);

    /*    socket.emit('setData', 
      { temperature: 22,
        humidity: 44,
        waterLevel: 10
      });  */

  });
  
  //Info all clients if this client disconnect
  socket.on('disconnect', function () {
    console.log('Disconnect ');
      io.sockets.emit('on disconnect', 
          { client: socket.id,
            clientCount: io.sockets.clients().length-1,
          });
          //cancel timer
  });

});

console.log("input Para" );
