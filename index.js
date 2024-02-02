import { menuArray } from '/data.js'

const menuEl = document.getElementsByTagName("menu")[0]
const orderBtn = document.getElementById("order-btn")
const modal = document.getElementById("card-details")
const payBtn = document.getElementById("pay-btn")

render()
modal.style.visibility = "hidden"

orderBtn.addEventListener("click", handlePaymentPage)

payBtn.addEventListener("click", handlePaymentCompletion)

function handlePaymentPage(){
    modal.style.visibility = "visible"
    
}


function handlePaymentCompletion(event){
    event.preventDefault()
    const orderSummaryDiv = document.getElementsByClassName("order-summary")[0]
    orderSummaryDiv.remove()
    const messageDiv = document.getElementsByClassName("message")[0]
    messageDiv.classList.remove("hidden")
    modal.style.visibility = "hidden"
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
                <img src="images/add-btn.png" alt="add-btn">
            </button>

        </menu_item>
        `
    }
    menuEl.innerHTML = htmlString
}



// const orderSummaryDiv = document.getElementsByClassName("order-summary")[0]
// console.log(orderSummaryDiv)
// orderSummaryDiv.style.visibility = "hidden"