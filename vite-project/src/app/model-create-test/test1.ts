import * as THREE from 'three';


const cubePosX = 3;
const cube2PosY = 3;
// 测试同时拖拽多个
export function createGeometry1() {
    // const geometry = new THREE.BoxGeometry(1, 1, 0.1);
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
    });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(cubePosX, 0, 0);
    // cube.rotation.set(Math.PI / 4, 0, 0);
    // cube.scale.set(2, 1, 1);
    // geometry.translate(3, 0, 0);
    // geometry.rotation.set(Math.PI / 4, 0, 0);
    // geometry.scale.set(2, 1, 1);

    // console.log(cube);

    const material2 = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });
    const cube2 = new THREE.Mesh(geometry, material2);

    cube2.position.set(0, cube2PosY, 0);
    // cube2.rotation.set(Math.PI / 4, 0, 0);
    // cube2.scale.set(2, 1, 1);

    // 创建 TransformGroup
    const transformGroup = new THREE.Group();


    const boundingBox = new THREE.Box3();
    boundingBox.expandByObject(cube);
    boundingBox.expandByObject(cube2);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    const controlPoint = createControlPoint(center);

    const geometry1 = new THREE.PlaneGeometry(size.x, size.y);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
      transparent: true, opacity: 0.1
    });
    const mergeMesh = new THREE.Mesh(geometry1, material1); 
    mergeMesh.add(cube, cube2);
    // cube.position.set(this.cubePosX / 2, 0-size.y/2, 0);
    // cube2.position.set(0, 0, 0);
    // mergeMesh.position.set(center.x, center.y, center.z);
    // geometry1.computeBoundingBox();
    
    // transformGroup.add(cube);
    // transformGroup.add(cube);
    transformGroup.add(mergeMesh);
    transformGroup.add(controlPoint);
    transformGroup.position.set(center.x, center.y, center.z);
    
    

    // this.threeSer._dragControls.objects.push(mergeMesh);// 该threejs版本控制器支持objects属性，其余版本不支持，看该控制器类即可
    // this.threeSer._dragControls.transformGroup = true;

    return mergeMesh;

  }


  
  // 创建控制点可视化
  function createControlPoint(position: any) {
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x0000ff,
      visible: true // 调试时可显示
    });
    const point = new THREE.Mesh(geometry, material);
    point.position.copy(position);
    return point;
  }
    
    
