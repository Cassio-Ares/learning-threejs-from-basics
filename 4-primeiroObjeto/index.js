import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";
/**
 * GLTFLoader carregador usado para carregar 3D no formato GLTF/GLB
 *
 * Neste projeto é usado para carregar uma cadeira para dentro do objeto 3D (office_chair.glb)
 */

let camera, scene, renderer, controls;

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  scene = new THREE.Scene();
  //adicionando background a cena
  scene.background = new THREE.Color(0xffffff);

  renderer = new THREE.WebGLRenderer({
    antialias: true, // melhora a qualidade visual, suavizando bordas serrilhadas nos gráficos 3D renderizados.
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  /**
   * AmbientLigth(aqui colocamos a cor da luz) cria uma luz ambiente que ilumina todos os elementos igualmente
   */
  const ligth = new THREE.AmbientLight("0x404040");
  scene.add(ligth);

  /**
   * DirectionLight(aqui colocamos a cor da luz) cria uma luz direcional no elemento
   */
  const directionalLigth = new THREE.DirectionalLight(0xffffff);
  scene.add(directionalLigth);

  /**
   * new GLTFLoader().setPath('../models/')
   *
   * new GLTFLoader() cria uma instancia de GLTFLoader
   *
   * setPath() define o caminho base onde a instancia deve buscar o modelo (objeto)
   */

  const loader = new GLTFLoader().setPath("../models/");
  loader.load("office_chair.glb", function (glb) {
    scene.add(glb.scene);

    /**
     * Box3 cria uma caixa delimitadora (cria um volume cubico que envolve o objeto)
     */
    /**
     * setFromObject(coloque aqui o elemento) ajusta a caixa delimitadora (Box3) para envolver o elemento identificado
     *
     */

    let box = new THREE.Box3().setFromObject(glb.scene);
    /**
     * getSize() retorna as dimensões da box (altura, largura e profundidade)
     */
    /**
     * Vector3(0,0,0) armazena as dimensões recebidas de getSize
     */
    let obj_size = box.getSize(new THREE.Vector3(0, 0, 0));

    console.log(obj_size); // dimensões do obj

    // camera.position.z = obj_size.length()
    camera.position.z = obj_size.length() * 1.5;
    //camera.position.z = obj_size.length() * 2

    box.getCenter(controls.target);
  });

  /**
   * Importante: camera.position.z = valor
   *
   *  * camera =  camera criada;
   *
   *  * position= o posição da camera pode ser ajustada em 3 eixos X(largura), Y(altura), Z(profundidade)
   * 
   *  * obj_size é o retorno das dimensão do elemento para poder ajusta a camera ao longo do eixo Z
   * 
   *  * length() é um método de THREE.Vector3 que retorna a "norma" ou o comprimento do vetor
   * 
   *  * multiplicado por um valor cria uma margem (* 1.5)
   *
   */

  controls = new OrbitControls(camera, renderer.domElement);
}

init();

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
