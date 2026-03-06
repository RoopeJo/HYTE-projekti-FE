
import './diary.css';
import './diary-card.css';
import '../css/mobile.css';
import { getEntries, createEntry, deleteEntry } from '../js/entries.js';

/* Hae-nappi */
const getEntriesBtn = document.querySelector('.get_entries');
getEntriesBtn.addEventListener('click', onGetEntries);

/* Luo uusi -nappi */
const createBtn = document.querySelector('.create_entry');
const dialog = document.getElementById('newEntryDialog');
const cancelBtn = document.getElementById('cancelDialog');
const form = document.getElementById('newEntryForm');

createBtn.addEventListener('click', () => dialog.showModal());
cancelBtn.addEventListener('click', () => dialog.close());
form.addEventListener('submit', onCreateEntry);

async function onGetEntries() {
  try {
    const entries = await getEntries();
    renderEntries(entries);
  } catch (err) {
    console.error(err);
    alert('Päiväkirjamerkintöjen haku epäonnistui.');
  }
}

async function onCreateEntry(ev) {
  ev.preventDefault();
  const fd = new FormData(form);

  const payload = {
    entry_date: fd.get('entry_date'),
    mood: Number(fd.get('mood')),
    weight: Number(fd.get('weight')),
    sleep_hours: Number(fd.get('sleep_hours')),
    notes: fd.get('notes')?.toString() ?? '',
    steps: Number(fd.get('steps') || 0),

    // Router-validointi:
    caloriesConsumed: Number(fd.get('caloriesConsumed') || 0),
    caloriesBurned: Number(fd.get('caloriesBurned') || 0),

    // Mallille:
    calories_eaten: Number(fd.get('caloriesConsumed') || 0),
    calories_burned: Number(fd.get('caloriesBurned') || 0),
  };

  try {
    await createEntry(payload);
    dialog.close();
    form.reset();

    const entries = await getEntries();
    renderEntries(entries);

  } catch (err) {
    console.error(err);
    alert('Merkinnän tallennus epäonnistui: ' + err.message);
  }
}

/* Korttien renderöinti */
function renderEntries(entries) {
  const area = document.querySelector('.diary-card-area');
  area.innerHTML = '';

  if (!entries || entries.length === 0) {
    area.innerHTML = `
      <div style="text-align:center;color:#333">Ei merkintöjä.</div>
    `;
    return;
  }

  for (const e of entries) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${(e.entry_date ?? '').split('T')[0]}</h3>
      <p><strong>Mieli:</strong> ${e.mood ?? '-'}</p>
      <p><strong>Paino:</strong> ${e.weight ?? '-'}</p>
      <p><strong>Uni:</strong> ${e.sleep_hours ?? '-'}</p>
      <p><strong>Muistiinpanot:</strong> ${e.notes ?? '-'}</p>
      <p><strong>Syödyt kalorit:</strong> ${e.calories_eaten ?? e.calories_in ?? '-'}</p>
      <p><strong>Kulutetut kalorit:</strong> ${e.calories_burned ?? e.calories_out ?? '-'}</p>
    
      
      <button class="delete-entry-btn" data-id="${e.id}">Poista merkintä</button>   <!-- ← LISÄTTY -->
    `;

    area.appendChild(card);
  }
}

// Delete entry nappien event listener
document.addEventListener('click', async (ev) => {     
  if (!ev.target.classList.contains('delete-entry-btn')) return; 

  const id = ev.target.dataset.id;                    

  if (confirm("Haluatko varmasti poistaa tämän merkinnän?")) {   
    try {
      await deleteEntry(id);                          
      onGetEntries();                                 
    } catch (err) {
      console.error(err);
      alert("Merkinnän poistaminen epäonnistui: " + err.message); 
    }
  }
});


