function populateUFs() {
    
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res =>  res.json())
    .then( states => {
    
        for (const state of states){
        ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
     
    })
}
populateUFs()

function getCities(event) {
   
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufVaule = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufVaule}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json())
    .then( cities => {
        
       
        for( const city of cities ) {
            citySelect.innerHTML  += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })        
}

document
    
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //Itens de coleta
    //pegar todos os lis

const itemsToColect = document.querySelectorAll(".items-grid li")

for(const item of itemsToColect){
   item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    // adicionar ou temover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID', itemId)


    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se ja estiver selecionado,
    if( alreadySelected >=0 ) {
        // tirar da selção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // False
            return itemIsDifferent
        }) 

        selectedItems = filteredItems
    }else{
        // se nao estiver selecionado
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems)

    // atualuzar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}
