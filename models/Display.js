class Display {
  constructor(parent, products) {
    this.parent = parent;
    this.products = products;
    this.parent.addEventListener("click", this);
  }

  showProducts() {
    this.toShow = [...new Set(this.products)];
    this.parent.innerHTML = "";
    if (!this.products.length) {
      this.parent.innerHTML = "<h5>Empty</h5>";
    }
    this.toShow.forEach((product) => {
      const qty = this.products.filter((p) => p.id === product.id).length;
      this.createCard(product, qty);
    });

    this.calcTotalPrice();
  }

  createCard(data, qty) {
    const cardElm = document.createElement("div");
    const imgElm = this.productImg(data);
    const infoElm = this.productInfo(data);

    cardElm.innerHTML = imgElm;
    cardElm.innerHTML += infoElm;

    if (this.constructor.name === "Cart") {
      const controlElm = this.productControl(data, qty);
      cardElm.innerHTML += controlElm;
    }

    this.parent.appendChild(cardElm);
  }

  productImg(data) {
    const { image, alt } = data;
    const imgJSX = `<img alt=${alt} src=${image} />`;
    return imgJSX;
  }
}

export default Display;
