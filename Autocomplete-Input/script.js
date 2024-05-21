const options = [
    'iPhone',
    'iPhone Max',
    'iPad Pro',
    'iPad Air',
    'Apple TV',
    'Samsung TV',
    'Samsung S24 Ultra',
    'Apple watch',
    'Vivo',
    'Sony'
]

let filteredOptions = [];

const inputElement = document.getElementById('autocomplete-input');
const optionsElement = document.getElementById('autocomplete-options')

hideOptionList();

inputElement.addEventListener('input', (e) => {
    if (e.target.value){
        const searchQuery = e.target.value.toLowerCase().trim();
        updateOptionList(searchQuery);
    } else {
        hideOptionList();
    }
})

let currentFocused = null;
let idx = -1;

inputElement.addEventListener('keydown', e => {
    if(e.key === 'ArrowDown'){
        currentFocused?.classList.remove('option-focused')

        if(idx === filteredOptions.length-1){
            idx = 0;
        }
        else idx++;

        optionsElement.children[idx].classList.add('option-focused')
        currentFocused = optionsElement.children[idx];
    }

    if(e.key === 'ArrowUp'){
        currentFocused?.classList.remove('option-focused')

        if(idx === 0){
            idx = filteredOptions.length-1
        }
        else idx--;

        console.log(idx)

        optionsElement.children[idx].classList.add('option-focused')
        currentFocused = optionsElement.children[idx];
    }
    
    if(e.key === 'Enter') {
        inputElement.value = filteredOptions[idx]
        hideOptionList();
        filteredOptions = [];
        currentFocused = null;
        idx = -1;
    }
    
})

function showOptionList(){
    optionsElement.classList.remove('hide-element');
}

function hideOptionList(){
    optionsElement.classList.add('hide-element');

}

function updateOptionList(searchQuery){
    if(!searchQuery){
        filteredOptions = [];
        hideOptionList()
        return;
    }
    
    filteredOptions = options.filter(option => option.toLowerCase().startsWith(searchQuery));
    
    if(!filteredOptions.length){
        hideOptionList()
        return;
    }

    const newChildren = filteredOptions.map(option => {
        const element = document.createElement('span')
        element.className = 'option'
        element.textContent = option

        element.addEventListener('click',(e) => {
            inputElement.value = option
            hideOptionList();
            filteredOptions = [];
        })
        
        return element
    })

    showOptionList();
    optionsElement.replaceChildren(...newChildren)
}