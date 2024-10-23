yourUrl = "https://eismoinfo.lt/weather-conditions-service"

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var json_obj = JSON.parse(Get(yourUrl));
console.log(json_obj[119]);



document.getElementById("kryptis").textContent=json_obj[119].vejo_kryptis;
document.getElementById("greitis").textContent=json_obj[119].vejo_greitis_vidut;

const lol = {
    "Šiaurės rytų": 45,
    "Rytų": 90,
    "Pietryčių": 135,
    "Pietų": 180,
    "Pietvakarių": 225,
    "Vakarų": 270,
    "Šiaurės vakarų": 315,
    "Šiaurės": 360
}

function audioPlay(){
    var context = new AudioContext();
    var osc = context.createOscillator(); // instantiate an oscillator

    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = lol[json_obj[119].vejo_kryptis]; // Hz
    var vol = context.createGain();
    vol.gain.value = json_obj[119].vejo_greitis_vidut; // from 0 to 1, 1 full volume, 0 is muted
    osc.connect(vol); // connect osc to vol
    vol.connect(context.destination); // connect vol to context destination

    osc.connect(context.destination); // connect it to the destination
    osc.start(); // start the oscillator
};
  
document.getElementById("lol").onclick = () => audioPlay();