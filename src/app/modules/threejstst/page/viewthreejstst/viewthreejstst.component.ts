import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

@Component({
  selector: 'app-viewthreejstst',
  standalone: true,
  imports: [],
  templateUrl: './viewthreejstst.component.html',
  styleUrl: './viewthreejstst.component.css'
})
export class ViewthreejststComponent implements OnInit{
 @ViewChild("meCanvasRender", {static: true}) meCanvas!:ElementRef<HTMLCanvasElement>
 @ViewChild("tstsize", { static:true }) metstsize!:ElementRef<HTMLElement>
 private renderer!:THREE.WebGLRenderer;
 private scene!:THREE.Scene;
 private camera!:THREE.PerspectiveCamera;
 private orbitControl!:OrbitControls;
 private dragControls!:DragControls;
 private objects:THREE.Object3D[]=[]
 private isMovil:Boolean= false;
//  private meHeight:number= window.innerHeight
//  private meWidth:number= window.innerWidth
 private meHeight:number= window.innerHeight / 2;
 private meWidth:number= window.innerWidth / 2;
 ngOnInit():void{
  this.meInitThree();
  this.meCreateNewScena();
  this.createBackgroundAnimation();
  this.animateScena()
 }
 private meInitThree(){
  let el= this.metstsize.nativeElement
  let height= el.clientHeight
  let width= el.clientWidth
  this.scene= new THREE.Scene();
  //Fov -> Distancia vista Inicia?
  //Aspect -> Dimensiones entre ancho y alto de la pantalla
  //Near -> 
  //Far ->
  //this.camera= new THREE.PerspectiveCamera(75, this.meWidth / this.meHeight, 0.1, 1000);
  //this.camera= new THREE.PerspectiveCamera(7, (this.meWidth/2) / (this.meHeight/2), 0.1, 1000);
  this.camera= new THREE.PerspectiveCamera(7, (width) / (height), 0.1, 1000);
  this.camera.position.z= 48;
  this.renderer= new THREE.WebGLRenderer({ canvas: this.meCanvas.nativeElement })
  //this.renderer.setSize(this.meWidth, this.meHeight);
  this.renderer.setSize(width, height);
  this.orbitControl= new OrbitControls(this.camera, this.renderer.domElement);
  this.orbitControl.enableDamping= true;
  this.orbitControl.dampingFactor= 0.25;
  this.orbitControl.enableZoom= true;
  this.orbitControl.enableRotate= true;
  window.addEventListener("resize", () => this.meWindowReSize(), false)
 }
 //createScena
 private meCreateNewScena(){
   const cube= this.generateCube()  
   cube.position.set(0, 0, 0);
   this.scene.add(cube);
   this.objects.push(cube);
   const ambientLight= new THREE.AmbientLight(0xffffff);
   ambientLight.position.set(-1,1,1)
   this.scene.add(ambientLight);
   const ambientLight1= new THREE.AmbientLight(0xffffff, 2);
   ambientLight1.position.set(2, 3, 1)
   this.scene.add(ambientLight1)
   const directionalLight= new THREE.DirectionalLight(0xffffff, 1);
   directionalLight.position.set(-2, 2, 2);
   this.scene.add(directionalLight);
   const directionalLight1= new THREE.DirectionalLight(0xffffff, 1);
   directionalLight1.position.set(3, -2, 3);
   this.scene.add(directionalLight1);
   const pointLight= new THREE.PointLight(0xffffff, 10, 100);
   pointLight.position.set(1, 1, 1);
   this.scene.add(pointLight)
   const pointLight1= new THREE.PointLight(0xffffff, 10, 200)
   pointLight1.position.set(-2, 2, 3)
   this.scene.add(pointLight1)
   //this.scene.background= new THREE.Color(0xffffff);
   this.dragControls= new DragControls(this.objects, this.camera, this.renderer.domElement);
   this.dragControls.addEventListener("dragstart", () => this.orbitControl.enabled= false);
   this.dragControls.addEventListener("dragend", () => this.orbitControl.enabled= true);
 }
 //GenerateCube
 generateCube(){
  const meGeometry= new THREE.BoxGeometry(2, 2, 2);
  const meMaterials= [
    new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 'red', flatShading: true, roughness: 0.3, metalness: 0.3, envMapIntensity: 0.3}),
    new THREE.MeshStandardMaterial({ color: 0x00ee00, emissive: "orange", flatShading: true, roughness: 0.3, metalness: 0.3, envMapIntensity: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x00dd00, emissive: 'black', flatShading: true, roughness: 0.3, metalness: 0.3, envMapIntensity: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x00cc00, emissive: 'purple', flatShading: true, roughness: 0.3, metalness: 0.3, envMapIntensity: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x00bb00, emissive: 'blue',  flatShading: true, roughness: 0.3, metalness: 0.1, envMapIntensity: 0.3 }),
    new THREE.MeshPhongMaterial({ color: 0x00aa00, emissive: 'green', flatShading: true})
  ]
  const meCube= new THREE.Mesh(meGeometry, meMaterials);
  for(var i=0; i < meMaterials.length; i++){
    const texture= this.createTextTure(260, 260, (i + 1).toString())
    meMaterials[i].map= texture
  }
  console.log(meCube)
  return meCube
 }
 createTextTure(width:number, height:number, text:string){
  const canvas= document.createElement("canvas");
  canvas.width= width
  canvas.height= height
  const context= canvas.getContext('2d')
  if(context){
   context.fillStyle= "white";
   context.font= "Bold 120px Arial";
   context.textAlign= 'center';
   context.textBaseline= 'middle';
   context.fillText(text, width/2, height/2)
  }
  return new THREE.CanvasTexture(canvas)
 }
 //create background animation
 private createBackgroundAnimation(){
  const meStartGeometry= new THREE.BufferGeometry();
  const meStartmaterials= new THREE.PointsMaterial({ color: 0xffffff, size:  0.00022})
  const startVertices= [];
  for(let i=0; i < 100000; i++){
    const x= (Math.random() - 0.5) * 2000;
    const y= (Math.random() - 0.5) * 2000;
    const z= -Math.random() * 2000;
    startVertices.push(x, y, z);
  }
  meStartGeometry.setAttribute("position", new THREE.Float32BufferAttribute(startVertices, 3));
  const starts= new THREE.Points(meStartGeometry, meStartmaterials);
  this.scene.add(starts);
 }
 //animateScena
 private animateScena(){
  requestAnimationFrame(() => this.animateScena());
  this.orbitControl.update();
  // if(this.isMovil){
    this.scene.children.find((child) => {
      if(child instanceof THREE.Mesh){
       child.rotation.x+= 0.01;
       child.rotation.y+= 0.003;
       child.rotation.z+= 0.002;
      }
      // if(child instanceof THREE.Mesh){
      //   child.rotation.x+= 0.07;
      //   child.rotation.y+= 0.0015;
      //   child.rotation.z+= 0.04;
      //  }
    });
  // }
  this.renderer.render(this.scene, this.camera);
 }  
 //resize window
 private meWindowReSize(){ 
  let el= this.metstsize.nativeElement
  let height= el.clientHeight
  let width= el.clientWidth
  //this.camera.aspect= window.innerWidth / window.innerHeight;
  //this.camera.aspect= (window.innerWidth/2) / (window.innerHeight/2);
  this.camera.aspect= (width) / (height);
  this.camera.updateProjectionMatrix();
  //this.renderer.setSize(window.innerWidth, window.innerHeight);
  //this.renderer.setSize((window.innerWidth / 2), (window.innerHeight / 2));
  this.renderer.setSize((width), (height));
 }
 activateGiro(){
  this.isMovil= !this.isMovil;
 }
}
