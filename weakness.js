export const pkmWeaknessAndResistances = (...types) => {
  const totalWeakStrong = {};

  const pushValues = (dmgRelations) => {
    for(let n = 0; n < dmgRelations.double_damage_from.length; n++) {
      if(dmgRelations.double_damage_from[n].name in totalWeakStrong) {
        totalWeakStrong[dmgRelations.double_damage_from[n].name] *= 2; 
      } else {
        totalWeakStrong[dmgRelations.double_damage_from[n].name] = 2;
      }
    }
    for(let n = 0; n < dmgRelations.half_damage_from.length; n++) {
      if(dmgRelations.half_damage_from[n].name in totalWeakStrong) {
        totalWeakStrong[dmgRelations.half_damage_from[n].name] *= 0.5; 
      } else {
        totalWeakStrong[dmgRelations.half_damage_from[n].name] = 0.5;
      }
    }
    for(let n = 0; n < dmgRelations.no_damage_from.length; n++) {
      if(dmgRelations.no_damage_from[n].name in totalWeakStrong) {
        totalWeakStrong[dmgRelations.no_damage_from[n].name] *= 0; 
      } else {
        totalWeakStrong[dmgRelations.no_damage_from[n].name] = 0;
      }
    }
  }

  const typeColor = (str, elem) => {
    switch (str) {
      case 'normal':
        elem.style.backgroundColor = '#A8A878'
        break;
      case 'fire':
        elem.style.backgroundColor = '#F08030'
        break;
      case 'water':
        elem.style.backgroundColor = '#6890F0'
        break;
      case 'grass':
        elem.style.backgroundColor = '#78C850'
        break;
      case 'electric':
        elem.style.backgroundColor = '#F8D030'
        break;
      case 'ice':
        elem.style.backgroundColor = '#98D8D8'
        break;
      case 'fighting':
        elem.style.backgroundColor = '#C03028'
        break;
      case 'poison':
        elem.style.backgroundColor = '#A040A0'
        break;
      case 'ground':
        elem.style.backgroundColor = '#E0C068'
        break;
      case 'flying':
        elem.style.backgroundColor = '#A890F0'
        break;
      case 'psychic':
        elem.style.backgroundColor = '#F75787'
        break;
      case 'bug':
        elem.style.backgroundColor = '#A8B820'
        break;
      case 'rock':
        elem.style.backgroundColor = '#B69E38'
        break;
      case 'ghost':
        elem.style.backgroundColor = '#705898'
        break;
      case 'dark':
        elem.style.backgroundColor = '#705848'
        break;
      case 'dragon':
        elem.style.backgroundColor = '#7038f8'
        break;
      case 'steel':
        elem.style.backgroundColor = '#b8b8d0'
        break;
      case 'fairy':
        elem.style.backgroundColor = '#f0b6bc'
        break;
      default:
        elem.style.backgroundColor = '#fff'
        break;
    }
  }

  const formatWeakAndResis = obj => {
    const ulDmgTkn = document.getElementById('takenDmgList');
    while (ulDmgTkn.firstChild) {
      ulDmgTkn.removeChild(ulDmgTkn.firstChild);
    }
    for(const key of Object.keys(obj)) {
      if(obj[key] !== 1) {
        const liDmgTkn = document.createElement('div');
        typeColor(key, liDmgTkn);
        liDmgTkn.innerText = `${key[0].toUpperCase()+key.slice(1)} x${obj[key]}`;
        liDmgTkn.classList.toggle('badge');
        liDmgTkn.classList.toggle('fs-5');
        ulDmgTkn.appendChild(liDmgTkn);
      }
    }
  }

  fetch(`https://pokeapi.co/api/v2/type/${types[0]}`)
    .then(resp => resp.json())
    .then(json => json.damage_relations)
    .then(dmgRelations => {
      pushValues(dmgRelations);
      if(types.length > 1) {
        fetch(`https://pokeapi.co/api/v2/type/${types[1]}`)
        .then(resp => resp.json())
        .then(json => json.damage_relations)
        .then(dmgRelations => {
          pushValues(dmgRelations);
          formatWeakAndResis(totalWeakStrong); // DOM something here!
        })
      }
      else {
      formatWeakAndResis(totalWeakStrong);// DOM something here!
      }
    })
    .then()
    .catch(error => console.error(error))
  
}