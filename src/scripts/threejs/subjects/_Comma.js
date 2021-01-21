import { Group, Mesh, MeshLambertMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Comma({ parent, position = null }) {

  import('../../../assets/three/comma.glb')
    .then(imported => {
      const commaGltf = imported.default;


      /*const mat_two = new MeshLambertMaterial({
        color: 0xa6c8ff,
        // transparent: true,
        opacity: 0.5,
      });*/

      loadComma().then(loaded => {
        const mesh = new Mesh();
        const mat_one = new MeshLambertMaterial({
          color: 0xda1e28,
          reflectivity: 0.5,
          emissive: 0x0f62fe,
          emissiveIntensity: 0,
        });

        mesh.copy(loaded);
        mesh.name = 'messageComma';
        mesh.material = mat_one;
        mesh.scale.set(0, 0, 0);
        parent.add(mesh);
      });

      function loadComma(position, resolve) {
        return new Promise(resolve => {
          const loader = new GLTFLoader();
          loader.load(commaGltf, (gltf) => {
            // resolve(gltf.scene.children);
            resolve(gltf.scene.children[0]);
          });
        });
      }
    });
}
