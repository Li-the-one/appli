async function fetchBoards() {
  const res = await fetch('/moodboards');
  const boards = await res.json();
  const list = document.getElementById('board-list');
  list.innerHTML = '';
  boards.forEach(b => {
    const li = document.createElement('li');
    li.textContent = b.name;
    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.onclick = async () => {
      if (confirm('Delete this moodboard?')) {
        await fetch('/moodboard/' + b.id, { method: 'DELETE' });
        fetchBoards();
      }
    };
    li.appendChild(del);
    list.appendChild(li);
  });
}

document.getElementById('new-board').onclick = async () => {
  await fetch('/moodboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Untitled' })
  });
  fetchBoards();
};

fetchBoards();
