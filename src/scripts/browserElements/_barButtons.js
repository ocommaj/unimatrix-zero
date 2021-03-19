import { switchContent } from './ContentBox';

MainButtonEvents()

function MainButtonEvents() {
  const barButtons = document.getElementById('barButtons')
  const portfolioButton = document.getElementById('portfolioContent_button');

  portfolioButton.addEventListener('click', switchContent);
}
