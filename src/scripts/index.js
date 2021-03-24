import { Device } from './browserElements';
import SceneManager from './threejs';

export default function main() {
  const { device } = Device();
  const { innerWidth, innerHeight } = window;

  const body = document.querySelector('body');
  //const buttonWrapper = document.getElementById('barWrapper');
  const canvasWrapper = document.getElementById('canvasWrapper');
  const canvas = document.getElementById('canvas');

  /*const introList = {
    padi: document.getElementById('introListItem_padi'),
  };*/

  body.width = innerWidth;
  body.height = innerHeight;
  canvas.width = innerWidth;
  //buttonWrapper.width = innerWidth;
  canvasWrapper.width = innerWidth;

  canvas.height = innerHeight;
  //buttonWrapper.height = innerHeight;
  canvasWrapper.height = innerWidth;

  const scene = new SceneManager({ canvas, device });

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.addEventListener('resize', () => resizeCanvas());
    canvas.addEventListener('touchstart', (e) => scene.onClick(e));
    canvas.addEventListener('mousemove', (e) => scene.onMouseMove(e));
    canvas.addEventListener('click', (e) => scene.onClick(e));
    //introList.padi.addEventListener('click', clickHandler)
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
