const CONTENT_ITEMS = [
  {
    id: "hello_one",
    content: "I'm James O'Connor,"
  },
  {
    id: "hello_two",
    content: "but I prefer Jim."
  },
  {
    id: "hello_three",
    content: "I think it's friendlier."
  },
  {
    id: "web_developer",
    content: "I'm a web developer,"
  },
  {
    id: "network_administrator",
    content: "network administrator,"
  },
  {
    id: "padi",
    content: "scuba instructor,"
  },
  {
    id: "3d_printing",
    content: "3D printing enthusiast,"
  },
  {
    id: "runner",
    content: "obsessive runner,"
  },
  {
    id: "learner",
    content: "voracious learner,"
  },
  {
    id: "curious",
    content: "& relentlessly curious."
  },
  {
    id: "geek",
    content: "Trek, not Wars &#128406."
  }
]

export function loadContentElements(container) {
  const introList = document.createElement('ul');
  introList.id = 'introList';

  CONTENT_ITEMS.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('introList-item');
    listItem.id = `introList-item_${item.id}`;
    listItem.innerHTML = item.content;
    introList.appendChild(listItem);
  })
  //return introList
  container.appendChild(introList);
}

//export default CONTENT_ITEMS
//export default loadContentElements
