import "../CSS/api.css"
import {getItems, getItemById, deleteItemById, addItem} from './items.js';

console.log("scripti starttaa2");

 function synchronousFunction() {
      let number = 1;
      for(let i = 1; i < 100000; i++){
        number += i;
        console.log('synchronousFunction running');
      }
      console.log('regular function complete', number);
    }

    // synchronousFunction();

    console.log("valmis");

    // Synkroninen
    console.log("1");
    console.log("2");
    console.log("3");


    // Asynkroninen
    console.log("1");
    setTimeout(() => {
     console.log("2");
    }, 2000);

    console.log("3");

    // GET
    // Ensimmäinen haku ullkoiseen rajapintaan
    // tämä on fetch käyttäen promisea ja on asyknroninen

    fetch('https://api.restful-api.dev/objects')
	.then((response) => {
        console.log(response);
		if (!response.ok) {
			throw new Error('Verkkovastaus ei ollut kunnossa');
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.error('Fetch-operaatiossa ilmeni ongelma:', error);
	});

    // Yksinkertaistetaan ja modernisoidaan haku
    // Käytetään async/await avainsanoja

    async function getData() {
	try {
		const response = await fetch('https://api.restful-api.dev/objects');
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Virhe:', error);
	}
}

getData();
    
//ensimmäinen oma kutsu backend puolelle

 const consoleLogItems = async() => {
console.log('Moro');

// Default on GET kutsu ilman optiota
    try {
        const response = await fetch('http://localhost:3000/api/items');
		const data = await response.json();
        console.log("Haetaan omasta rajapinnasta");
		console.log(data);

        data.forEach(item => {
            console.log(item);
            console.log(item.name);
        });
	} catch (error) {
		console.error('Virhe:', error);
    }
};

consoleLogItems();

// Siirretään varsinainen fetch omaksi funktioksi

// consoleLogItems();

getItems();

// Hae nappula
// Lisää kuuntelija joka suorittaa klikatessa getItems funktion
const getItemsBtn = document.querySelector('.get_items');
getItemsBtn.addEventListener('click', getItems); 
    
const getForm = document.querySelector('.get-item-form');
getForm.addEventListener('submit', getItemById);

const deleteBtn = document.querySelector('.delete-item');
deleteBtn.addEventListener('click', deleteItemById);

//Etsitään formi ei itse nappulaa ja tutkitaan SUBMIT eventtiä
const addItemForm = document.querySelector('.add-item-form');
addItemForm.addEventListener ('submit', addItem);
