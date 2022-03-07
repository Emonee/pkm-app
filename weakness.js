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

  const formatWeakAndResis = obj => {
    const ulDmgTkn = document.getElementById('takenDmgList');
    while (ulDmgTkn.firstChild) {
      ulDmgTkn.removeChild(ulDmgTkn.firstChild);
    }
    for(const key of Object.keys(obj)) {
      if(obj[key] !== 1) {
        const liDmgTkn = document.createElement('li');
        liDmgTkn.innerText = `${key[0].toUpperCase()+key.slice(1)} x${obj[key]}`;
        liDmgTkn.classList.toggle('list-group-item')
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