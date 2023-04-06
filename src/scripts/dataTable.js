  export function renderTable(positionKey) {
        
            const table = document.getElementById("table-body");
            const nameOfObject = document.getElementById("nameOfObject");
            const planetSymbol = document.getElementById("planetSymbol");
            console.log(planetSymbol);
            console.log(planetSymbol.src);
            const volumeXEarths = document.getElementById("volumeXEarths");
            const diameter = document.getElementById("diameter");
            const surfaceGravity = document.getElementById("surfaceGravity");
            const rotationPeriodEarthDays = document.getElementById("rotationPeriodEarthDays");
            const orbitalPeriod = document.getElementById("orbitalPeriod");
            const surfaceTemperature = document.getElementById("surfaceTemperature");
            const meanOrbitVelocity = document.getElementById("meanOrbitVelocity");
            const moons = document.getElementById("moons");
            const rings = document.getElementById("rings");
            
            
            nameOfObject.innerHTML = planetBodyNames[positionKey].name + "  ";
            planetSymbol.src = "./src/assets/astronomical-symbol/" + planetBodyNames[positionKey].name + "-symbol.png";
            console.log(planetSymbol.src);
            volumeXEarths.innerHTML = planetBodyNames[positionKey].volumeXEarths;
            diameter.innerHTML = planetBodyNames[positionKey].diameter;
            surfaceGravity.innerHTML = planetBodyNames[positionKey].surfaceGravity;
            rotationPeriodEarthDays.innerHTML = planetBodyNames[positionKey].rotationPeriodEarthDays;
            orbitalPeriod.innerHTML = planetBodyNames[positionKey].orbitalPeriod;
            meanOrbitVelocity.innerHTML = planetBodyNames[positionKey].meanOrbitVelocity;
            surfaceTemperature.innerHTML = planetBodyNames[positionKey].surfaceTemperature;
            moons.innerHTML = planetBodyNames[positionKey].moons;
            rings.innerHTML = planetBodyNames[positionKey].rings;
 }

    

    

    const planetBodyNames = {
        0: {
           "id": "1",
           "name": "Sun",
           "volumeXEarths": "1,300,000 ",
           "diameter": "1,392,700",
           "surfaceGravity": "274",
           "rotationPeriodEarthDays": "25",
           "orbitalPeriod": "NA",
           "meanOrbitVelocity": "NA",
           "surfaceTemperature": "5505",
           "moons": "NA",
           "rings": "No"
       },
        28: {
           "id": "2",
           "name": "Mercury",
           "volumeXEarths": "0.056",
           "diameter": "4,879",
           "surfaceGravity": "3.7",
           "rotationPeriodEarthDays": "58",
           "orbitalPeriod": "88",
           "meanOrbitVelocity": "107,218",
           "surfaceTemperature": "167",
           "moons": "0",
           "rings": "No"
       },
       44: {
           "id": "3",
           "name": "Venus",
           "volumeXEarths": "0.866",
           "diameter": "12,104",
           "surfaceGravity": "8.9",
           "rotationPeriodEarthDays": "-243",
           "orbitalPeriod": "225",
           "meanOrbitVelocity": "126,074",
           "surfaceTemperature": "464",
           "moons": "0",
           "rings": "No"
       },
       62: {
           "id": "4",
           "name": "Earth",
           "volumeXEarths": "1",
           "diameter": "12,756",
           "surfaceGravity": "9.8",
           "rotationPeriodEarthDays": "1",
           "orbitalPeriod": "365",
           "meanOrbitVelocity": "107,218",
           "surfaceTemperature": "15",
           "moons": "1",
           "rings": "No"
       },
       'Moon': {
           "id": "5",
           "name": "Moon",
           "volumeXEarths": "0.02",
           "diameter": "3,475",
           "surfaceGravity": "1.62",
           "rotationPeriodEarthDays": "-",
           "orbitalPeriod": "27",
           "meanOrbitVelocity": "3679",
           "surfaceTemperature": "-20",
           "moons": "0",
           "rings": "No"
       },
       78: {      
           "id": "6",  
           "name": "Mars",
           "volumeXEarths": "0.151",
           "diameter": "6,792",
           "surfaceGravity": "3.7",
           "rotationPeriodEarthDays": "1",
           "orbitalPeriod": "687",
           "meanOrbitVelocity": "86,677",
           "surfaceTemperature": "-65",
           "moons": "2",
           "rings": "No"
       },
       120: {
           "id": "7",
           "name": "Jupiter",
           "volumeXEarths": "1,321",
           "diameter": "142,984",
           "surfaceGravity": "24.8",
           "rotationPeriodEarthDays": "0.41",
           "orbitalPeriod": "4,333",
           "meanOrbitVelocity": "47,002",
           "surfaceTemperature": "-110",
           "moons": "92",
           "rings": "Yes"
       },
       158: {
           "id": "8",
           "name": "Saturn",
           "volumeXEarths": "764",
           "diameter": "120,536",
           "surfaceGravity": "10.4",
           "rotationPeriodEarthDays": "0.44",
           "orbitalPeriod": "10,759",
           "meanOrbitVelocity": "34,701",
           "surfaceTemperature": "-140",
           "moons": "83",
           "rings": "Yes"
       },
       184: {
           "id": "9",
           "name": "Uranus",
           "volumeXEarths": "63",
           "diameter": "51,118",
           "surfaceGravity": "8.9",
           "rotationPeriodEarthDays": "-0.72",
           "orbitalPeriod": "30,687",
           "meanOrbitVelocity": "24,477",
           "surfaceTemperature": "-195",
           "moons": "27",
           "rings": "Yes"
       
       },
       210: {
           "id": "10",
           "name": "Neptune",
           "volumeXEarths": "58",
           "diameter": "49,528",
           "surfaceGravity": "11.2",
           "rotationPeriodEarthDays": "0.67",
           "orbitalPeriod": "60,190",
           "meanOrbitVelocity": "19,566",
           "surfaceTemperature": "-200",
           "moons": "14",
           "rings": "Yes"
   
       }
    }






