import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

@Component({
  selector: 'app-viewthreejscuborubik',
  standalone: true,
  imports: [],
  templateUrl: './viewthreejscuborubik.component.html',
  styleUrl: './viewthreejscuborubik.component.css'
})
export class ViewthreejscuborubikComponent implements OnInit{
 @ViewChild("meCanvasRubik") meCanvasRenderer!:ElementRef<HTMLCanvasElement> 
 private renderer!:THREE.WebGLRenderer;
 private meScene!:THREE.Scene;
 private camera!:THREE.PerspectiveCamera;
 private orbitControl!:OrbitControls;
 private dragControls!:DragControls;
 private objects:THREE.Object3D[]=[];
 ngOnInit():void{
  this.initThree();
 }
 initThree(){
  this.meScene= new THREE.Scene();
  this.camera= new THREE.PerspectiveCamera(75, window.innerHeight/window.innerWidth, 0.1, 1000);
  this.camera.position.z= 10;
  this.renderer= new THREE.WebGLRenderer({ canvas: this.meCanvasRenderer.nativeElement });
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.orbitControl= new OrbitControls(this.camera, this.renderer.domElement);
  this.orbitControl.enableDamping= true;
  this.orbitControl.dampingFactor= 0.25;
  this.orbitControl.enableZoom= true;
  window.addEventListener("resize", () => this.resizemethree(), false);
 }
 resizemethree(){
  this.camera.aspect= window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
 }
}
