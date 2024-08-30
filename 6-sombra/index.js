import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";
import { RGBELoader } from "RGBELoader";

let camera, scene, renderer, controls;

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1, //dimensão ajustada para que elemento não entre na tela 
    1000
  );

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  // sombra
   renderer.shadowMap.enabled = true;  
  // mapeia a sombras do renderer permitindo que o objeto lance sombra sobre outros objetos

  renderer.shadowMap.type = THREE.PCFShadowMap; 
   // PCF (Percentage-closer filtering) metodo que suaviza as bordas da sobra tornando mais realista

  renderer.autoClear = false;
  //Impede que o renderer limpe automaticamente o buffer de renderização entre os frames, 
  //o que é útil quando se deseja renderizar múltiplas vezes na mesma cena
 
 
  document.body.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

  //sombra
  directionalLight.castShadow = true; // permite qua a luz direcional emita sombras (cast Shadow= lançar sobras)
  directionalLight.shadow.bias = -0.0001; // ajusta a distância entre o objeto e o plano da sombra
  directionalLight.shadow.mapSize.width = 2048; // define o mapa(campo que a sombra pode se estender)
  directionalLight.shadow.mapSize.height = 2048; // define o mapa(campo que a sombra pode se estender)
  directionalLight.position.set(2, 2, 2); // define a posição da luz direcional na cena (x: direita, y: acima , z: para trás )

  scene.add(directionalLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.5;
  controls.minDistance = 0.8; //dimensões para melhor apresentar o obj (olhar no console.log de Vector3 para facilitar o ajuste)
  controls.maxDistance = 3; //dimensões para melhor apresentar o obj

  const loader = new GLTFLoader().setPath("../models/");
  loader.load("office_chair.glb", function (glb) {
    scene.add(glb.scene);

    let box = new THREE.Box3().setFromObject(glb.scene);
    let obj_size = box.getSize(new THREE.Vector3(0, 0, 0));

    console.log(obj_size);

    camera.position.z = obj_size.length() * 1.5;

    box.getCenter(controls.target);

    //sombra
    /**
     * glb aqui itera sobre todos os objetos dentro scene e configura para cada um receber e lançar sombras
     */
    glb.scene.traverse(function (child) {
      child.receiveShadow = true;  // configura se obj vai ou não receber sombra de outro objeto
      child.castShadow = true; // configura se objeto vai lançar sombra sobre outro objeto
    });

    const geometry = new THREE.PlaneGeometry(10, 10); // cria uma geometria de plano com 10 de altura e largura
    const materialShadow = new THREE.ShadowMaterial({ opacity: 0.2}); //cria um material para a sombra 
    const plane = new THREE.Mesh(geometry, materialShadow);// cria uma malha(mesh) onde vamos aprensentar o geometry e o material
    plane.receiveShadow = true; //Habilita o plano para receber sombras lançadas por outros objetos
    plane.rotation.x = - Math.PI / 2; // posiciona o plane no eixo x 
    plane.position.y = - obj_size.y / 2 // posiciona o plane no eixo y usamos - para que ele fique abaixo do centro do objeto
    scene.add(plane);
  });

  /**
   * Carrega um mapa HDR (High Dynamic Range) usando o RGBELoader, configurando-o como ambiente (scene.environment)
   *  para fornecer iluminação baseada em imagem (IBL) à cena, refletindo em objetos e criando uma atmosfera global.
   */

  new RGBELoader()
    .setPath("../configThree/utils/")
    .load("photo_studio_01_2k.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });
}

init();

function render() {
  requestAnimationFrame(render);

  if (controls) controls.update();

  renderer.render(scene, camera);
}

render();
