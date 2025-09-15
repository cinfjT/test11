import * as THREE from 'three';


export let objList: any[] = [];
// 测试叠在一起的椭圆拖动的是哪个
export function createGeometry2() {
    const geometry = new THREE.BoxGeometry(1, 1, 0);
    const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
    depthTest: true
    });
    const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
    depthTest: true
    });
    const mesh1 = new THREE.Mesh(geometry, material);
    const mesh2 = new THREE.Mesh(geometry, material2);
    // this.threeSer._scene.add(mesh1, mesh2);

    mesh1.position.set(1, 1, 0);
    mesh1.userData = {type: 'mesh1' };
    mesh2.position.set(3, 3, 0);
    mesh2.userData = {type: 'mesh2' };


    objList = [mesh1, mesh2];// 射线检测返回优先级：传入顺序《z  和 renderOrder 无关
    mesh1.renderOrder = 0;
    mesh2.renderOrder = 2;

    // this.threeSer._dragControls.objects.push(mesh1, mesh2);// 拖拽优先级：传入顺序《z  和 renderOrder 无关

}