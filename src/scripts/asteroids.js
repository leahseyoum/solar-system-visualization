import * as THREE from 'three';
import asteroidTexture from '../assets/asteroid.jpg'



export function asteroids(scene) {
    let asteroidCount = 250;
    const textureLoader = new THREE.TextureLoader();

    for( let i = 0; i < asteroidCount; i++) {
        const asteroidSize = Math.random() * 0.01 + 0.4;

        const asteroidGeometry = new THREE.SphereGeometry( asteroidSize, 32, 32 );

        const asteroidMaterial = new THREE.MeshBasicMaterial( { map: textureLoader.load(asteroidTexture) } );

        const asteroid = new THREE.Mesh( asteroidGeometry, asteroidMaterial );

       
        // asteroid.position.x = Math.random() * 20 + 90;
        asteroid.position.y = (Math.random() - 0.5) * 20;
        asteroid.position.z = Math.random() * 20 + 90;
        
        asteroid.rotation.x = -0.5 * Math.PI;
        
        
        const distanceFromSun = Math.random() * 30 + 80;
        const angle = Math.random() * Math.PI * 2;
        asteroid.position.x = Math.cos( angle ) * distanceFromSun;
        asteroid.position.z = Math.sin( angle ) * distanceFromSun;
        
        scene.add( asteroid );

    }


    for( let i = 0; i < asteroidCount; i++) {
        const asteroidSize = Math.random() * 0.001 + 0.2;

        const asteroidGeometry = new THREE.SphereGeometry( asteroidSize, 32, 32 );

        const asteroidMaterial = new THREE.MeshBasicMaterial( { map: textureLoader.load(asteroidTexture) } );

        const asteroid = new THREE.Mesh( asteroidGeometry, asteroidMaterial );

       
        // asteroid.position.x = Math.random() * 20 + 90;
        asteroid.position.y = (Math.random() - 0.5) * 20;
        asteroid.position.z = Math.random() * 20 + 90;
        
        asteroid.rotation.x = -0.5 * Math.PI;
        
        
        const distanceFromSun = Math.random() * 30 + 80;
        const angle = Math.random() * Math.PI * 2;
        asteroid.position.x = Math.cos( angle ) * distanceFromSun;
        asteroid.position.z = Math.sin( angle ) * distanceFromSun;
        
        scene.add( asteroid );

    }
}


