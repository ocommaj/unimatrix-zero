const CONTENT_ITEMS = [
  {
    projectID: 'hailstone',
    displayURL: 'hailstone.ocommaj.com',
    projectURL: 'https://hailstone.ocommaj.com',
    previewType: 'iframe',
    loadSrc: (element) => { element.src = 'https://hailstone.ocommaj.com'},
    title: 'Chuuk Wreck Map',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    projectID: 'xavierTech',
    displayURL: 'Xavier Tech',
    projectURL: 'https://www.xaviermicronesia.org/xbot',
    previewType: 'img',
    loadSrc: (element) => {
      import(/*webpackMode: "lazy" */
      '../../../assets/img/xbot_preview.gif')
        .then(src => { element.src = src.default })
    },
    title: 'Xavier Tech Platform',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    projectID: 'xavierHome',
    displayURL: 'Xavier High School, FSM',
    projectURL: 'https://www.xaviermicronesia.org',
    previewType: 'img',
    loadSrc: (element) => {
      import(/*webpackMode: "lazy" */
      '../../../assets/img/xavierWebsitePreview.jpg')
        .then(src => { element.src = src.default })
    },
    title: 'Xavier High School, FSM',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
]

export function loadContentElements(container) {
  const contentSection = document.createElement('section');
  contentSection.id = 'portfolioItems';

  CONTENT_ITEMS.forEach(item => {
    const element = portfolioProjectElement(item);
    contentSection.appendChild(element);
  })

  container.appendChild(contentSection);
}

function portfolioProjectElement(item) {
  const element = document.createElement('div');
  element.classList.add('portfolioItem');
  element.id = `portfolioItem_${item.projectID}`;

  const title = document.createElement('a');
  title.classList.add('portfolioItemLink')
  title.id = `portfolioItemTitle_${item.projectID}`;
  title.href = item.projectURL;
  title.target = '_blank';
  title.innerHTML = item.title;

  const previewFrame = projectPreview(item)

  const projectBrief = document.createElement('p');
  projectBrief.classList.add('portfolioItemDescription');
  projectBrief.id = `portfolioItemDescription_${item.description}`;
  projectBrief.innerHTML = item.description;

  element.appendChild(title);
  element.appendChild(previewFrame);
  element.appendChild(projectBrief);
  return element
}

function projectPreview(item) {
  const { loadSrc, previewType, projectID } = item;
  const previewElement = document.createElement(previewType);
  previewElement.classList.add('portfolioItemPreview');
  previewElement.id = `portfolioItemPreview_${projectID}`;

  loadSrc(previewElement)

  return previewElement;
}
