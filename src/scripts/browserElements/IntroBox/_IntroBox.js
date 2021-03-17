import CONTENT_ITEMS from './_content';

export default function IntroBox() {
  const introBox = document.createElement('div');
  introBox.classList.add('overlayHtml');
  introBox.id = 'introBox';

  const introList = document.createElement('ul');
  introList.id = 'introList';

  const listItems = loadContentList();

  listItems.forEach(item => introList.appendChild(item));
  introBox.appendChild(introList);

  document.body.appendChild(introBox);
  return introBox
}

function loadContentList() {
  return CONTENT_ITEMS.map(item => {
    const listItem = document.createElement('li');
    listItem.id = `introListItem_${item.id}`;
    listItem.innerHTML = item.content;
    return listItem;
  })
}
