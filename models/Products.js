class Products {
  constructor(parent, products , cart) {
    this.parent = parent;
    this.products = products;
    this.cart = cart;
    this.parent.addEventListener("click" , this)
  }

  showProducts() {
    this.products.forEach((product) => this.createCard(product));
  }

  createCard(data) {
    const cardElm = document.createElement("div");
    const imgElm = this.productImg(data);
    const infoElm = this.productInfo(data)
    cardElm.innerHTML = imgElm;
    cardElm.innerHTML += infoElm

    this.parent.appendChild(cardElm);
  }

  productImg(data) {
    const { image, alt } = data;
    const imgJSX = `<img alt=${alt} src=${image} />`;
    return imgJSX;
  }

  productInfo(data) {
    const { id, name, price } = data;
    const infoJSX = `
    <div id="product-info">
        <h3>${name}</h3>
        <div>
            <span>$ ${price}</span>
            <button data-id=${id}>+</button>
        </div>
    </div>`;

    return infoJSX
  }

  handleEvent(event) {
    const element = event.target
    if(element.tagName === "BUTTON") {
        this.addToCart(element.dataset.id)
    }
  }

  addToCart(id) {
    const product = this.products.find(item => item.id == id)
    this.cart.products.push(product)
    this.cart.showProducts()
  }
}

export default Products;
