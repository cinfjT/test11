import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { ThreeService } from './service/three-service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createGeo } from './model-create-test/test3';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private threeSer: ThreeService) {}

  @ViewChild('threejsDiv') threejsDiv: any;
  ngOnInit() {

  }
  ngAfterViewInit() {
    // this.threeSer._renderer.setSize(this.threejsDiv.nativeElement.clientWidth, this.threejsDiv.nativeElement.clientHeight);
    this.threeSer._renderer.setSize(window.innerWidth, window.innerHeight);
    this.threejsDiv.nativeElement.appendChild(this.threeSer._renderer.domElement);
    this.threeSer._camera.position.set(300, 300, 300);
    this.threeSer._camera.lookAt(2, 2, 0);
    this.threeSer._scene.add(this.threeSer._axes);
    // this.threeSer._scene.add(createGeo());
    console.log(this.threeSer._scene);
    this.animate();

    

    // this.threeSer._renderer.domElement.addEventListener(
    //   'pointerdown',
    //   this.pointerdownFunc.bind(this)
    // );

  }

  

  

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.threeSer._renderer.render(this.threeSer._scene, this.threeSer._camera);
  }
}
