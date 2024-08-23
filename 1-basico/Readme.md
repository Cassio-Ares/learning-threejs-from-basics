## Cameras

### new THREE.PerspectiveCamera(45 , window.innerWidth/ window.innerHeigth, 1 , 1000)

#### PerspectiveCamera:

Cria uma camera em perpectiva onde objetos mais distantes aparecem menores

- Primeiro parametro: campo de visão em graus (ex: 45);

- Segundo parametro: proporção altura largura.
  window.innerWidth:
  window.innerHeight:

- 1 , 1000 limite de distância em que o objeto é visivel, plano de corte próximo e distante

### Scene new THREE.Scene()

- Scene é um container onde os objetos 3D, luzes e camêras são organizados para renderizar:

```javascript
mesh = new THREE.Mesh(geometry, material);
mesh.name = "CAIXAAAAAAA";
scene.add(mesh); // mesh é o elemento que será renderizado
```

### WebGLRenderer

- É responsavel por renderizar a cena e a câmera na tela utilizando a API WebGL. A render desenha a imagem e a animação.
  Os métodos setPixelRatio e setSize são usados para ajustar a resolução de renderização a o tamanho da visualização respectivamente.

```javascript
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
```

### BoxGeometry(200, 200, 200)

- cria a geometria de uma caixa tridimensional com largura, altura e profundidade; define uma forma geometrica.

### MeshBasicMaterial()

- É um material simples usando para renderizar a superfície de objetos

### Mesh(geometry, material)

- O mesh combina uma geometry e uma material para criar um objeto 3D rederizado.

```javascript
const geometry = new THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshBasicMaterial();
mesh = new THREE.Mesh(geometry, material);
mesh.name = "CAIXAAAAAAA"; // nome do objeto criado
```

### requestAnimationFrame(render)

- solicita ao navegador para criar e manter um ciclo de animação, ao passar a função render se diz a função para chamar render antes da proxima atualização da tela.

### mesh.rotation.x += 0.005

- Esta linha de código rotaciona o objeto mesh (o cubo, neste caso) em torno do eixo X em cada quadro da animação. O valor 0.005 representa o incremento do ângulo de rotação

### renderer.render(scene, camera)

- Esta linha instrui o renderer (neste caso, o WebGLRenderer) a renderizar a cena 3D atual (scene) do ponto de vista da câmera (camera). O renderer processa todos os objetos da cena e gera a imagem 2D correspondente, que é desenhada na tela. Cada vez que a função render() é chamada, a cena é atualizada e redesenhada.
