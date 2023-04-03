import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import starsTexture from './img/stars.jpg';
import sunTexture from './img/sun.png';
import mercuryTexture from './img/mercury.jpg';
import venusTexture from './img/venus.jpg';
import earthTexture from './img/earth.jpg';
import marsTexture from './img/mars.jpg';
import jupiterTexture from './img/jupiter.jpg';
import saturnTexture from './img/saturn.jpg';
import uranusTexture from './img/uranus.jpg';
import neptuneTexture from './img/neptune.jpg';
import saturnRingTexture from './img/saturnRingTexture.jpg';
import uranusRingTexture from './img/uranusRingTexture.jpg';




document.addEventListener('DOMContentLoaded', function() {
    const renderer = new THREE.WebGLRenderer();
    //create Scene
    const scene = new THREE.Scene();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    
    //Camera
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);
    
    //camera angles
    camera.position.x = -90;
    camera.position.y = 180;
    camera.position.z = 140;

    orbit.update();


    //Lighting
    //lighting from all directions so we can see planets from any angle
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    //light from the center/the sun
    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
    scene.add(pointLight);

    // 3D Background
    const urls = [
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture
    ]

    const textureCube = new THREE.CubeTextureLoader().load(urls);
    textureCube.minFilter = THREE.LinearFilter;
    scene.background = textureCube;


    const textureLoader = new THREE.TextureLoader();

    //creating the sun
    const sunGeo = new THREE.SphereGeometry(16, 50, 50);
    const sunMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(sunTexture)
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    

    function newPlanet(size, distance, texture, ring) {
        const geo = new THREE.SphereGeometry(size, 50, 50);
        const material = new THREE.MeshBasicMaterial({
            map: textureLoader.load(texture)
        });
        const planet = new THREE.Mesh(geo, material);
        //in order for planets to have individual rotations, create parent 3d obj unique to each planet
        const parentObj = new THREE.Object3D();
        parentObj.add(planet);
        if (ring) {
            let newRing = createRing(ring);
            parentObj.add(newRing);
            newRing.position.x = distance;
            //in order to rotate aorund x-axis
            newRing.rotation.x = -0.5 * Math.PI;
        }

        //orbital ring
        const orbitRingGeo = new THREE.RingGeometry(
            distance, 
            distance + 0.02,
            80);
        const orbitRingMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        })
        const orbitMesh = new THREE.Mesh(orbitRingGeo, orbitRingMaterial);
        orbitMesh.rotation.x = -0.5 * Math.PI;

        scene.add(orbitMesh);
        scene.add(parentObj);
        planet.position.x = distance;
        return {planet, parentObj}
    };

    function createRing(ring) {
        const ringGeo = new THREE.RingGeometry(
                ring.innerRadius,
                ring.outerRadius,
                32);
        const ringMaterial = new THREE.MeshBasicMaterial({
                map: textureLoader.load(ring.texture),
                side: THREE.DoubleSide
            });

        const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);

        return ringMesh;
    }

    const mercury = newPlanet(4, 28, mercuryTexture);
    const venus = newPlanet(5.8, 44, venusTexture);
    const earth = newPlanet(6, 62, earthTexture);
    const mars = newPlanet(3.2, 78, marsTexture);
    const jupiter = newPlanet(12.5, 120, jupiterTexture);
    const saturn = newPlanet(10, 158, saturnTexture, {innerRadius: 11, outerRadius: 14, texture: saturnRingTexture});
    const uranus = newPlanet(7.5, 184, uranusTexture, {innerRadius: 10, outerRadius: 12,texture: uranusRingTexture });
    const neptune = newPlanet(7.5, 210, neptuneTexture);
    
    function animate() {
        //rotation around sun
        mercury.parentObj.rotateY(0.04);
        venus.parentObj.rotateY(0.015);
        earth.parentObj.rotateY(0.01);
        mars.parentObj.rotateY(0.008);
        jupiter.parentObj.rotateY(0.002);
        saturn.parentObj.rotateY(0.0009);
        uranus.parentObj.rotateY(0.0004);
        neptune.parentObj.rotateY(0.0001);

        //rotation around self(y-axis)
        sun.rotateY(0.004);
        mercury.planet.rotateY(0.0004);
        venus.planet.rotateY(0.002);
        earth.planet.rotateY(0.02);
        mars.planet.rotateY(0.018);
        jupiter.planet.rotateY(0.04);
        saturn.planet.rotateY(0.038);
        uranus.planet.rotateY(0.03);
        neptune.planet.rotateY(0.032);

        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    })
});

