import SceneManager from './threejs';

export default function main() {
  const canvas = document.getElementById('canvas');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const sceneManager = new SceneManager(canvas);

  bindEventListeners();
  render();

  function bindEventListeners() {
    let clickCounter = 0;
    window.addEventListener('resize', () => resizeCanvas());
    window.addEventListener('click', (e) => {
      clickCounter = sceneManager.onClick(e, clickCounter);
    });
  }

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
  }

  function render() {
    requestAnimationFrame(render);
    sceneManager.update();
  }
}
