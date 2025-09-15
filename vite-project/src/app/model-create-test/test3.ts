import * as THREE from 'three';


export function createGeo() {
    const geometry = new THREE.SphereGeometry(25, 50, 50);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });
    const mesh1 = new THREE.Mesh(geometry, material);
    const mesh2 = mesh1.clone();
    mesh2.position.y = 100;
    const mesh3 = mesh1.clone();
    mesh3.position.x = 100;
    const model = new THREE.Group();
    // 三个网格模型mesh1,mesh2,mesh3用于射线拾取测试
    model.add(mesh1, mesh2, mesh3);
    model.updateMatrixWorld(true);
    return model;
}