const formulario = document.getElementById("busqueda");
const inputNombre = document.getElementById("nombre");
const inputPelicula = document.getElementById("pelicula");
const inputId = document.getElementById("id");

const divResultados = document.querySelector(".resultados");
const baseUrl = "https://api.disneyapi.dev/";



async function getCharactersByName(name) {
    const urlFetch = baseUrl + "character?name=" + encodeURI(name);
    console.log(urlFetch);
    const response = await fetch(urlFetch);
    const json = await response.json();
    console.log("json", json);
    return json;
}

async function getCharactersById(id) {
    const urlFetch = baseUrl + "characters/" + encodeURI(id);
    console.log(urlFetch);
    const response = await fetch(urlFetch);
    const json = await response.json();
    console.log("json", json);
    return json;
}

async function getCharactersByPelicula(pelicula) {
    const urlFetch = baseUrl + "character?films=" + encodeURI(pelicula);
    console.log(urlFetch);
    const response = await fetch(urlFetch);
    const json = await response.json();
    console.log("json", json);
    return json;
}


formulario.addEventListener("submit", e => {
    e.preventDefault();
    divResultados.innerHTML = "";
    const name = inputNombre.value.trim();
    let searchByName = false;
    const pelicula = inputPelicula.value.trim();
    let searchById = false;
    const id = inputId.value.trim();
    let searchByPelicula = false;


    let busqueda = "";
    if (name === "" && pelicula == "") {
        busqueda = id;
        searchById = true;
    }
    if (id === "" && pelicula == "") {
        busqueda = name;
        searchByName = true;
    }
    if (name === "" && id == "") {
        busqueda = pelicula;
        searchByPelicula = true;
    }

    console.log("Busqueda: ", busqueda);

    if(searchByName){
        getCharactersByName(name)
        .then(data => {
            if (data && data.count > 0) {
                console.log(data);
                data.data.forEach(element => {
                    const divCard = document.createElement("div");
                    divCard.classList.add("card");
                    divCard.classList.add("my-4");
                    divCard.style.width = "18rem";
                    
                    const imagen = document.createElement("img");
                    imagen.classList.add("card-img-top");
                    imagen.src = `${element.imageUrl}`;
                    imagen.width = 250;
                    imagen.height = 200;

                    const divCardBody = document.createElement("div");
                    divCardBody.classList.add("card-body");

                    const title = document.createElement("h5");
                    title.classList.add("card-title");
                    title.textContent = `Nombre del personaje: ${element.name}`;

                    divCard.appendChild(imagen);
                    divCardBody.appendChild(title);
                    divCard.appendChild(divCardBody);
                    divResultados.appendChild(divCard);
                });
            }
            else {
                divResultados.textContent = "No existe ningún personaje con ese nombre. Introduzca otro nuevo por favor.";
                divResultados.style.color = '#FF3333';
            }
        }).catch(error => {
            console.log("error", error);
            divResultados.textContent = "La API no responde correctamente.";
            divResultados.style.color = '#FF3333';
        })
    }

    if(searchById){
        getCharactersById(id)
        .then(personaje => {
            if (personaje) {
                console.log(personaje);
                const divCard = document.createElement("div");
                divCard.classList.add("card");
                divCard.classList.add("my-4");
                divCard.style.width = "18rem";
                
                const imagen = document.createElement("img");
                imagen.classList.add("card-img-top");
                imagen.src = `${personaje.imageUrl}`;
                imagen.width = 250;
                imagen.height = 200;

                const divCardBody = document.createElement("div");
                divCardBody.classList.add("card-body");

                const title = document.createElement("h5");
                title.classList.add("card-title");
                title.textContent = `Nombre del personaje: ${personaje.name}`;

                divCard.appendChild(imagen);
                divCardBody.appendChild(title);
                divCard.appendChild(divCardBody);
                divResultados.appendChild(divCard);
            }
            else {
                divResultados.textContent = "No existe ningún personaje con ese id. Introduzca otro nuevo por favor.";
                divResultados.style.color = '#FF3333';
            }
        }).catch(error => {
            divResultados.textContent = "La API no responde correctamente.";
            divResultados.style.color = '#FF3333';
        })
    }

    if(searchByPelicula){
        getCharactersByPelicula(pelicula)
        .then(data => {
            if (data && data.count > 0) {
                console.log(data);
                data.data.forEach(element => {
                    const divCard = document.createElement("div");
                    divCard.classList.add("card");
                    divCard.classList.add("my-4");
                    divCard.style.width = "18rem";
                    
                    const imagen = document.createElement("img");
                    imagen.classList.add("card-img-top");
                    imagen.src = `${element.imageUrl}`;
                    imagen.width = 250;
                    imagen.height = 200;

                    const divCardBody = document.createElement("div");
                    divCardBody.classList.add("card-body");

                    const title = document.createElement("h5");
                    title.classList.add("card-title");
                    title.textContent = `Nombre del personaje: ${element.name}`;

                    divCard.appendChild(imagen);
                    divCardBody.appendChild(title);
                    divCard.appendChild(divCardBody);
                    divResultados.appendChild(divCard);
                });
            }
            else {
                divResultados.textContent = "No aparecen personajes de esa pelicula. Introduzca otra nueva por favor.";
                divResultados.style.color = '#FF3333';
            }
        }).catch(error => {
            divResultados.textContent = "La API no responde correctamente.";
            divResultados.style.color = '#FF3333';
        })
    }
    
});