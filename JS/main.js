const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.prev');
const buttonNext = document.querySelector('.next');

const typeFirst = document.querySelector('.type__first')
const typeSecond = document.querySelector('.type__second')

const pokemonColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };

const buttonShiny = document.querySelector('.shiny-button');
let precionado = false;

let imagem;
let imagemshiny;
let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status ===  200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);
    
    if(data && data.id<650){
        imagem =  data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];
        imagemshiny = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_shiny'];

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        if(!precionado)pokemonImage.src = imagem;
        else{
            pokemonImage.src = imagemshiny;
        }
          
        if(data.types.length==2){
            let typeName1 = data.types['0']['type']['name'];
            typeFirst.innerHTML = typeName1;
            typeFirst.style.setProperty('background-color', pokemonColors[typeName1]);
            
            let typeName2 = data.types['1']['type']['name'];
            typeSecond.innerHTML = typeName2;
            typeSecond.style.setProperty('background-color', pokemonColors[typeName2]);
        }else{
            const typeName1 = data.types['0']['type']['name'];
            typeFirst.innerHTML = typeName1;
            typeFirst.style.setProperty('background-color', pokemonColors[typeName1]);

            typeSecond.innerHTML='';
            typeSecond.style.setProperty('background-color', 'cyan');
        }
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Missigno';
        pokemonNumber.innerHTML = '?';
        pokemonImage.src = 'image/Missingno_image.png';
        
        typeFirst.innerHTML = '?';
        typeFirst.style.setProperty('background-color', pokemonColors['normal']);
        typeSecond.innerHTML='';
        typeSecond.style.setProperty('background-color', 'cyan');
        searchPokemon = 0;
    }
}

buttonShiny.addEventListener('click', function() {
    if(searchPokemon!=0){
        precionado = !precionado;

    
        if (precionado) {
            pokemonImage.src = imagemshiny;
            buttonShiny.classList.add('active');
        } else {
            pokemonImage.src = imagem;
            buttonShiny.classList.remove('active');
        } 
    }
});

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () =>{
    if(searchPokemon<=1);
    else{
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    if(searchPokemon>650);
    else{
        searchPokemon++;
        renderPokemon(searchPokemon);
    }
    
});

renderPokemon(searchPokemon);