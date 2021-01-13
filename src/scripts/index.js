import { Device } from './browserMethods';
import SceneManager from './threejs';

export default function main() {
  const device = Device();
  const canvas = document.getElementById('canvas');
  const introList = {
    padi: document.getElementById('introListItem_padi'),
  };

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const scene = new SceneManager(canvas);

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.addEventListener('touchstart', () => {
      window.addEventListener('touchend', (e) => {
        scene.onClick(e);
        window.removeEventListener('touchend', this);
      });
    });
    window.addEventListener('resize', () => resizeCanvas());
    window.addEventListener('mousemove', (e) => scene.onMouseMove(e));
    window.addEventListener('click', (e) => scene.onClick(e));
    introList.padi.addEventListener('click', () => {
      scene.imageBubble.padi.display();
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
