import * as THREE from "three";
import { OrbitControls } from 'OrbitControls';

let camera, scene, renderer, mesh, controls;

function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 400;

  scene = new THREE.Scene()

  console.log(scene)

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const cube = new THREE.BoxGeometry(200,200,200)
  const material = new THREE.MeshBasicMaterial()

  mesh = new THREE.Mesh(cube, material)
 
  scene.add(mesh)

  controls = new OrbitControls(camera, renderer.domElement)

}

init();

function render() {
 requestAnimationFrame(render)

 if(controls) controls.update()

 renderer.render(scene, camera)
}

render();

/**
 * Responsividade
 */

window.onresize = function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

/**
 * window.onresize é um metodo js que é ativado sempre que o tamanho da tela é reajustado(redimensionada).
 */

/**
 * camera.aspect = reajusta os aspectos da camera em relação a altura e largura
 */

/**
 * camera.updateProjectionMatrix() recalcula a matriz de projeção da camera é importante após os reajustes da tela 
 */

/**
 * renderer.setSize ajusta o tamanho do canvas onde a cena é renderizada.
 */