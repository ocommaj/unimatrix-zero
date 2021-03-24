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
    displayLabel: 'GitHub'
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
