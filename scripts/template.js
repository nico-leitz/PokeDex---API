function renderPokemonCartHTML(index, name, url, id, type1, type2Check) {
    return ` <div id="pkmn_card${index}" class="pkmn_card">
                <img id="pkmn_img" class="pkmn_img" src="${url}" alt="">
                <p id="pokedex_number" class="pokedex_number">ID: ${id}</p>
                <h2 id="pkmn_name">${name}</h2>
                <div id="pkmn_type"class="pkmn_type">
                    <p>${type1}</p>
                    <p>${type2Check}</p>
                </div>
            </div>`
}

function errorMsgHTML(error) {
    return `<div id="error_msg"> 
                <h2>${error} - No connection to API-Services</h2>
            </div>`
}