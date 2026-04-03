let fetchUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
let fetchUrlTypes = "https://pokeapi.co/api/v2/type/"
let loadedPokemonDetails = [];
let loadedPokemonTypes = [];
let baseAudioUrl = "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/"

async function init() {
    await getJsonObject();
    renderPokemonCart();
    getJsonObjectForPokemonTypes();
}

async function initShiny() {
    await getJsonObject();
    renderPokemonCartShiny()
    getJsonObjectForPokemonTypes();
}

async function getJsonObject() {
    try {
        let fetchUrlHttpResponse = await fetch(fetchUrl);
        let fetchObj = await fetchUrlHttpResponse.json();
        console.log(fetchObj);

        fetchUrl = fetchObj.next

        for (let index = 0; index < fetchObj.results.length; index++) {
            let basicPokemon = fetchObj.results[index];
            let pkmnDetails = await getJsonObjectForPokemonDetails(basicPokemon.url);

            if (pkmnDetails) {
                loadedPokemonDetails.push(pkmnDetails);
            }
           
        }
        
         console.log(loadedPokemonDetails)

      } 
    catch (error) {
        let errorMessage = document.getElementById("pokemon_render_area");
        errorMessage.innerHTML = errorMsgHTML(error);
        console.warn(error);
    }
}

async function getJsonObjectForPokemonTypes() {
    try {
        let fetchUrlHttpResponsePkmnDetails = await fetch(fetchUrlTypes);
        let fetchPokemonTypesObj = await fetchUrlHttpResponsePkmnDetails.json();
        console.log(fetchPokemonTypesObj);

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

function playPokemonAudio(index) {
   let audio = new Audio(loadedPokemonDetails[index].cries.legacy);
   audio.volume = 0.05
   audio.play()
}

function renderPokemonCart() {
    let renderArea = document.getElementById("pokemon_render_area");
    let input = document.getElementById("header_input_field").value.toLowerCase();
    let content = "";

    for (let i = 0; i < loadedPokemonDetails.length; i++) {
        let pokemon = loadedPokemonDetails[i];

        if (!renderSearchedPokemon(pokemon, input)) {
            continue;
        }

        let [id, name, url, type1, type2Check] = renderPokemonCartVariables(pokemon);
        content += renderPokemonCartHTML(i, name, url, id, type1, type2Check);
    }

    renderArea.innerHTML = content;
}

function renderPokemonCartVariables(currentPokemon) {
        let id = currentPokemon.id;
        let name = currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1);
        let url = currentPokemon.sprites.front_default;
        let type1 = currentPokemon.types[0].type.name;
        let type2 = currentPokemon.types[1]?.type.name;
        let type2Check = type2 ? `<p>${type2}</p>` : ""

        return [id, name, url, type1, type2Check]
}   

function renderSearchedPokemon(pokemon, input) {
    let showErrorRef = document.getElementById("render_input_error");

    if (input.length < 3) {
        showErrorRef.innerHTML = "Please enter at least 3 letters";
        return true;
    }

    showErrorRef.innerHTML = "";

    return pokemon.name.toLowerCase().startsWith(input);
}

console.log(loadedPokemonDetails);