const yourUrl = "https://eismoinfo.lt/weather-conditions-service"

let nida;
fetch(yourUrl)
    .then(response => response.json())
    .then(data => {
        nida = data.find(selStation => selStation.numeris === "167");
        if (nida === undefined) {
       document.getElementById("station-name").textContent = "technical difficulties, try again later";
       document.getElementById("dir").textContent = "please do not press me, i do not work";
 return;   
}
        document.getElementById("wind-dir").textContent=nida.vejo_kryptis ?? "no data";
        document.getElementById("station-name").textContent=nida.pavadinimas ?? "no data";
        document.getElementById("lat").textContent=nida.lat ?? "no data";
        document.getElementById("lng").textContent=nida.lng  ?? "no data";
        document.getElementById("air-temp").textContent=nida.oro_temperatura ?? "no data";
        document.getElementById("road-temp").textContent=nida.dangos_temperatura ?? "no data";
        document.getElementById("dew-point").textContent=nida.rasos_taskas ?? "no data";
        document.getElementById("wind-avg").textContent=nida.vejo_greitis_vidut ?? "no data";
        document.getElementById("wind-max").textContent=nida.vejo_greitis_maks ?? "no data";
        document.getElementById("precip-type").textContent=nida.krituliu_tipas ?? "no data";
        document.getElementById("precip-amount").textContent=nida.krituliu_kiekis ?? "no data";
        document.getElementById("friction").textContent=nida.sukibimo_koeficientas ?? "no data";
        document.getElementById("kilometer").textContent=nida.kilometras ?? "no data";
    });

const dir2freq = {
    "Šiaurės rytų": 220,
    "Rytų": 246.9,
    "Pietryčių": 261.6,
    "Pietų": 293.7,
    "Pietvakarių": 329.6,
    "Vakarų": 349.2,
    "Šiaurės vakarų": 392,
    "Šiaurės": 196
}

let sound;
function audioPlay(){
    if (nida === undefined) {
      document.getElementById("dir").textContent = "please do not press me, i do not work";
 return;
}
    var context = new AudioContext();
    var osc = context.createOscillator(); // instantiate an oscillator

    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = dir2freq[nida.vejo_kryptis]; // Hz
    console.log(nida.vejo_kryptis, osc.frequency.value);
    var vol = context.createGain();
    vol.gain.value = Math.min( Math.max(Number(nida.vejo_greitis_vidut) / 15, 0.1 ), 1 );
    osc.connect(vol); // connect osc to vol
    vol.connect(context.destination); // connect vol to context destination

   
    osc.start(); // start the oscillator
    sound = osc;
};
  
document.getElementById("dir").onclick = () => audioPlay();
