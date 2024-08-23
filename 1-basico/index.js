import * as THREE from "../configThree/build/three.module.js";

/**
 * diferenças de cameras:
 *    ortografica e de perspectiva
 *
 *   https://threejs.org/examples/?q=camera#webgl_camera
 */

let camera, scene, renderer, mesh;

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
    camera.position.z = 400;

    scene = new THREE.Scene()
    console.log(scene)

   renderer = new THREE.WebGLRenderer()
   renderer.setPixelRatio(window.devicePixelRatio); //pega resolução do monitor
   renderer.setSize(window.innerWidth, window.innerHeight) //largura e altura da tela

   document.body.appendChild(renderer.domElement)

   // adicionando box na cena

   const geometry = new THREE.BoxGeometry(200, 200, 200)
   const material = new THREE.MeshBasicMaterial() //parte ligada ao realismo buscar
   mesh = new THREE.Mesh(geometry, material)
   mesh.name = "CAIXAAAAAAA"
   scene.add(mesh)
}

init()

function render(){
    requestAnimationFrame(render)// atualiza a cada frame

    mesh.rotation.x += 0.005; // da o movimento ao elemento

    renderer.render(scene, camera)
}

render()