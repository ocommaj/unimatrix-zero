const CONTENT_ITEMS = {
  subsections: [
    {
      id: 'profile',
      displayText: 'Profile',
      items: [
        {
          displayText: 'Full-Stack Web Developer, Network, and Linux Administrator with substantial experience as an educator and passionate curiosity for all facets of digital technology from the basics of hardware to the intangibles of speculative futures.'
        },
        {
          displayText: 'US citizen with long-term overseas experience both in developed and developing countries and sincere enthusiasm for rapidly adapting and connecting in unknown environments.'
        },
        /*{
          displayText: 'Wide-ranging academic background in the humanities and social sciences, and well-developed practical grounding in design thinking. PADI Scuba Instructor with over 500 divers certified.'
        }*/
      ]
    },
    {
      id: 'recentExperience',
      displayText: 'Recent Experience',
      items: [
        {
          headline: true,
          displayText: '2018 - Present:\<br> Director of Technology & Programming Teacher'
        },
        {
          headline: true,
          displayText: 'Xavier High School,\<br>Chuuk, Micronesia'
        },
        {
          displayText: 'Completed design & installation of campus network running entirely on FOSS, supporting 200+ users (including 24/7 resident faculty & boarding students), 40+ desktop workstations, LDAP based AAA services, Moodle LMS, LAN accessible media server, network security cameras, and configured for remote management, automated error handling and failover connection. Required coordination with national telco, as well as fundraising efforts to secure significant grant and donor funding.'
        },
        {
          displayText: 'Additional projects have included a rebuilt school website, GSuite and domain administration, and the development and delivery of a programming elective for 11th and 12th graders built around Python and the Shell run on a purpose-designed Raspberry Pi lab network.'
        },
        {
          headline: true,
          displayText: 'Supervisor/Contact:\<br><a href="mailto:president@xaviermicronesia.org">Dennis Baker, S.J. <i class="far fa-envelope"></i></a>\<br>President, Xavier High School'
        },
      ]
    },
    {
      id: 'coreExpertise',
      displayText: 'Core Expertise',
      items: [
        {
          headline: true,
          displayText: 'Web Development\<br>React, NodeJS, GraphQL, MongoDB, Flask, HTML/(S)CSS',
        },
        {
          headline: true,
          displayText: 'Systems Administration\<br>CCNA, pfSense, openWRT, VirtualBox, LDAP & RADIUS, FOG'
        },
        {
          headline: true,
          displayText: 'Additional (Technical) Skills\<br>Blender, 3D Printing & Electronics Enthusiast'
        },
      ]
    },
    {
      id: 'education',
      displayText: 'Education',
      items: [
        {
          headline: true,
          displayText: 'The Iron Yard Academy\<br>iOS Developer Boot Camp'
        },
        {
          headline: true,
          displayText: 'University of Cambridge\<br>PhD Candidate\<br>History of Art & Architecture'
        },
        {
          headline: true,
          displayText: 'University of St Andrews\<br>MA(First Class Honours)\<br>History of Art'
        },
      ]
    },
    {
      id: 'certifications',
      displayText: 'Certifications',
      items: [
        { displayText: 'Cisco Certified Network Associate' },
        { displayText: 'Professional Association of Diving Instructors\<br>IDC Staff Instructor'
        }
      ]
    }
  ]
}

export function loadContentElements(container) {
  const { subsections } = CONTENT_ITEMS;
  const contentSection = document.createElement('section');
  contentSection.id = "cvContentSection";

  subsections.forEach(sub => { contentSection.appendChild( infoSection(sub) ) })

  container.appendChild(contentSection)
}

function infoSection(subsection) {
  const { id, items } = subsection;
  const fragment = document.createDocumentFragment();
  const listContent = document.createElement('ul');
  listContent.classList.add('contentBoxItem--SectionList');

  fragment.appendChild( sectionLabel() );
  fragment.appendChild( listContent );
  items.forEach(item => listContent.appendChild( lineItem(item) ) );

  return fragment;

  function sectionLabel() {
    const { displayText } = subsection;
    const element = document.createElement('strong');
    element.classList.add(`cvSection--${id}`);
    element.classList.add('contentBoxItem--SubSectionLabel');
    element.classList.add('cvSection--TopLabel');
    element.innerHTML = displayText;
    return element;
  }

  function lineItem(item) {
    const { headline, displayText } = item;
    const element = document.createElement('li');
    const label = document.createElement('p');
    element.classList.add(`cvSection--${id}`);
    element.classList.add('contentBoxItem--SectionListItem');
    element.classList.add('cvSection--LineItem');
    !!headline && label.classList.add('highlightFirstLine');
    label.innerHTML = displayText;
    element.appendChild(label)
    return element;
  }
}
