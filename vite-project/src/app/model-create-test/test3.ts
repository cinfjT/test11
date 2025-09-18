import * as THREE from 'three';


// 返回一个由多mesh组成的Group图元
export function createGroup() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const mesh1 = new THREE.Mesh(geometry, material);
    const mesh2 = mesh1.clone();
    mesh2.position.y = 100;
    const mesh3 = mesh1.clone();
    mesh3.position.x = 100;

    // 材质重置
    mesh1.material.color.set(0xff0000);
    mesh2.material = mesh1.material.clone(); // 直接 clone mesh, material 会共享，除非 material 单独 clone
    mesh2.material.color.set(0x00ff00);
    mesh3.material = mesh1.material.clone();
    mesh3.material.color.set(0x0000ff);
    // 对象命名
    mesh1.name = "mesh1";
    mesh2.name = "mesh2";
    mesh3.name = "mesh3";

    const model = new THREE.Group();
    model.add(mesh1, mesh2, mesh3);
    const res = getBoundingBox(model);
    model.add(res.mesh);
    model.updateMatrixWorld(true);
    return model;
}

// 返回 多mesh组成的group 和 多mesh组成的数组
export function createGroupMeshs() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const mesh1 = new THREE.Mesh(geometry, material);
    const mesh2 = mesh1.clone();
    mesh2.position.y = 100;
    const mesh3 = mesh1.clone();
    mesh3.position.x = 100;

    // 材质重置
    mesh1.material.color.set(0xff0000);
    mesh2.material = mesh1.material.clone(); // 直接 clone mesh, material 会共享，除非 material 单独 clone
    mesh2.material.color.set(0x00ff00);
    mesh3.material = mesh1.material.clone();
    mesh3.material.color.set(0x0000ff);
    // 对象命名
    mesh1.name = "mesh1";
    mesh2.name = "mesh2";
    mesh3.name = "mesh3";

    const model = new THREE.Group();
    model.add(mesh1, mesh2, mesh3);
    const res = getBoundingBox(model);
    model.add(res.mesh);
    model.updateMatrixWorld(true);
    return {
        group: model,
        meshs: [mesh1, mesh2, mesh3]
    };
}


// 返回 多mesh组成的mesh 和 多mesh组成的数组
export function createMeshMeshs() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const mesh1 = new THREE.Mesh(geometry, material);
    const mesh2 = mesh1.clone();
    mesh2.position.y = 100;
    const mesh3 = mesh1.clone();
    mesh3.position.x = 100;

    // 材质重置
    mesh1.material.color.set(0xff0000);
    mesh2.material = mesh1.material.clone(); // 直接 clone mesh, material 会共享，除非 material 单独 clone
    mesh2.material.color.set(0x00ff00);
    mesh3.material = mesh1.material.clone();
    mesh3.material.color.set(0x0000ff);
    // 对象命名
    mesh1.name = "mesh1";
    mesh2.name = "mesh2";
    mesh3.name = "mesh3";

    const model = new THREE.Mesh();
    model.add(mesh1, mesh2, mesh3);
    const res = getBoundingBox(model);
    model.add(res.mesh);
    model.updateMatrixWorld(true);
    return {
        group: model,
        meshs: [mesh1, mesh2, mesh3]
    };
}


// 获取 3D 对象尺寸、中心点、包围盒对象
function getBoundingBox(obj: THREE.Mesh | THREE.Group) {
    const box = new THREE.Box3();
    // 方法一
    box.setFromObject(obj); // 计算3d对象包围盒
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 方法二
    // box.expandByObject(obj);
    // const size = new THREE.Vector3();
    // box.getSize(size);
    // const center = new THREE.Vector3();
    // box.getCenter(center);

    const geometry = new THREE.PlaneGeometry(size.x, size.y);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(center); // 等价 mesh.position.set(center.x, center.y, center.z);
    mesh.name = '包围盒';
    return { size, center, mesh };   // { size: size, center: center, mesh: mesh } 的简写
}