export default async function ContentBox(sectionKey) {
  const contentBox = document.createElement('div');
  contentBox.classList.add('overlayHtml');
  contentBox.id = 'contentBox';

  await loadContent(sectionKey).then(() => document.body.appendChild(contentBox))

  return contentBox

  function loadContent(key) {
    return new Promise(resolve => {
        import('./_introContent').then(module => callback(module))

        function callback(module) {
          module.loadContentElements(contentBox)
          resolve()
        }
    })
  }
}
