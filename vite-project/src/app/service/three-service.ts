import { Injectable } from "@angular/core";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';


@Injectable({
    providedIn: 'root',
  })
export class ThreeService {

    public _scene: THREE.Scene;
    public _camera: THREE.PerspectiveCamera;
    public _renderer: THREE.WebGLRenderer;
    public _axes: THREE.AxesHelper;
    // public _controls: THREE.OrbitControls;
    // public _orbitControls: OrbitControls;//轨道控制器
    public _dragControls: DragControls;//拖放控制器

    constructor() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
        this._renderer = new THREE.WebGLRenderer();
        this._axes = new THREE.AxesHelper(100).setColors(0xffffff, 0xffffff, 0xffffff);
        // this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
        this._dragControls = new DragControls([], this._camera, this._renderer.domElement);
    }

    ngOnInit() {
        
    }
}