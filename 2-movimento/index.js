import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
/**
 * orbiControls funcionalidade que permite controlar a câmera de forma interativa
 */

let camera, scene, renderer,mesh, controls;

function init(){
    /**Cria a câmera:
     *  com campo de visão de 45graus; 
     * visualização entre 1 a 1000 unidades 
     * "z" define a distancia da câmera em relação ao centro da cena
     * */
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
    camera.position.z = 400

    /**
     * cria a cena vazia e um renderizador WebGl que se ajusta ao tamanho da tela
     */
    scene = new THREE.Scene()    
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    /**coloca o elemento na dom */
    document.body.appendChild(renderer.domElement)

    /**
     * cria um geometry que é um cubo
     * cria um material basico e coloca a cor verde no cubo 
     */
    const geometry = new THREE.BoxGeometry(200, 200, 200)
    const material = new THREE.MeshBasicMaterial()
    material.color = new THREE.Color("#01F30A") 
    
    mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = false
    controls.dampingFactor = 0.5
    controls.minDistance = 200
    controls.maxDistance = 800

    console.log(controls)
}

init()

function render(){
    requestAnimationFrame(render)
     
    if(controls) controls.update()

    renderer.render(scene, camera)
}

render()