import { Device } from './browserMethods';
import SceneManager from './threejs';

export default function main() {
  const { device } = Device();
  const { innerWidth, innerHeight } = window;

  const buttonWrapper = document.getElementById('barWrapper');
  const canvas = document.getElementById('canvas');

  const introList = {
    padi: document.getElementById('introListItem_padi'),
  };


  canvas.width = innerWidth;
  buttonWrapper.width = innerWidth;

  canvas.height = innerHeight;
  buttonWrapper.height = innerHeight;


  const scene = new SceneManager({ canvas, device });

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.addEventListener('resize', () => resizeCanvas());
    canvas.addEventListener('touchstart', (e) => scene.onClick(e));
    canvas.addEventListener('mousemove', (e) => scene.onMouseMove(e));
    canvas.addEventListener('click', (e) => scene.onClick(e));
    introList.padi.addEventListener('click', clickHandler)
  }

  function clickHandler() {
      const completionHandler = () => {
        this.addEventListener('click', clickHandler);
        this.classList.toggle('clickable');
      }

      this.removeEventListener('click', clickHandler);
      this.classList.toggle('clickable');
      scene.imageBubble.animateReveal(completionHandler);
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
