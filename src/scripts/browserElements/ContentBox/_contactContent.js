const CONTENT_ITEMS = {
  subsections: [
    {
      id: 'email',
      displayText: 'hello@ocommaj.com',
      iconClasses: ['far', 'fa-envelope'],
      url: 'mailto:hello@ocommaj.com',
    },
    {
      id: 'github',
      displayText: 'GitHub',
      iconClasses: ['fab', 'fa-github'],
      url: 'https://github.com/ocommaj',
    },
    {
      id: 'linkedin',
      displayText: 'LinkedIn',
      iconClasses: ['fab', 'fa-linkedin'],
      url: 'https://www.linkedin.com/in/ocommaj/',
    }
  ]
}

export function loadContentElements(container) {
  const { subsections } = CONTENT_ITEMS;
  const contentSection = document.createElement('section');
  contentSection.id = "contactContentSection";

  subsections.forEach(sub => { contentSection.appendChild( contactLink(sub) ) });
  container.appendChild(contentSection)
}

function contactLink(item) {
  const { id, displayText, iconClasses, url } = item;
  const span = document.createElement('span')
  const link = document.createElement('a');
  const text = document.createTextNode(displayText)
  const faIcon = document.createElement('i')

  span.id = `contactButton_${id}`
  span.classList.add('contactContentSection_button')
  iconClasses.forEach(className => { faIcon.classList.add(className) });
  link.href = url;
  if (link.id !== 'email') link.target = '_blank';

  link.appendChild(faIcon)
  link.appendChild(text)
  span.appendChild(link)

  return span;
}
