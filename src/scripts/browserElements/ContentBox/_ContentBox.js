export async function ContentBox(sectionKey) {
  const contentBox = document.createElement('div');
  contentBox.classList.add('overlayHtml');
  contentBox.classList.add('invisible');
  contentBox.id = 'contentBox';

  await loadContent(sectionKey, contentBox)
    .then(() => document.body.appendChild(contentBox))

  return contentBox
}

export function switchContent(e) {
  const contentBox = document.getElementById('contentBox');
  if (!contentBox) return;

  const { sectionKey } = e.target.dataset;

  loadContent(sectionKey, contentBox).then(() => {
    const outgoingContent = contentBox.firstChild;
    outgoingContent.style.transition = "opacity 0.7s ease display 0.7s ease";
    outgoingContent.style.opacity = 0;
    outgoingContent.style.display = 'none';
    contentBox.removeChild(outgoingContent);
  })
}

function loadContent(key, contentBox) {
  return new Promise(resolve => {
      switch (key) {
        case 'cv':
          import ('./_cvContent').then(module => callback(module))
          break;
        case 'intro':
          import('./_introContent').then(module => callback(module))
          break;
        case 'portfolio':
          import('./_portfolioContent').then(module => callback(module))
          break;
        default:
          import('./_introContent').then(module => callback(module))
      }

      function callback(module) {
        module.loadContentElements(contentBox)
        resolve()
      }
  })
}
