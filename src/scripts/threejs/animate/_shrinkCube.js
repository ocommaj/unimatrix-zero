import { gsap } from 'gsap';
import { Group } from 'three';

export default function shrinkCube(scene, cube, callback, comma = null) {

  const shrinkGroup = new Group();
  shrinkGroup.name = 'shrunkenMessageCube';
  scene.add(shrinkGroup);

  for (const mesh of [...cube.group.children]) {
    const clone = mesh.clone();
    shrinkGroup.add(clone);
    mesh.visible = false;
    cube.group.remove(mesh);
  }
  shrinkGroup.add(comma);
  // shrinkGroup.add(...[...cube.boxes, ...extras]);
  // console.dir(shrinkGroup);
  const tl = gsap.timeline({
    paused: true,
    delay: 0.8,
    onComplete: () => {
      const z = cube.group.children[cube.group.children.length - 2].position.z;
      callback(z);
    },
  });
  // tl.to(shrinkGroup.scale, { y: 0.8, x: 0.8 })
  tl.to(shrinkGroup.position, { y: '+=1.5' }, '<')
    // .set(shrinkGroup.scale, { y: 1, x: 1 })
    .call(() => {
      for (const mesh of shrinkGroup.children) {
        // mesh.matrixWorldNeedsUpdate = true
        mesh.getWorldPosition(mesh.position);
        // mesh.getWorldScale(mesh.scale)

      }
      scene.add(shrinkGroup.children.pop());
      cube.group.add(...shrinkGroup.children);

      scene.remove(shrinkGroup);
      // console.dir(shrinkGroup.children[0])
      // for (const mesh of shrinkGroup.children) {
      // mesh.matrixWorldNeedsUpdate = true
      // scene.add(mesh)
    });

  return tl;


}
