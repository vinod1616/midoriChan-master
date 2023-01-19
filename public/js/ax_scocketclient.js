
console.log(username);
if(username == undefined)
{
    document.location.href = "login";
}
console.log(document.location.href);
var re = new RegExp(/^.*\//);
 console.log( re.exec(document.location.href)[0]);
var socket = io.connect(re.exec(document.location.href)[0]);
console.log("socket2");




//var socket = io.connect("http://192.168.0.107:8080");

//var socket =  io.connect('localhost',{'port':3000});
var myId;
var activeInstumernt = {};
var TestData = {};
TestData['TestDatas']=[];
/* var $messages =  document.getElementById("messages"); // Messages area
window.onload = function() {
			
    $messages =  document.getElementById("messages"); 
};
 */
socket.on('your id',function(data) {
    console.log("your id: ");
    //alert ("hi");
    //myId = data.id;
});

socket.on('on connection', function (data) {
    console.log("on connection: ", data);
    console.log("on connection: " + data.client);
    console.log("Number of client connected: " + data.clientCount);
    console.log("UserName: " + username);

    socket.emit('onSubscribe', 
    { User: username
    });
    
});

socket.on('on disconnect',function(data) {
    console.log("on disconnect: " + data.client);
    console.log("Number of client connected: " + data.clientCount);
});

socket.on('setData',function(data,topic) {
    console.log("your temp: " + data.temperature , topic);
    if(topic == username + '/thw')
    {
    document.getElementById('tempValue').innerHTML = data.temperature ; 
    var watermeter = document.querySelector('.waterlevel');
    watermeter.textContent = `${ data.waterLevel} %`
    console.log("your temp: " + data.temperature);
    document.getElementById('humidityValue').innerHTML = data.humidity ; 
    updateWaterLevel(data.waterLevel);
    }
    
  
});

socket.on('ack Motor status', function (data,topic) {
    console.log("status: ",data, topic,  data.motor_status);
    if(topic == username + '/motstat')
    {

            checkboxElem = document.getElementById('g01-01');

            checkboxElem.checked = data.motor_status;
            if(data.motor_status == 1 )
            {
            document.getElementById("img1-01").src = "/image/weather/pump.png";
            document.getElementById("pump").innerHTML = "On"
            } else{
                document.getElementById("img1-01").src = "/image/weather/pump-off.png";
                document.getElementById("pump").innerHTML = "Off"
            }
            //StartBuutonToggle(data);
  
    }

    
});

function doalert(checkboxElem) {
    if (checkboxElem.checked) {
        socket.emit('motor action', 
        { motor_action: 1,user:username
        });
      //alert ("hi");
    } else {
        socket.emit('motor action', 
        { motor_action: 0,user:username
        });
    }
 /*   console.log(socket.id)
    socket.emit('inputParameter update event', 
    { client: 22,
      clientCount: 44,
    }); */
  }


  function updateWaterLevel( waterLevel) {

        var waves1 = document.getElementById('w1');
        var waves2 = document.getElementById('w2');
        var waves3 = document.getElementById('w3');
        var watermeter = document.querySelector('.waterlevel');
        var level = 0;
        var waves
        waves1.style.cssText = `top : ${(100-waterLevel) * 2 }px`;
        waves2.style.cssText = `top : ${(100-waterLevel) * 2}px`;
        waves3.style.cssText = `top : ${(100-waterLevel) * 2}px`;

/* 
        var flow = setInterval(() => {
        level = level + 1;
        waves1.style.cssText = `top : ${level * 2 }px`;
        waves2.style.cssText = `top : ${level * 2}px`;
        waves3.style.cssText = `top : ${level * 2}px`;
        console.log(level); 
        watermeter.textContent = `${ 100 - level} %`
        if((100 - level)<= waterLevel) {
            clearInterval(flow);
        }
        },2)
 */
  }

