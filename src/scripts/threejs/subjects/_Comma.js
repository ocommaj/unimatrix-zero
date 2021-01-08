import { Mesh, MeshLambertMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modifiers from '../modifiers';

export default function Comma({ parent, position = null }) {
  import('../../../assets/three/comma.glb')
    .then(imported => {
      const commaGltf = imported.default;
      const mesh = new Mesh();
      const material = new MeshLambertMaterial({
        // color: 0x0f62fe,
        color: 0xda1e28,
        reflectivity: 0.5,
        emissive: 0x0f62fe,
        emissiveIntensity: 0,
      });

      loadComma().then(loaded => {
        mesh.copy(loaded);
        mesh.material = material;
        parent.add(mesh);
      });

      function loadComma(position, resolve) {
        return new Promise(resolve => {
          const loader = new GLTFLoader();
          loader.load(commaGltf, (gltf) => {
            const mesh = gltf.scene.children[0];
            mesh.name = 'messageComma';
            mesh.scale.set(0, 0, 0);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (position) modifiers.position(mesh, position);
            resolve(mesh);
          });
        });
      }
    });
}
