import { gsap } from 'gsap';
import { Group } from 'three';

export default function shrinkCube(scene, cube, extras = []) {
  const tl = gsap.timeline({ delay: 0.8 });
  const shrinkGroup = new Group();
  shrinkGroup.name = 'shrunkenMessageCube';
  scene.add(shrinkGroup);
  shrinkGroup.add(...[...cube.boxes, ...extras]);
  console.dir(shrinkGroup);
  tl.to(shrinkGroup.scale, { y: 0.8, x: 0.8 })
    .to(shrinkGroup.position, { y: '+=1.5' }, '<')
    .call(() => {

      // scene.add( ...shrinkGroup.children )
    });


}
