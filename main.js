
document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.getElementById('project-list');
  let projects = JSON.parse(localStorage.getItem('projects') || '[]');

  function renderProjects(category = 'Все') {
    projectList.innerHTML = '';
    projects.filter(p => category === 'Все' || p.category === category).forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      const content = document.createElement('div');
      const title = document.createElement('h2');
      title.textContent = project.title;
      const desc = document.createElement('p');
      desc.textContent = project.desc;
      content.appendChild(title);
      content.appendChild(desc);

      const menuContainer = document.createElement('div');
      menuContainer.className = 'menu-wrapper';

      const menuButton = document.createElement('div');
      menuButton.className = 'menu-button';
      menuButton.textContent = '⋮';

      const menu = document.createElement('div');
      menu.className = 'dropdown-menu hidden';
      const editOption = document.createElement('div');
      editOption.textContent = '✏️ Редактировать';
      const infoOption = document.createElement('div');
      infoOption.textContent = 'ℹ️ Информация';
      const deleteOption = document.createElement('div');
      deleteOption.textContent = '🗑️ Удалить';

      menu.appendChild(editOption);
      menu.appendChild(infoOption);
      const journalOption = document.createElement('div');
journalOption.textContent = '📝 Вести проект';
menu.appendChild(journalOption);
menu.appendChild(deleteOption);

      menuContainer.appendChild(menuButton);
      menuContainer.appendChild(menu);

      card.appendChild(content);
      card.appendChild(menuContainer);
      projectList.appendChild(card);

      menuButton.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(el => {
          if (el !== menu) el.classList.add('hidden');
        });
        
    if (menu.classList.contains('visible')) {
      menu.classList.remove('visible');
    } else {
      document.querySelectorAll('.dropdown-menu').forEach(el => el.classList.remove('visible'));
      menu.classList.add('visible');
    }
    
      });

      deleteOption.addEventListener('click', () => {
        projects = projects.filter(p => p.id !== project.id);
        localStorage.setItem('projects', JSON.stringify(projects));
        const filterSelect = document.getElementById('filter'); if(filterSelect){renderProjects(filterSelect.value);} else { renderProjects(); }
      });

      editOption.addEventListener('click', () => {
        window.location.href = `edit-project.html?id=${project.id}`;
      });

      journalOption.addEventListener('click', () => {
    window.location.href = `project-journal.html?id=${project.id}`;
  });

  infoOption.addEventListener('click', () => {
        window.location.href = `info-project.html?id=${project.id}`;
      });
    });
  }

  const filterSelect = document.getElementById('filter'); if(filterSelect){renderProjects(filterSelect.value);} else { renderProjects(); }
});

const filter = document.getElementById("filter");
if (filter) {
  filter.addEventListener("change", () => {
    renderProjects(filter.value);
  });
}
document.getElementById('save-project-btn').addEventListener('click', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const projects = [];

  projectCards.forEach(card => {
    const title = card.querySelector('h3')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    const category = card.dataset.category || 'Без категории';

    projects.push({ title, description, category });
  });

  const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'project-backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});