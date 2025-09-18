import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { ThreeService } from './service/three-service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createGroup, createGroupMeshs, createMeshMeshs } from './model-create-test/test3';
import { pointerdownFunc } from './service/raycaster-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private threeSer: ThreeService) {}

  @ViewChild('threejsDiv') threejsDiv: any;

  object: THREE.Mesh | THREE.Group | any;
  ngOnInit() {

  }
  ngAfterViewInit() {
    // const group = createGroup();
    // this.object = group;

    const res = createGroupMeshs(); // 正常
    // const res = createMeshMeshs(); // 报错

    // this.threeSer._renderer.setSize(this.threejsDiv.nativeElement.clientWidth, this.threejsDiv.nativeElement.clientHeight);
    this.threeSer._renderer.setSize(window.innerWidth, window.innerHeight);
    this.threejsDiv.nativeElement.appendChild(this.threeSer._renderer.domElement);
    this.threeSer._camera.position.set(0, 0, 300);
    this.threeSer._camera.lookAt(0, 0, 0);
    this.threeSer._scene.add(this.threeSer._axes);
    this.threeSer._scene.add(res.group);
    this.animate();

    this.threeSer._renderer.domElement.addEventListener(
      'pointerdown',
      (event) => {
        pointerdownFunc(event, this.threeSer._renderer.domElement, this.threeSer._camera, res.meshs)
      }
    );

    this.threeSer._dragControls.objects.push(...res.meshs);  // 拖拽后, group 的本地(局部)和世界坐标自动更新且相同   group 子元素仅世界坐标自动更新  本地坐标不会自动更新
    this.threeSer._dragControls.transformGroup = true;
    this.threeSer._dragControls.enabled = true;
  }


  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.threeSer._renderer.render(this.threeSer._scene, this.threeSer._camera);
  }


  change() {
    this.object.position.x += 10;
    // this.object.position.y += 10;
    // this.object.rotation.z += 10;
    // this.object.children.forEach((item: any) => {
    //   if (item.name == 'mesh1') {
    //     // item.position.x += 5;
    //     item.rotation.z += 1;
    //   }
    // });
  }
}

// 关键概念解释

// 几何体顶点数据保持不变：

// geometry.attributes.position.array 存储的是模型的本地顶点坐标 这些坐标是相对于模型自身坐标系的，不会因旋转、平移或缩放而改变

// 变换矩阵的作用：

// 当对象旋转、平移或缩放时，Three.js会计算一个变换矩阵 在渲染时，这个矩阵应用于所有顶点，计算出它们在场景中的最终位置 这个过程在GPU中高效完成，不会修改原始几何数据

// 获取世界坐标：

// 可以使用 vertex.applyMatrix4(object.matrixWorld) 将本地坐标转换为世界坐标 这展示了顶点在场景中的实际位置
