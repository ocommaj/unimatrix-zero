const CONTENT_ITEMS = [
  {
    projectID: 'hailstone',
    projectURL: 'https://hailstone.ocommaj.com',
    title: 'Chuuk Lagoon Wreck Map',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
]

export function loadContentElements(container) {
  const contentList = document.createElement('ul');
  contentList.id = 'portfolioList';

  CONTENT_ITEMS.forEach(item => {
    const listItem = document.createElement('li');
    listItem.id = `portfolioListItem_${item.projectID}`;
    listItem.innerHTML = item.title;
    //contentList.appendChild(listItem);

    const iframe = document.createElement('iframe');
    iframe.id = `portfolioPreview_${item.projectID}`;
    iframe.src = item.projectURL;
    contentList.appendChild(iframe)
  })
  //return introList
  container.appendChild(contentList);
}
