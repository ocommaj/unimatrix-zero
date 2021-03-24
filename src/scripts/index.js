import SceneManager from './threejs';

export default function main() {
  const { innerWidth, innerHeight, deviceConfig: device } = window;

  const body = document.querySelector('body');
  const canvasWrapper = document.getElementById('canvasWrapper');
  const canvas = document.getElementById('canvas');
  const buttonWrapper = document.getElementById('navButtonsWrapper');

  body.width = innerWidth;
  body.height = innerHeight;
  canvas.width = innerWidth;
  canvasWrapper.width = innerWidth;
  buttonWrapper.width = innerWidth;

  canvas.height = innerHeight;
  canvasWrapper.height = innerWidth;
  buttonWrapper.height = innerHeight;

  const scene = new SceneManager({ canvas, device });

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.addEventListener('resize', () => resizeCanvas());
    canvas.addEventListener('touchstart', (e) => scene.onClick(e));
    canvas.addEventListener('mousemove', (e) => scene.onMouseMove(e));
    canvas.addEventListener('click', (e) => scene.onClick(e));
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
