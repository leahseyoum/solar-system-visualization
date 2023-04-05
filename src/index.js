import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Stars } from './scripts/floatingStars';
import { renderTable } from './scripts/dataTable';


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


document.addEventListener('DOMContentLoaded', function() {
    
    const canvas = document.querySelector("#canvas")
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

    //controls 
    const orbit = new OrbitControls(camera, renderer.domElement); //renderer.domElement
    //camera angles
    camera.position.x = -90;
    camera.position.y = 180;
    camera.position.z = 140;

    orbit.minDistance = 20;
    orbit.maxDistance = 900;
    
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
    // textureCube.minFilter = THREE.LinearFilter;
    scene.background = textureCube;
    Stars(scene);

    const textureLoader = new THREE.TextureLoader();

    //creating the sun
    const sunGeo = new THREE.SphereGeometry(16, 50, 50);
    const sunMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(sunTexture)
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.name = "Sun";
    scene.add(sun);
    
    const planetBodies = [];
    this.getplanetBodies = function () {
        return planetBodies;
    }

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
            newRing.rotation.set(1.8,0,0)
        }

        //orbital ring
        const orbitRingGeo = new THREE.RingGeometry(
            distance, 
            distance + 0.8,
            80);
        const orbitRingMaterial = new THREE.MeshBasicMaterial({
                color: 0xf5e96c,
                opacity: 0.2,
                transparent: true,
                side: THREE.DoubleSide
        });
        
        const orbitMesh = new THREE.Mesh(orbitRingGeo, orbitRingMaterial);
        orbitMesh.rotation.x = -0.5 * Math.PI;

        scene.add(orbitMesh);
        scene.add(parentObj);
        planet.position.x = distance;
        planetBodies.push(planet);
        return {planet: planet, parentObj: parentObj}
    };

    function createRing(ring) {
        const ringGeo = new THREE.RingGeometry(
                ring.innerRadius,
                ring.outerRadius,
                32);
        const ringMaterial = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                
        });

        const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);

        return ringMesh;
    }

    const mercury = newPlanet(4, 28, mercuryTexture);
    const venus = newPlanet(5.8, 44, venusTexture);
    const earth = newPlanet(6, 62, earthTexture);
    const mars = newPlanet(3.2, 78, marsTexture);
    const jupiter = newPlanet(12.5, 120, jupiterTexture);
    const saturn = newPlanet(10, 158, saturnTexture, {innerRadius: 13, outerRadius: 15});
    const uranus = newPlanet(7.5, 184, uranusTexture);
    const neptune = newPlanet(7.5, 210, neptuneTexture);

        function animate() {
            //rotation around sun
            mercury.parentObj.rotateY(0.008);
            venus.parentObj.rotateY(0.0045);
            earth.parentObj.rotateY(0.0035);
            mars.parentObj.rotateY(0.0035);
            jupiter.parentObj.rotateY(0.0025);
            saturn.parentObj.rotateY(0.002);
            uranus.parentObj.rotateY(0.0015);
            neptune.parentObj.rotateY(0.001);

            //rotation around self(y-axis)
            sun.rotateY(0.004);
            mercury.planet.rotateY(0.0004);
            venus.planet.rotateY(0.005);
            earth.planet.rotateY(0.008);
            mars.planet.rotateY(0.018);
            jupiter.planet.rotateY(0.018);
            saturn.planet.rotateY(0.015);
            uranus.planet.rotateY(0.012);
            neptune.planet.rotateY(0.014);

            renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.01;

    // add click event listener to renderer
    renderer.domElement.addEventListener('click', onDocumentClick);

    function onDocumentClick(event) {
    // calculate NDC of mouse pointer
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // set raycaster to cast a ray in direction of mouse pointer
    raycaster.setFromCamera(mouse, camera);

    // get objects intersecting with raycaster
    const intersects = raycaster.intersectObjects(scene.children);

    // check if any objects were intersected
    if (intersects.length > 0) {
        // console log when object is clicked
        console.log('clicked');
        const pickedObj = intersects[0].object;
        console.log(pickedObj.position.x)

        renderTable(pickedObj.position.x);
    }
    }


    


});

