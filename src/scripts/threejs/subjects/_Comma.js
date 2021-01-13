import { Mesh, MeshLambertMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Comma({ parent, position = null }) {
  import('../../../assets/three/comma.glb')
    .then(imported => {
      const commaGltf = imported.default;
      const mesh = new Mesh();
      const mat_one = new MeshLambertMaterial({
        // color: 0x0f62fe,
        color: 0xda1e28,
        reflectivity: 0.5,
        emissive: 0x0f62fe,
        emissiveIntensity: 0,
      });
      /* const mat_two = new MeshLambertMaterial({
        color: 0xa6c8ff,
        transparent: true,
        opacity: 0.5,
      });*/

      loadComma().then(loaded => {
        mesh.copy(loaded);
        mesh.material = mat_one;
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
            resolve(mesh);
          });
        });
      }
    });
}
