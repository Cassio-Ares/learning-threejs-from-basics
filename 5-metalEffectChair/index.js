import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";
import { RGBELoader } from "RGBELoader"

let camera, scene, renderer, mesh, controls;

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
 

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //mudanças no render
   renderer.outputEncoding = THREE.sRGBEncoding;  
  /**
   * configuração de espaço de cores 
   * sRGBEncoding garante que as cores sejam rederizadas corretamente em dispositivos que suportam gama sRGB
   */
  renderer.toneMapping = THREE.ACESFilmicToneMapping;  
  /**
   *  melhora na configuração dos efeitos de luz na camera
   * 
   * ACESFilmicToneMapping ajusta a intensidade de luz simulando o efeito de uma camera real
   */
  renderer.toneMappingExposure = 1;
  /**
   *  ajuste controla a exposição da cena
   *  toneMappingExposure 1 geralmente é usado como ponto de partida padrão
   *  aumentar ou diminuir este valor pode ajustar o brilho geral da cena renderizada
   */


  document.body.appendChild(renderer.domElement);

/**
 * a iluminação aqui foi retirada pq usamos outro recursos para criar uma iluminação "mais realista"
 */

//   const light = new THREE.AmbientLight(0x404040);
// scene.add(light);

//   const directionalLigth = new THREE.DirectionalLight(0xffffff);
//   scene.add(directionalLigth);


  const loader = new GLTFLoader().setPath("../models/");
  loader.load("office_chair.glb", function (glb) {
    scene.add(glb.scene);

    let box = new THREE.Box3().setFromObject(glb.scene);

    let obj_size = box.getSize(new THREE.Vector3(0,0,0));
    camera.position.z = obj_size.length() * 1.5;

    box.getCenter(controls.target)
  })

  //melhora de efeito metalico 
  new RGBELoader().setPath("../configThree/utils/").
  load("photo_studio_01_2k.hdr", function(texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture
  })

  /**
   * Arquivo HDR (High Dynamic Range) 
   * são usados para criar uma iluminação mais complexa e realista.
   * 
   * 
   * EquirectangularReflectionMapping
   * mapeia a textura HDR e cria uma cena com ambiente de reflexão esferica 
   * aumentando ainda mais o realismo da imagem 3D
   * 
   */

  controls = new OrbitControls(camera, renderer.domElement);

}

init();

function render(){
  requestAnimationFrame(render);

 
  renderer.render(scene, camera)
}

render()