import {fetchData} from './fetch.js';


//Render Item in List in the UI

    const renderFruitList = (items) => {
        console.log('Lisään listan kohta');

    // Haetaan fruitlist ul
    const fruitList = document.querySelector('.fruitlist');
    fruitList.innerHTML = '';

console.log(items);

    items.forEach(item => {
        console.log(item.name);
        let li = document.createElement('li');
        li.textContent = `Hedelmän id ${item.id} ja nimi ${item.name}`;
        fruitList.appendChild(li);
    });

    // Lisätään loopissa  kaikki ykisttäiset hedelmät listaan


    };


//GET items

 const getItems = async() => {


    // Default on GET kutsu ilman optiota
        const items = await fetchData('http://localhost:3000/api/items');

        // Jos BE puolelle tulee virhe niin iformoidaan
        // joko konsoliin tai käyttäjälle virheestä
        if (items.error) {
            console.log(items.error);
            return;
        }
        // tai jatketaan ja tehdään datalle jotain
         items.forEach(item => {
            console.log(item.name);
        });

        renderFruitList(items);

        };   


    // Get item by id

     const getItemById = async() => {
        console.log ('Haetaan IDn avulla');

        event.preventDefault();

        const IdInput = document.getElementById('itemId');
        
        const itemId = IdInput.value;
        console.log(itemId);

        const url = `http://localhost:3000/api/items/${itemId}`;

        const options = {
            method: 'GET'
        };

        const item = await fetchData(url, options);

        // Jos BE puolelle tulee virhe niin iformoidaan
        // joko konsoliin tai käyttäjälle virheestä

        if (item.error) {
            console.log(item.error);
            return;
        }

        // 1. kehittäjälle virheet ja onnistumiset 
         console.log(item);
        // 2. Käyttäjälle tieto näkyviin ja mahdolliset virheet näkyviin
         alert(`Item found ${item.name}`);
        };

  // Delete item by id

  const deleteItemById = async() => {
        console.log ('deletoidaan IDn avulla');

        event.preventDefault();

        const IdInput = document.querySelector('#itemId');
        const itemId = IdInput.value;
        console.log(itemId);

        //MUista tarkistaa usein että käyttäjä lähettää oikean datan
        if (!itemId){
            console.log('Item ID missing, fill in the details!!');
            return;
        }
        const confirmed = confirm(`Oletko varma että haluat poistaa itemin: ${itemId}`
        );
        // Jos käyttäjä painaa cancel niin palautuu FALSE ja hypätään pois
        if (!confirmed) return;

        const url = `http://localhost:3000/api/items/${itemId}`;

        const options = {
            method: 'DELETE'
        };

        const item = await fetchData(url, options);

        if (item.error) {
            console.log(item.error);
            return;
        }

         console.log(item);
         alert(`Item ${item.name} deleted`);
        // Päivitä UI jotta käyttäjä näkee että hedelmä poistuu
         await getItems();
        };

    // Post/Add item

     const addItem = async(event) => {
        event.preventDefault();
        
        const form = document.querySelector('add-item-form');
        const FruitName = document.querySelector('#newItemName').value.trim();
        
        if (!FruitName){
            alert('Nimi puuttuu!');
            return;
        }

        const body = {};

        const url = `http://localhost:3000/api/items/${items}`;

        const options = {
            method: 'POST',
            headers: {
		    'Content-Type': 'application/json',
	    },
        body: JSON.stringify({
		name: fruitName,
	}),   
        };

        console.log(url, options);

        const response = await fetchData(url, options);


        if (response.error) {
            console.log(response.error);
            return;
        }

         console.log(item);
         alert(`Item found ${item.name}`);
        };


// Load item to PUT form (GET by id -> fill inputs)


const loadItemToPutForm = async () => {
  const idInput = document.querySelector('#putItemId');
  const nameInput = document.querySelector('#putItemName');

  const itemId = idInput.value.trim();

  if (!itemId) {
    alert('Anna Item ID');
    return;
  }

  const url = `http://localhost:3000/api/items/${itemId}`;

  const item = await fetchData(url);

  if (item.error) {
    console.error(item.error);
    alert(`Error: ${item.error}`);
    return;
  }

  // täytetään nimi kenttään
  // mikäli nimeä ei saada haettua niin käytä tyhjää merkkijonoa
  nameInput.value = item.name ?? '';

  alert(`Haettu item: ${item.name}`);
};

// Update item (PUT by id)


const updateItemById = async (event) => {
  event.preventDefault();

  const idInput = document.querySelector('#putItemId');
  const nameInput = document.querySelector('#putItemName');

  const itemId = idInput.value.trim();
  const newName = nameInput.value.trim();

  if (!itemId) {
    alert('Item ID puuttuu');
    return;
  }

  if (!newName) {
    alert('Uusi nimi puuttuu');
    return;
  }

  const url = `http://localhost:3000/api/items/${itemId}`;

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName }),
  };

  const updated = await fetchData(url, options);

  if (updated.error) {
    console.error(updated.error);
    alert(`Error: ${updated.error}`);
    return;
  }
  console.log(updated);
  console.log(updated.message);
  alert(`Item updated: ${updated.item.name}`);

  // valinnainen: päivitä lista uudestaan
  // await getItems();

  idInput.value = '';
  nameInput.value = '';
};

    

export { getItems, getItemById, deleteItemById, addItem };