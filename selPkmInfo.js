import { url } from "./app.js";
import { pkmWeaknessAndResistances } from "./weakness.js";

const pkmSelection = document.getElementById('pkms');
const submitSearch = document.getElementById('searchButt');
const imgPkm = document.getElementById('pkm-img');
const liType1 = document.getElementById('type1');
const liType2 = document.getElementById('type2');
const spinner = document.getElementById('spinner');
const pkmNum = document.getElementById('pkmNum');

//?offset=0&limit=151

function capitalize(str){
  return str[0].toUpperCase()+str.slice(1)
}

fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
  .then(response => response.json())
  .then(json => json.results)
  .then(array => {
    for(let n = 0; n < array.length; n++) {
      let option = document.createElement('option');
      option.value = n + 1;
      option.innerText = capitalize(array[n].name);
      pkmSelection.appendChild(option);
    }
  })
  .catch(error => console.error(error))

const searchPkm = () => {
  imgPkm.classList.toggle('d-none');
  imgPkm.classList.toggle('d-block');
  spinner.classList.toggle('d-none');
  spinner.classList.toggle('d-block');
  const endpoint = url + 'pokemon/' + pkmSelection.value;

  fetch(endpoint)
    .then(res => res.json())
    .then(json => {
      imgPkm.src = `https://naramsim.github.io/Colosseum/images/pokemons/${pkmSelection.value}.svg`;
      // imgPkm.style.height = '100px';
      // imgPkm.style.width = '100px';
      pkmNum.innerText = `#${pkmSelection.value.padStart(3, 0)}`;
      if(json.types.length == 2) {
        liType2.style.display = 'inline';
        liType1.innerText = capitalize(json.types[0].type.name);
        liType2.innerText = ` and ${capitalize(json.types[1].type.name)}`;
        return [json.types[0].type.name, json.types[1].type.name];
      } else {
        liType1.innerText = capitalize(json.types[0].type.name);
        liType2.style.display = 'none';
        return [json.types[0].type.name];
      }
    })
    .then(types => pkmWeaknessAndResistances(...types))
    .catch(error => {console.error(error);
    })
}

submitSearch.addEventListener('click', () => {
  searchPkm()
})

imgPkm.addEventListener('load', () => {
  spinner.classList.toggle('d-none');
  spinner.classList.toggle('d-block');
  imgPkm.classList.toggle('d-none');
  imgPkm.classList.toggle('d-block');
})