import { Device } from './browserMethods';
import SceneManager from './threejs';

export default function main() {
  const { device } = Device();
  const canvas = document.getElementById('canvas');
  const introList = {
    padi: document.getElementById('introListItem_padi'),
  };

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const scene = new SceneManager({ canvas, device });

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.addEventListener('resize', () => resizeCanvas());
    canvas.addEventListener('touchstart', (e) => scene.onClick(e));
    canvas.addEventListener('mousemove', (e) => scene.onMouseMove(e));
    canvas.addEventListener('click', (e) => scene.onClick(e));
    introList.padi.addEventListener('click', () => {
      scene.imageBubble.animateReveal('padi');
    });
  }

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    scene.onWindowResize();
  }

  function render() {
    requestAnimationFrame(render);
    scene.update();
  }
}
