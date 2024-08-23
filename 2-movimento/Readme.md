# Controle de movimentos básicos

```Javascript
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.5;
controls.minDistance = 200;
controls.maxDistance = 800;
```

### controls = new OrbitControls(camera, renderer.domElement);

- Cria uma instância de OrbitControls associada a câmera e ao elemento dom

### controls.enableDamping = false;

- Desabilita o amortecimento, que suaviza a interação de rotação e zoom da câmera. E permite movimentar ou não o elemento com mouse.

### controls.dampingFactor = 0.5;

- Define o fator de amortecimento, afetando a suavidade do movimento quando o amortecimento está habilitado. Quanto mais alto o numero mais rigido o movimento.

### controls.minDistance = 200; e controls.maxDistance = 800;

- Estabelece a distância mínima e máxima que a câmera pode aproximar ou afastar o elemento.

### if(controls) controls.update()

```javascript
if (controls) controls.update();
```

- Verifica se os controles OrbitControls existem e, se existirem, atualiza sua posição e estado com base nas interações do usuário, como movimentos do mouse.
