function renderPokemonCartHTML(index) {
    return ` <div id="pkmn_card${index}" class="pkmn_card">
                <img id="pkmn_img" class="pkmn_img" src="./assets/img/header_input_search.png" alt="">
                <p id="pokedex_number" class="pokedex_number">No. 1</p>
                <h2 id="pkmn_name">${index}</h2>
                <div id="pkmn_type"class="pkmn_type">
                    <p>type1</p>
                    <p>type2</p>
                </div>
            </div>`
}

function errorMsgHTML(error) {
    return `<div id="error_msg"> 
                <h2>${error} - No connection to API-Services</h2>
            </div>`
}