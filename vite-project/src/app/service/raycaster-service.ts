import * as THREE from 'three';


export function pointerdownFunc(event: any, domElement: any, camera: any, objList: any) {
    const objs = raycasterObjs(event, domElement, camera, objList);
    objs.forEach(item => {
      console.log(item);
      console.log(item.object.userData["type"])
    });
  }

function raycasterObjs(event: any, domElement: any, camera: any, objList: any){
    let Sx = event.clientX;//鼠标单击位置横坐标
    let Sy = event.clientY;//鼠标单击位置纵坐标
    const rect = domElement.getBoundingClientRect();
    //屏幕坐标转webGl标准设备坐标
    if (event.changedTouches) {
        Sx = event.changedTouches[0].pageX;
        Sy = event.changedTouches[0].pageY;
    } else {
        Sx = event.clientX - rect.left
        Sy = event.clientY - rect.top
    }
    var x = (Sx / domElement.clientWidth) * 2 - 1;//webgl标准设备横坐标
    var y = -(Sy / domElement.clientHeight) * 2 + 1;//webgl标准设备纵坐标
    var raycaster = new THREE.Raycaster();
    //通过鼠标单击位置标准坐标和相机参数计算射线头投射器Raycaster 射线属性 ray
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    return raycaster.intersectObjects(objList,false);
}