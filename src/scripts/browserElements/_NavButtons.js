import { switchContent } from './ContentBox';

const BUTTON_ITEMS = [
  {
    id: 'cv',
    displayLabel: 'CV',
  },
  {
    id: 'portfolio',
    displayLabel: 'Work'
  },
  {
    id: 'github',
    displayLabel: 'GitHub',
    fontAwesomeIcon: 'fa-external-link-alt',
    aTag: {
      url: 'https://github.com/ocommaj',
      target: 'blank'
    }
  },
  {
    id: 'contact',
    displayLabel: 'Contact'
  }
]

NavButtons()

function NavButtons() {
  const wrapper = document.createElement('div');
  wrapper.id = 'navButtonsWrapper';
  wrapper.classList.add('overlayHtml');
  wrapper.classList.add('invisible');

  const buttons = document.createElement('div');
  buttons.id = 'navButtons'

  BUTTON_ITEMS.forEach((item) => {
    const button = document.createElement('h2');
    button.id = `${item.id}_button`;
    button.classList.add('navButton');
    button.dataset.sectionKey = item.id;
    button.innerHTML = item.displayLabel;

    if (item.fontAwesomeIcon) {
      button.appendChild( fontAwesomeIcon(item.fontAwesomeIcon) )
    }

    if (item.aTag) {
      button.appendChild( linkButton(item.aTag) )
    }

    button.addEventListener('click', switchContent);
    buttons.appendChild(button)
  })

  wrapper.appendChild(buttons)
  document.body.appendChild(wrapper)
  window.revealNavButtons = reveal;

  function reveal() {
    wrapper.classList.toggle('invisible')
  }
}

function linkButton(link) {
  const element = document.createElement('a');
  element.href = link.url;
  element.target = link.target;
  return element;
}

function fontAwesomeIcon(className) {
  const element = document.createElement('i');
  element.classList.add('fas')
  element.classList.add(className)
  return element;
}
