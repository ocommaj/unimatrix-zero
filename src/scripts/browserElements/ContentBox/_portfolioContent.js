const CONTENT_ITEMS = [
  {
    projectID: 'hailstone',
    displayURL: 'hailstone.ocommaj.com',
    projectURL: 'https://hailstone.ocommaj.com',
    previewType: 'iframe',
    loadSrc: (element) => {
      element.src = 'https://hailstone.ocommaj.com/?lookup=smallPreview',
      element.sandbox = 'allow-scripts '
    },
    title: 'Chuuk Wreck Map',
    subsections: [
      {
          id: 'techStack',
          displayText: 'Tech Stack',
          items: [
            {
              displayText: 'Mapbox GL JS & GeoJSON'
            },
            {
              displayText: 'Firebase',
              subText: 'Auth, Firestore, Storage'
            },
            { displayText: 'Webpack, HTML/SCSS/JS' },
            { displayText: 'DigitalOcean (hosting)'}
          ]
      }
    ],
    description: "Live application for scuba divers to share photos of the Japanese shipwrecks of Chuuk Lagoon, organized against a navigable 3D map rendered with custom infographic map marker icons. Active userbase authenticated via Firebase and against google, facebook, and twitter APIs. Built to scale to additional dive destinations and extend to include trip review content."
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
    title: 'Xavier HS, Chuuk Tech eLearning Portal',
    subsections: [
      {
        id: 'techStack',
        displayText: 'Tech Stack',
        items: [
          { displayText: 'React' },
          { displayText: 'Apollo-GraphQL'},
          { displayText: 'MongoDB' },
          { displayText: 'NodeJS & Express' },
          { displayText: 'IBM Carbon Design System' },
          { displayText: 'Firebase & Heroku (hosting)' }
        ]
      },
      {
        id: 'coreFeatures',
        displayText: 'Core Features',
        items: [
          { displayText:
            'Article & User databases supporting identity based CRUD operations'
          },
          { displayText:
              'Reading List persistent as both account-based data and in local storage for external users'
            },
          {
            displayText:
              'CodePen style browser environment for testing and sharing HTML/CSS/JS'
          },
          { displayText:
              'User authentication via Auth0 against G Suite domain accounts'
          },
          {
            displayText:
              'Front-end socket for internal IT wiki documentation & user support'
          }
        ]
      }
    ],
    description: "Proof of concept application developed as prototype for supporting programming curriculum and a 1:1 student device program currently under consideration. Designed to host both publicly accessible content and interface with internal school-specific resources in order to meet the diverse needs and overcome the logistical and social barriers of the Central Pacific.\<br><br> Content database structured to support and encourage student users in  translating and sharing content in the region’s many local languages, with the dual intent of broadening access and teaching the spirit and practices of Open Source technology."
  },
  {
    projectID: 'xavierHome',
    displayURL: 'Xavier HS, Micronesia',
    projectURL: 'https://www.xaviermicronesia.org',
    previewType: 'img',
    loadSrc: (element) => {
      import(/*webpackMode: "lazy" */
      '../../../assets/img/xavierWebsitePreview.jpg')
        .then(src => { element.src = src.default })
    },
    title: 'Xavier High School',
    subsections: [
      {
        id: 'techStack',
        displayText: 'Tech Stack',
        items: [
          { displayText: 'HTML/SCSS/JS' },
          { displayText: 'Bootstrap & JQuery' },
          { displayText: 'GSAP' }
        ]
      }
    ],
    description: "School website, rebuilt on a short deadline to quickly publicize Board's plans for the 2021 school year in response to the pandemic."
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
  const { projectID, projectURL, title, description, subsections } = item;
  const element = document.createElement('div');
  element.classList.add('portfolioItem');
  element.id = `portfolioItem_${projectID}`;

  const label = document.createElement('a');
  label.classList.add('portfolioItemLink')
  label.id = `portfolioItemTitle_${projectID}`;
  label.href = projectURL;
  label.target = '_blank';
  label.innerHTML = title;

  const previewFrame = projectPreview(item)

  const projectBrief = document.createElement('p');
  projectBrief.classList.add('portfolioItemDescription');
  projectBrief.id = `portfolioItemDescription_${projectID}`;
  projectBrief.innerHTML = description;

  element.appendChild(label);
  element.appendChild(previewFrame);

  !!subsections && subsections.forEach(section => {
    element.appendChild(infoSection(section))
  })

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

function infoSection(infoSection) {
  const { id, items } = infoSection;
  const fragment = document.createDocumentFragment();
  const element = document.createElement('ul');
  element.classList.add('contentBoxItem--SectionList')
  element.classList.add('portfolioItemInfoSection--List');


  items.forEach(item => { element.appendChild(infoItem(item)) });

  fragment.appendChild( sectionLabel() );
  fragment.appendChild(element)

  return fragment

  function sectionLabel() {
    const { displayText } = infoSection;
    const element = document.createElement('strong');
    element.classList.add('contentBoxItem--SubSectionLabel');
    element.innerHTML = displayText;
    return element;
  }

  function infoItem(item) {
    const element = document.createElement('li');
    const label = document.createElement('p');

    label.classList.add('contentBoxItem--LineItem--topLabel');
    label.innerHTML = item.displayText;

    element.appendChild(label);
    !!item.subText && element.appendChild(subLabel());
    return element;

    function subLabel() {
      const label = document.createElement('p');
      label.classList.add('contentBoxItem--LineItem--subLabel');
      label.innerHTML = item.subText;
      return label;
    }
  }
}
