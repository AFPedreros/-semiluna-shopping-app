import products from "./data.js"

let totalPrice = 0
const orderContainer = document.getElementById("order-container")

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

const renderOrder = () => {
    totalPrice > 0
        ? orderContainer.classList.add("show")
        : orderContainer.classList.remove("show")
}

const addShopEvents = () => {
    for (let product of products) {
        const btn = document.getElementById(`${product.id}-shop-btn`)
        btn.addEventListener("click", () => {
            addProductToOrder(product)
            btn.disabled = true
        })
    }
}

const addProductToOrder = (product) => {
    let div = document.createElement("div")
    div.className = "order-product"
    div.innerHTML = `
        <div class="order-product-name">
            <h3>${product.name}</h3>
            <button class="remove-btn">remove</button>
        </div>
        <p>$${product.price}.00</p>
    `
    document.getElementById("order-title").after(div)
    totalPrice += product.price
    document.getElementById("total-price").innerText = `$${totalPrice}.00`

    renderOrder()
}

document.getElementById("order-complete-btn").addEventListener("click", () => {
    totalPrice = 0
    render()
})

render()
