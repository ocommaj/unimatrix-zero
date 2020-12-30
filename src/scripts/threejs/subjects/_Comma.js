import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modifiers from '../modifiers';
import commaGltf from '../../../assets/three/comma.glb';

export default function Comma(position = null) {
  return new Promise((res, rej) => loadComma(res, rej));

  function loadComma(resolve, reject) {
    const loader = new GLTFLoader();
    loader.load(commaGltf, (gltf) => {
      const mesh = gltf.scene.children[0];
      mesh.name = 'messageComma';
      mesh.scale.set(0, 0, 0);

      if (position) modifiers.position(mesh, position);

      return resolve(mesh);
    }, undefined, (error) => reject(error)
    );
  }
}
