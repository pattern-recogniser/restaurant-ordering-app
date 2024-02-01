import { menuArray } from '/data.js'

const menuEl = document.getElementsByTagName("menu")[0]

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
render()

