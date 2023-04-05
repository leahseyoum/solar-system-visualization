import * as THREE from 'three';

export function Stars(scene) {
    const vertices = [];


    const numPoints = 2000;
    for (var i = 0; i < numPoints; i++) {
        var x = THREE.MathUtils.randFloatSpread(2500);
        var y = THREE.MathUtils.randFloatSpread(2500);
        var z = THREE.MathUtils.randFloatSpread(2500);

        vertices.push(x, y, z);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        sizeAttenuation: false,
        size: 2,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

}