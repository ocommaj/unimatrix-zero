import SceneManager from './threejs';

export default function main() {
  const { innerWidth, innerHeight, deviceConfig: device } = window;

  const canvas = document.getElementById('canvas');
  const buttonWrapper = document.getElementById('navButtonsWrapper');

  canvas.height = innerHeight;
  canvas.width = innerWidth;

  buttonWrapper.height = innerHeight;
  buttonWrapper.width = innerWidth;

  const scene = new SceneManager({ canvas, device });

  bindEventListeners();
  render();

  function bindEventListeners() {
    window.addEventListener('resize', () => resizeCanvas());
    canvas.addEventListener('touchstart', (e) => scene.onClick(e));
    canvas.addEventListener('mousemove', (e) => scene.onMouseMove(e));
    canvas.addEventListener('click', (e) => scene.onClick(e));
  }

  function resizeCanvas() {
    const { innerWidth: width, innerHeight: height } = window
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = width;
    canvas.height = height;
    scene.onWindowResize();
  }

  function render() {
    requestAnimationFrame(render);
    scene.update();
  }
}
