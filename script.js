let fetchUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
let loadedPokemonDetails = [];

async function init() {
    await getJsonObject();
    renderPokemonCart();
}

async function getJsonObject() {
    try {
        let fetchUrlHttpResponse = await fetch(fetchUrl);
        let fetchObj = await fetchUrlHttpResponse.json();
        console.log(fetchObj);

        for (let index = 0; index < fetchObj.results.length; index++) {
            let basicPokemon = fetchObj.results[index];
            let pkmnDetails = await getJsonObjectForPokemonDetails(basicPokemon.url);

            if (pkmnDetails) {
                loadedPokemonDetails.push(pkmnDetails);
            }
        }
    } catch (error) {
        let errorMessage = document.getElementById("pokemon_render_area");
        errorMessage.innerHTML = errorMsgHTML(error);
        console.warn(error);
    }
}

async function getJsonObjectForPokemonDetails(url) {
    try {
        let fetchUrlHttpResponsePkmnDetails = await fetch(url);
        let fetchPokemonDetailsObj = await fetchUrlHttpResponsePkmnDetails.json();
        console.log(fetchPokemonDetailsObj);
        return fetchPokemonDetailsObj;
    } catch (error) {
        let errorMessage = document.getElementById("pokemon_render_area");
        errorMessage.innerHTML = errorMsgHTML(error);
        console.warn(error);
    }
}

function renderPokemonDetailsLoop() {
    
}

function renderPokemonCart() {
    let renderArea = document.getElementById("pokemon_render_area");
    let cartContent = "";
    let type2HTML = ""

    console.log(loadedPokemonDetails);

    for (let index = 0; index < loadedPokemonDetails.length; index++) {
        const currentPokemon = loadedPokemonDetails[index];
        let id = currentPokemon.id;
        let name = currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1);
        let url = currentPokemon.sprites.front_default;
        let type1 = currentPokemon.types[0].type.name;
        let type2 = currentPokemon.types[1]?.type.name;
        
        let type2Check = type2 ? `<p>${type2}</p>` : ""

        type2HTML = type2Check

        console.log(renderPokemonCartHTML(index, name, url, id, type1, type2Check));
        cartContent += renderPokemonCartHTML(index, name, url, id, type1, type2Check);
    }

    renderArea.innerHTML = cartContent;
}

