import axios from "axios";

async function showRandomFossil(evt) {
    const randomFossil = await axios.get("/random-fossil.json")
    document.querySelector("#random-fossil-image").innerHTML= `<img src=${randomFossil.data.img}>`
    document.querySelector("#random-fossil-name").innerHTML= `<p>${randomFossil.data.name}</p>`
}

document.querySelector('#get-random-fossil').addEventListener('click', showRandomFossil);
