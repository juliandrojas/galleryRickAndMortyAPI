//Función que se ejecuta cuando se recarga la página
document.addEventListener("DOMContentLoaded", ()=>{
    getMenu();
});
//Función asíncrona para obtener los datos de la API
async function getMenu() {
    //Constante con la URL de la API 
    const urlAPI = `https://rickandmortyapi.com/api/character`;
    //console.log(urlMeals);
    //Bloque try-catch con los datos de la API
    try {
        //Creamos constante de respuesta para pasarle la url
        const response = await fetch(urlAPI);
        //Creamos constante para respuesta del JSON
        const result = await response.json();
        //Imprimimos los resultados (El array se llama categories)
        console.log(result.results);
        //Implementamos una función que nos permita poner los datos de la API en nuestro sitio web
        getGallery(result.results);
    } catch (error) {
        //Si hay un error, lo imprimimos
        console.log(error);
    }
}
function getGallery(personajes) {
    //Creamos constante para seleccionar donde poner la galería
    const sectionCards = document.querySelector("#sectionCards");
    //Creamos una variable para inyectar el código HTML de la galería y la inicializamos
    let html = "";
    //El array está en plural y el iterador en singular
    personajes.forEach(personaje => {
        //Destructuramos el array y en una sola instruccción igualamos la variable comida
        //Elementos del array: id, nombrePlato e imagen
        const { name, status, species ,image, origin, episode } = personaje;
        //Armamos la tarjeta base y con la iteración, podemos multiplicarla y la anexamos a la variable del código HTML
        html += `
        <div class="card mb-3">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">Nombre: ${name}</h5>
                <p class="card-text">Status: ${status}</p>
                <p class="card-text">Specie: ${species}</p>
                <p class="card-text">Origin: ${origin.name}</p>
            </div>
        </div>
        `;
        //Inyectamos el código HTML de la tarjeta
        sectionCards.innerHTML = html; 
    });
}