import products from "./data.js"

let totalPrice = 0
const orderContainer = document.getElementById("order-container")
const successSale = document.getElementById("success-sale")
const modal = document.getElementById("modal")

const modalBtn = document.getElementById("modal-btn")

//* Render the products cards and add the event listener for the shop buttons
const render = () => {
    renderProducts()
    addShopEvents()
}

const renderProducts = () => {
    let productsHtml = ""

    for (let product of products) {
        productsHtml += `
        <div class="product">
            <img
                class="product-img"
                src="${product.img}"
                alt="${product.alt}"
                />
                <div class="product-info">
                <div class="product-description">
                <h3>${product.name}</h3>
                <p>$${product.price}.00</p>
                </div>
                <button id="${product.id}-shop-btn" class="shop-btn">Shop</button>
                </div>
                </div>
                `
    }
    document.getElementById("product-gallery").innerHTML = productsHtml
}

const addShopEvents = () => {
    for (let product of products) {
        const btn = document.getElementById(`${product.id}-shop-btn`)
        btn.addEventListener("click", () => {
            addProductToOrder(product)
            btn.disabled = true
            successSale.classList.remove("show")
        })
    }
}

// Helper function for show or hide the order section
const renderOrder = () => {
    totalPrice > 0
        ? orderContainer.classList.add("show")
        : orderContainer.classList.remove("show")
}

//* Adds the product to the order list and the events listener for the remove buttons
const addProductToOrder = (product) => {
    let div = document.createElement("div")
    div.className = "order-product"
    div.setAttribute("id", `${product.id}-order-product`)
    div.innerHTML = `
        <div class="order-product-name">
            <h3>${product.name}</h3>
            <button id="${product.id}-remove-btn" class="remove-btn">remove</button>
        </div>
        <p>$${product.price}.00</p>
    `
    document.getElementById("order-title").after(div)
    totalPrice += product.price
    document.getElementById("total-price").innerText = `$${totalPrice}.00`

    addRemoveEvent(product)
    renderOrder()
}

const addRemoveEvent = (product) => {
    const btn = document.getElementById(`${product.id}-remove-btn`)
    btn.addEventListener("click", () => {
        document.getElementById(`${product.id}-order-product`).remove()
        document.getElementById(`${product.id}-shop-btn`).disabled = false

        totalPrice -= product.price
        document.getElementById("total-price").innerText = `$${totalPrice}.00`

        renderOrder()
    })
}

document.getElementById("order-complete-btn").addEventListener("click", () => {
    modal.classList.add("show")
})

modal.addEventListener("submit", (e) => {
    e.preventDefault()
    const consentFormData = new FormData(modal)
    const name = consentFormData.get("name")
    modal.classList.remove("show")

    totalPrice = 0
    for (let product of products) {
        let div = document.getElementById(`${product.id}-order-product`)
        if (div) {
            div.remove()
        }
        document.getElementById(`${product.id}-shop-btn`).disabled = false
    }
    renderSuccessSale(name)

    modal.reset()
})

const renderSuccessSale = (name) => {
    orderContainer.classList.remove("show")
    successSale.classList.add("show")
    const p = document.createElement("p")
    p.className = "success-sale-text"
    p.innerText = `Thanks ${name}! Your order will be shipping soon`

    successSale.appendChild(p)
}

render()
