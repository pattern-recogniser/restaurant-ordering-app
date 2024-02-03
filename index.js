import { menuArray } from '/data.js'

const menuEl = document.getElementsByTagName("menu")[0]
const orderBtn = document.getElementById("order-btn")
const modal = document.getElementById("card-details")
const payBtn = document.getElementById("pay-btn")
const nameInput = document.getElementById("name")
const appDiv = document.getElementById("app-container")
const orderedItems = []

render()
modal.style.visibility = "hidden"

document.addEventListener("click", handleClickEvent)

function showPaymentPage(){
    modal.style.visibility = "visible"
}

function handleClickEvent(event){

    
    if (event.target.id === "order-btn"){
        showPaymentPage()
    }
    else if (event.target.id === "pay-btn"){
        event.preventDefault()
        handlePaymentCompletion()
    }
    else if(event.target.dataset.itemId){
        handleAddItem(event.target.dataset.itemId)
    }
    else if (event.target.classList.contains("remove-label")){
        removeItemFromOrderedItems(event.target.dataset.removeId)
    }
}

function removeItemFromOrderedItems(orderedItemId){
    const indexItemToRemove = 
        orderedItems.findIndex(
            item => item.orderedItemId===parseInt(orderedItemId))
    orderedItems.splice(indexItemToRemove, 1)
    renderOrderSummary(orderedItems)
}

function handleAddItem(itemId){
    addItemToData(itemId)
    renderOrderSummary(orderedItems)
}

function addItemToData(itemId){
    const itemDetail = menuArray.filter(function(menuItem){return menuItem.id===parseInt(itemId) })[0]
    let orderedItemDetail = {
        id: itemId,
        name: itemDetail.name,
        price: itemDetail.price,
        orderedItemId: orderedItems.length
    }
    orderedItems.push(orderedItemDetail)
    
}

function renderOrderSummary(orderedItems){
    let orderedItemsHtmlStr = ''
    const orderSummaryDiv = document.getElementById("order-summary")
    orderSummaryDiv.innerHTML = `<h2 class="order-summary--title">Your order</h2>`

    for (let orderedItem of orderedItems){
        const {id, name, price, orderedItemId} = orderedItem
        orderedItemsHtmlStr += `
        <div class="order-summary--detail">
            <h2>
                ${name} 
                <span class="remove-label" data-remove-id=${orderedItemId}>
                    remove
                </span>
            </h2>
            <h2>$${price}</h2>
        </div>   
        `
    }
    orderedItemsHtmlStr = addTotalToOrderSummaryHtml(orderedItemsHtmlStr)
    orderedItemsHtmlStr = addOrderButtonToOrderSummaryHtml(orderedItemsHtmlStr)


    orderSummaryDiv.innerHTML += orderedItemsHtmlStr
}

function addTotalToOrderSummaryHtml(orderedItemsHtmlStr){
    const totalPrice = orderedItems.reduce(
        (totalPrice, item) => totalPrice+= item.price, 0)
    orderedItemsHtmlStr += `
    <div class="order-summary--total">
        <h2>Total price:</h2>
        <h2>\$${totalPrice}</h2>
    </div>
    `
    return orderedItemsHtmlStr
}

function addOrderButtonToOrderSummaryHtml(orderedItemsHtmlStr){
    orderedItemsHtmlStr += `
    <button 
        class="green-btn" 
        id="order-btn"
    >
            Complete Order
    </button>
    `
    return orderedItemsHtmlStr
}

function handlePaymentCompletion(event){
    const orderSummaryDiv = document.getElementsByClassName("order-summary")[0]
    orderSummaryDiv.remove()
    modal.style.visibility = "hidden"
    displayMessage()
}

function displayMessage(){
    appDiv.innerHTML += `
    <div class="message">
        <p>Thanks ${nameInput.value}, your order is on the way!</p>
    </div>
    `
}

function render(){
    let htmlString = ""
    for (let menuItem of menuArray){
        const {name, ingredients, id, price, emoji} = menuItem
        htmlString += `
        <menu_item>
            <p class="emoji-icon">${emoji}</p>
            <div class="menu-info">
                <h2>${name}</h2>
                <p class="inner-p">${ingredients}</p>
                <h3>\$${price}</h3>
            </div>
            <button>
                <img src="images/add-btn.png" alt="add-btn" data-item-id=${id}>
            </button>

        </menu_item>
        `
    }
    menuEl.innerHTML = htmlString
}

