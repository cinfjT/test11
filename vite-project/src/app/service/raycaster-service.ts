import * as THREE from 'three';


export function pointerdownFunc(event: any, domElement: any, camera: any, objList: any) {
    const res = raycasterObjs(event, domElement, camera, objList);
    res.forEach(item => {
      const obj = item.object;
      const worldPosition = new THREE.Vector3();
      obj.getWorldPosition(worldPosition);
      console.log(obj.name, '本地', obj.position, '世界', worldPosition);

      console.log(item)
    });
  }

function raycasterObjs(event: any, domElement: any, camera: any, objList: any){
    const cx = event.offsetX;// 鼠标点击相对画布左上角的屏幕坐标
    const cy = event.offsetY;
    const canvasSize = domElement.getBoundingClientRect();
    const dx = (cx / canvasSize.width) * 2 - 1; // 标准设备坐标
    const dy = -(cy / canvasSize.height) * 2 + 1;
    const raycaster = new THREE.Raycaster(); // 创建射线投射器对象
    raycaster.setFromCamera(new THREE.Vector2(dx, dy), camera); // 给该对象的ray属性赋值，即生成一条射线
    return raycaster.intersectObjects(objList, true); // 第二个参数 是否检测该对象子元素
}