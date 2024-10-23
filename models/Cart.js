class Cart {
  constructor(parent, price) {
    this.parent = parent;
    this.price = price;
    this.products = [];
    this.toShow = [];
  }

  showProducts() {
    this.toShow = [...new Set(this.products)];
    this.parent.innerHTML = "";
    this.toShow.forEach((product) => {
      const qty = this.products.filter((p) => p.id === product.id).length;
      this.createCard(product, qty);
    });
  }

  createCard(data, qty) {
    const cardElm = document.createElement("div");
    const imgElm = this.productImg(data);
    const infoElm = this.productInfo(data);
    const controlElm = this.productControl(data, qty);

    cardElm.innerHTML = imgElm;
    cardElm.innerHTML += infoElm;
    cardElm.innerHTML += controlElm;

    this.parent.appendChild(cardElm)
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
}

export default Cart;
