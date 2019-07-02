import React from "react";
import { products } from "../products";

export default class shoppingBasket extends React.PureComponent {
  state = {
    basket: []
  };

  addToBasket = products => {
    console.log("PRODUCTS", products);
    const { basket } = this.state;
    let newbasket = [...basket];

    if (newbasket.length > 0) {
      newbasket.map(item => {
        console.log("Bas", item);
        if (item.code === products.code) {
          item.quantity = item.quantity + 1;
          return;
        } else {
          newbasket.push({
            code: products.code,
            product_name: products.product_name,
            price: products.price,
            quantity: 1
          });
          return;
        }
      });
    } else {
      console.log("EMPTY");
      newbasket.push({
        code: products.code,
        product_name: products.product_name,
        price: products.price,
        quantity: 1
      });
    }

    console.log("NEW", basket, newbasket);

    // basket.push({
    //   code: products.code,
    //   product_name: products.product_name,
    //   price: products.price,
    //   quantity: 1
    // });

    this.setState({ basket: newbasket });
  };

  removeFromBasket = index => {
    const basket = [...this.state.basket];

    basket.splice(index, 1);

    this.setState({ basket });
  };

  render() {
    const total = this.state.basket.reduce((a, b) => a + b.price, 0);

    return (
      <div>
        <div className="items">
          <h3>Choose your products:</h3>

          {products.map((products, index) => {
            return (
              <button
                key={index}
                className="productButton"
                onClick={() => this.addToBasket(products)}
              >
                <h3>{products.product_name}</h3>
                <p>£{products.price.toFixed(2)}</p>
              </button>
            );
          })}

          {this.state.basket.map((products, index) => {
            return (
              <div className="shoppingList">
                <span key={index}>{products.product_name}</span>
                <button
                  className="closeButton"
                  onClick={() => this.removeFromBasket(index)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <div className="total">
          <h4>Quantity: {this.state.basket.length}</h4>
          {total !== 0 && <h2>Price: £{total.toFixed(2)}</h2>}
        </div>
      </div>
    );
  }
}
