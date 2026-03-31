
function init() {
    renderPokemonCart();
}

async function getJsonObject() {
    try {
        let fetchUrlHttpResponse = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
        let fetchObj = await fetchUrlHttpResponse.json()
        return fetchObj.results; 
    }
        catch (error) {
        let errorMessage = document.getElementById("pokemon_render_area")
        errorMessage.innerHTML = errorMsgHTML(error)
        console.warn(error)
    }
}


async function renderPokemonCart() {
    let fetchIds = await getJsonObject()
    let renderArea = document.getElementById("pokemon_render_area")
    let cartContent = ""
     console.log(fetchIds)
    
     
    for (let index = 0; index < fetchIds.length; index++) {
        cartContent += renderPokemonCartHTML(fetchIds[index].name)
    }

    renderArea.innerHTML = cartContent
}
