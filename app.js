const yourUrl = "https://eismoinfo.lt/weather-conditions-service"

let nida;
fetch(yourUrl)
    .then(response => response.json())
    .then(data => {
        nida = data.find(selStation => selStation.numeris === "167");
        document.getElementById("wind-dir").textContent=nida.vejo_kryptis;
        document.getElementById("station-name").textContent=nida.pavadinimas;
        document.getElementById("lat").textContent=nida.lat;
        document.getElementById("lng").textContent=nida.lng;
        document.getElementById("air-temp").textContent=nida.oro_temperatura;
        document.getElementById("road-temp").textContent=nida.dangos_temperatura;
        document.getElementById("dew-point").textContent=nida.rasos_taskas;
        document.getElementById("wind-avg").textContent=nida.vejo_greitis_vidut;
        document.getElementById("wind-max").textContent=nida.vejo_greitis_maks;
        document.getElementById("precip-type").textContent=nida.krituliu_tipas;
        document.getElementById("precip-amount").textContent=nida.krituliu_kiekis;
        document.getElementById("friction").textContent=nida.sukibimo_koeficientas;
        document.getElementById("kilometer").textContent=nida.kilometras;
    });

const dir = {
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
    osc.frequency.value = dir[nida.vejo_kryptis]; // Hz
    var vol = context.createGain();
    Math.min( Math.max(Number(nida.vejo_greitis_vidut) / 15, 0.1 ), 1 )
    osc.connect(vol); // connect osc to vol
    vol.connect(context.destination); // connect vol to context destination

   
    osc.start(); // start the oscillator
};
  
document.getElementById("dir").onclick = () => audioPlay();
