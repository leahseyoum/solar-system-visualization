import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// import starsTexture from '../img/stars-background.jpg';
// import sunTexture from '../img/sun.png';
// import mercuryTexture from '../img/mercury.jpg';
// import venusTexture from '../img/venus.jpg';
// import earthTexture from '../img/earth.webp';
// import marsTexture from '../img/mars.jpg';
// import jupiterTexture from '../img/jupiter.jpg';
// import saturnTexture from '../img/saturn.jpg';
// import uranusTexture from '../img/uranus.jpg';
// import neptuneTexture from '../img/neptune.jpg';

//Scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
    ); 
    
camera.position.set(-90, 140, 140);
    
    

//lights
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
   
//renderer
const renderer = new THREE.WebGLRenderer();    
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera)

//Add to HTML
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement)

orbit.update();


const cubeTextureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});