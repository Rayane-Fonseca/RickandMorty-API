const url = "https://rickandmortyapi.com/api/character/?page=1";
const characterList = document.getElementById("lista-rickandmorty");

function convertCharacterToLi(character) {
    return `
        <li class="character">
            <p class="name">${character.name}</p>
            <img src="${character.image}" alt="${character.name}">
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
        </li>
    `;
}

async function fetchCharacters() {
    try {
        let allCharacters = [];
        let page = 1;

        while(allCharacters.length < 50) {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);

            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            if (!data.info.next) break; 
            page++;
        }

        const first50 = allCharacters.slice(0, 50);

        characterList.innerHTML = first50.map(convertCharacterToLi).join('');
    } catch (error) {
        console.log(error);
    }
}

fetchCharacters();