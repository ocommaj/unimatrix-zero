import { Group, Mesh, MeshLambertMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { LineMaterial } from './jsm/lines/LineMaterial.js';
//import { Wireframe } from './jsm/lines/Wireframe.js';
//import { WireframeGeometry2 } from './jsm/lines/WireframeGeometry2.js';

export default function Comma({ parent, position = null }) {
  // import('../../../assets/three/comma_tag.glb')
  import('../../../assets/three/comma.glb')
    .then(imported => {
      const commaGltf = imported.default;
      const group = new Group();
      const mesh = new Mesh();
      const mat_one = new MeshLambertMaterial({
        // color: 0x0f62fe,
        color: 0xda1e28,
        reflectivity: 0.5,
        emissive: 0x0f62fe,
        emissiveIntensity: 0,
      });
      const mat_two = new MeshLambertMaterial({
        color: 0xa6c8ff,
        // transparent: true,
        opacity: 0.5,
      });

      loadComma().then(loaded => {
        /* group.add( ...loaded );
        group.children[0].material = mat_one.clone();
        group.children[1].material = mat_two.clone();
        group.name = 'messageComma';
        group.scale.set(0, 0, 0);
        //parent.add(group)*/


        mesh.copy(loaded);
        mesh.scale.set(0, 0, 0);
        mesh.material = mat_one;
        mesh.name = 'messageComma';
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
