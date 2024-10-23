class Cart {
  constructor(parent, price) {
    this.parent = parent;
    this.price = price;
    this.products = [];
    this.toShow = [];
    this.parent.addEventListener("click", this);
  }

  showProducts() {
    this.toShow = [...new Set(this.products)];
    this.parent.innerHTML = "";
    this.toShow.forEach((product) => {
      const qty = this.products.filter((p) => p.id === product.id).length;
      this.createCard(product, qty);
    });

    this.calcTotalPrice()
  }

  createCard(data, qty) {
    const cardElm = document.createElement("div");
    const imgElm = this.productImg(data);
    const infoElm = this.productInfo(data);
    const controlElm = this.productControl(data, qty);

    cardElm.innerHTML = imgElm;
    cardElm.innerHTML += infoElm;
    cardElm.innerHTML += controlElm;

    this.parent.appendChild(cardElm);
  }

  productImg(data) {
    const { image, alt } = data;
    const imgJSX = `<img alt=${alt} src=${image} />`;
    return imgJSX;
  }

  productInfo(data) {
    const { name, price } = data;
    const infoJSX = `
      <div id="cart-info">
        <h4>${name}</h4>
        <p>$ ${price}</p>
      </div>
    `;

    return infoJSX;
  }

  productControl(data, qty) {
    const { id } = data;
    const controlJSX = `
      <div id="cart-control">
        <div>
          <button data-id=${id}>-</button>
          <span>${qty}</span>
          <button data-id=${id}>+</button>
        </div>
        <button data-id=${id}>Remove</button>
      </div>
    `;

    return controlJSX;
  }

  handleEvent(event) {
    const { target } = event;
    const tagName = target.tagName;
    const id = target.dataset.id;
    const type = target.innerText;

    if (tagName !== "BUTTON") return;

    switch (type) {
      case "+":
        this.increase(id);
        break;
      case "-":
        this.decrease(id);
        break;
      case "Remove":
        this.remove(id);
        break;
    }
  }

  increase(id) {
    const product = this.products.find((item) => +id === item.id);
    this.products.push(product);
    this.showProducts();
  }

  decrease(id) {
    const index = this.products.findIndex((p) => p.id === +id);
    this.products.splice(index, 1);
    this.showProducts();
  }

  remove(id) {
    const newProducts = this.products.filter((p) => p.id !== +id);
    this.products = newProducts;
    this.showProducts();
  }

  calcTotalPrice() {
    const total = this.products.reduce((acc , cur) => acc+= cur.price , 0)
    this.price.innerText ="$"+ total
  }
}

export default Cart;
