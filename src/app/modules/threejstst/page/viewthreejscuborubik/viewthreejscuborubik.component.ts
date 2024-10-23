import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

@Component({
  selector: 'app-viewthreejscuborubik',
  standalone: true,
  imports: [],
  templateUrl: './viewthreejscuborubik.component.html',
  styleUrl: './viewthreejscuborubik.component.css'
})
export class ViewthreejscuborubikComponent implements OnInit{
 @ViewChild("meCanvasRubik", {static: true}) meCanvasRenderer!:ElementRef<HTMLCanvasElement>
 @ViewChild("tstsize", { static: true }) metstsize!:ElementRef<HTMLElement>
 private renderer!:THREE.WebGLRenderer;
 private meScene!:THREE.Scene;
 private camera!:THREE.PerspectiveCamera;
 private orbitControl!:OrbitControls;
 private dragControls!:DragControls;
 private objects:THREE.Object3D[]=[];
 private cuboRubik:THREE.Group=new THREE.Group();
 //private colors:string[]=["red","blue","orange","blue","yellow","orange"]
 private colors:string[]=["black","black","black","black","black","black"]
 ngOnInit():void{
  this.initThree();
  this.createScene();
  this.meAnimate();
 }
 initThree(){
  let divElement= this.metstsize.nativeElement
  this.meScene= new THREE.Scene();
  //this.camera= new THREE.PerspectiveCamera(44,(window.innerWidth/2)/(window.innerHeight/2), 0.1, 1000);
  this.camera= new THREE.PerspectiveCamera(44, (divElement.clientWidth/divElement.clientHeight), 0.1, 1000)
  this.camera.position.z= 10;
  this.renderer= new THREE.WebGLRenderer({ canvas: this.meCanvasRenderer.nativeElement });
  //this.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  this.renderer.setSize(divElement.clientWidth, divElement.clientHeight)
  this.orbitControl= new OrbitControls(this.camera, this.renderer.domElement);
  this.orbitControl.enableDamping= true;
  this.orbitControl.dampingFactor= 0.25;
  this.orbitControl.enableZoom= true;
  window.addEventListener("resize", () => this.resizemethree(), false);
 }
 createScene(){
  const cuboRubik= this.createCuboRubik();
  cuboRubik.position.set(0, 0, 0)
  this.meScene.add(cuboRubik)
  this.objects.push(cuboRubik)
  // const meCube= this.createCube()
  // meCube.position.set(1, 0, 0)
  // this.meScene.add(meCube)
  // this.objects.push(meCube)

  const pointLight= new THREE.PointLight(0xd4af37, 100, 10);
  pointLight.position.set(-2, 1, 2)
  this.meScene.add(pointLight)
  const pointLight1= new THREE.PointLight(0xd4af37, 100, 7)
  pointLight1.position.set(3, -1, 2)
  this.meScene.add(pointLight1)
  const ambientLight= new THREE.AmbientLight(0xffffff, 10);
  ambientLight.position.set(1, 1, 1);
  this.meScene.add(ambientLight);
  const ambientLight1= new THREE.AmbientLight(0xffffff, 10)
  ambientLight1.position.set(2, -4, 1)
  this.meScene.add(ambientLight1)
  const directionalLight= new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(1, 1, 1);
  this.meScene.add(directionalLight);
  const directionalLight1= new THREE.DirectionalLight(0xffffff, 10)
  directionalLight1.position.set(-2, -2, 1)
  this.meScene.add(directionalLight1)
  this.dragControls= new DragControls(this.objects, this.camera)
  this.dragControls.addEventListener("dragstart", () => this.dragControls.enabled= false)
  this.dragControls.addEventListener("dragend", () => this.orbitControl.enabled= true)
 }
 createCube(n:number){
  const cubeGeometry= new THREE.BoxGeometry(1, 1, 1);
  var materials= [
    new THREE.MeshStandardMaterial({ color: this.colors[n], emissive: new THREE.Color("black"), metalness: 0.8, envMapIntensity: 0.8, emissiveIntensity: 0.6, roughness: 0.4}),
    new THREE.MeshStandardMaterial({ color: this.colors[n], emissive: new THREE.Color("black"), metalness: 0.8, envMapIntensity: 0.8, emissiveIntensity: 0.6, roughness: 0.4}), 
    new THREE.MeshStandardMaterial({ color: this.colors[n], emissive: new THREE.Color("black"), metalness: 0.8, envMapIntensity: 0.8, emissiveIntensity: 0.6, roughness: 0.4}),
    new THREE.MeshStandardMaterial({ color: this.colors[n], emissive: new THREE.Color("black"), metalness: 0.8, envMapIntensity: 0.8, emissiveIntensity: 0.6, roughness: 0.4}),
    new THREE.MeshStandardMaterial({ color: this.colors[n], emissive: new THREE.Color("black"), metalness: 0.8, envMapIntensity: 0.8, emissiveIntensity: 0.6, roughness: 0.4}),
    new THREE.MeshStandardMaterial({ color: this.colors[n], emissive: new THREE.Color("black"), metalness: 0.8, envMapIntensity: 0.8, emissiveIntensity: 0.6, roughness: 0.4})
  ]
  const cube= new THREE.Mesh(cubeGeometry, materials) 
  return cube
 }
 createCuboRubik(){
  for(var ii=-1; ii<2; ii++){
    const groupRubik= new THREE.Group();
  for(var i= -1; i < 2; i++){
      for(var o=-1; o< 2; o++){
        const meCube= this.createCube(ii + 1)
        //meCube.position.set(i - 1, o + 1 - 1, 0)
        meCube.name = ii + "" + i + "" + o;
        meCube.position.set(ii + ii / 20, i + i / 20, o + o / 20);
        groupRubik.add(meCube);
      }
  }
  //groupRubik.position.set((ii%3) - 1, Math.floor(ii/3) - 1, 0)
  // groupRubik.position.x= (ii%3) - 1
  //groupRubik.position.x= (ii + 1 )
  // groupRubik.position.y= Math.floor(ii / 3) - 1
  //groupRubik.position.y= Math.floor(ii + 1)
  this.cuboRubik.add(groupRubik)
  }
  //return groupRubik;
  return this.cuboRubik;
 }
 meAnimate(){
  requestAnimationFrame(() => this.meAnimate())
  this.orbitControl.update()
  this.meScene.children.find(c => {
  //   if(c instanceof THREE.Mesh){
  //     c.rotation.x+= 0.01;
  //     c.rotation.y+= 0.02;
  //     c.rotation.z+= 0.002;
  //   }
    if(c instanceof THREE.Group){
     c.children.find(cc => {
      cc.rotation.x+= 0.01;
      cc.rotation.y+= 0.02;
      cc.rotation.z+= 0.002;
     })
    } 
  })
  this.renderer.render(this.meScene, this.camera);
 }
 resizemethree(){
  let divElement= this.metstsize.nativeElement
  let height= divElement.clientHeight
  let widht= divElement.clientWidth
  //this.camera.aspect= (window.innerWidth/2) / (window.innerHeight/2);
  this.camera.aspect= (widht/height);
  this.camera.updateProjectionMatrix();
  //this.renderer.setSize((window.innerWidth/2), (window.innerHeight/2));
  this.renderer.setSize(widht, height)
 }
}
