import React from "react";
import { products } from "../products";
import _ from "lodash";

export default class shoppingBasket extends React.PureComponent {
  state = {
    basket: []
  };

  addToBasket = products => {
    const basket = [...this.state.basket];

    basket.push({
      code: products.code,
      product_name: products.product_name,
      price: products.price
    });

    this.setState({ basket });
  };

  removeFromBasket = index => {
    const basket = [...this.state.basket];

    basket.splice(index, 1);

    this.setState({ basket });
  };

  render() {
    const total = this.state.basket.reduce((a, b) => a + b.price, 0);

    //const quantities = _.groupBy(this.state.basket, "product_name");

    const quantities = _.groupBy(this.state.basket, function(product) {
      return product.product_name;
    });

    console.log(quantities);

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

          <div>
            {Object.keys(quantities).map((key, index) => {
              const count = quantities[key].length;
              return (
                <div className="shoppingList">
                  <span key={index}>
                    {key} x{count}
                  </span>
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
        </div>
        <div className="total">
          <h4>Quantity: {this.state.basket.length}</h4>
          {total !== 0 && <h2>Price: £{total.toFixed(2)}</h2>}
        </div>
      </div>
    );
  }
}
