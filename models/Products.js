class Products {
  constructor(parent, products) {
    this.parent = parent;
    this.products = products;
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
    <div>
        <h3>${name}</h3>
        <div>
            <span>${price}</span>
            <button data-id=${id}>+</button>
        </div>
    </div>`;

    return infoJSX
  }
}

export default Products;
