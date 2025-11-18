// Game list — must match the folders in the same directory as this index.html
const games = [
  {id: "01-Candy-Crush-Game", title: "Candy Crush", tag: "Arcade"},
  {id: "04-Breakout-Game", title: "Breakout", tag: "Classic"},
  {id: "06-Tower-Blocks", title: "Tower Blocks", tag: "Puzzle"},
  {id: "09-Tilting-Maze-Game", title: "Tilting Maze", tag: "Skill"},
  {id: "10-Memory-Card-Game", title: "Memory Card", tag: "Puzzle"},
  {id: "11-Rock-Paper-Scissors", title: "Rock Paper Scissors", tag: "Arcade"},
  {id: "12-Type-Number-Guessing-Game", title: "Number Guess", tag: "Puzzle"},
  {id: "13-Tic-Tac-Toe", title: "Tic Tac Toe", tag: "Classic"},
  {id: "14-Snake-Game", title: "Snake", tag: "Classic"},
  {id: "15-Connect-Four-Game", title: "Connect Four", tag: "Classic"},
  {id: "16-Insect-Catch-Game", title: "Insect Catch", tag: "Arcade"},
  {id: "17-Typing-Game", title: "Typing Game", tag: "Skill"},
  {id: "18-Hangman-Game", title: "Hangman", tag: "Puzzle"},
  {id: "19-Flappy-Bird-Game", title: "Flappy Bird", tag: "Arcade"},
  {id: "20-Crossy-Road-Game", title: "Crossy Road", tag: "Arcade"},
  {id: "21-2048-Game", title: "2048", tag: "Puzzle"},
  {id: "22-Dice-Roll-Simulator", title: "Dice Roll", tag: "Fun"},
  {id: "23-Shape-Clicker-Game", title: "Shape Clicker", tag: "Arcade"},
  {id: "24-Typing-Game", title: "Typing Game", tag: "Skill"},
  {id: "26-Fruit-Slicer-Game", title: "Fruit Slicer", tag: "Arcade"},
  {id: "27-Quiz-Game", title: "Quiz", tag: "Trivia"},
  {id: "28-Emoji-Catcher-Game", title: "Emoji Catcher", tag: "Arcade"},
  {id: "30-Simon-Says-Game", title: "Simon-Says-Game", tag: "Arcade"},
];

// build UI
const grid = document.getElementById('grid');
const search = document.getElementById('search');
const filter = document.getElementById('filter');

function createCard(game){
  const el = document.createElement('article');
  el.className = 'card';
  el.tabIndex = 0;
  // NEW: Add data-title attribute for the CSS Glitch effect
  el.setAttribute('data-title', game.title); 

  // Use a different acronym strategy for variety, like the first two letters
  const thumbText = game.title.split(' ').slice(0,2).map(s=>s[0]).join('') || game.title.substring(0, 2).toUpperCase();
  el.innerHTML = `
    <div class="tag">${game.tag}</div>
    <div class="thumb">${thumbText}</div>
    <h3>${game.title}</h3>
    <p>Folder: <code>${game.id}</code></p>
  `;
  el.addEventListener('click', ()=>openGame(game));
  el.addEventListener('keypress', (e)=>{ if(e.key==='Enter') openGame(game) });
  return el;
}

function renderList(list){
  grid.innerHTML = '';
  list.forEach(g=>{
    grid.appendChild(createCard(g));
  });
}

// show modal + iframe
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeBtn = document.getElementById('closeBtn');
const modalTitle = document.getElementById('modalTitle');
const gameFrame = document.getElementById('gameFrame');
const openNewTab = document.getElementById('openNewTab');

function openGame(game){
  // Set the modal to visible first
  modal.setAttribute('aria-hidden', 'false');
  
  // Set the source and new tab link
  const candidate = `${game.id}/index.html`;
  gameFrame.src = candidate;
  openNewTab.href = candidate;
  
  // Set the title on the modal panel (though we hide it, good practice to set it)
  modalTitle.textContent = game.title;
  
  // Focus on the iframe for immediate interaction
  setTimeout(()=> gameFrame.focus(), 300);
  
  // OPTIONAL: Add a class to the body to prevent background scrolling
  document.body.classList.add('modal-open'); 
}

function closeGame(){
  modal.setAttribute('aria-hidden','true');
  // unload iframe
  gameFrame.src = 'about:blank';
  // OPTIONAL: Remove the class
  document.body.classList.remove('modal-open');
}

// attach modal events
closeBtn.addEventListener('click', closeGame);
modalBackdrop.addEventListener('click', closeGame); 
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeGame() });


// filtering & search
function applyFilters() {
  const q = search.value.trim().toLowerCase();
  // Ensure the filter value is lowercase before comparison
  const f = filter.value.toLowerCase(); 
  const filtered = games.filter(g=>{
    const matchesQuery = g.title.toLowerCase().includes(q) || g.id.toLowerCase().includes(q);
    // Check against the lowercase game tag
    const matchesFilter = f === 'all' ? true : (g.tag.toLowerCase() === f);
    return matchesQuery && matchesFilter;
  });
  renderList(filtered);
}

search.addEventListener('input', applyFilters);
filter.addEventListener('change', applyFilters);

// initial render
renderList(games);