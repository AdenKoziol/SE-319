import React, { useState, useEffect } from "react";
import items from "./products.json";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    };

    const howManyofThis = (id) => {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    };

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    useEffect(() => {
        total();
    }, [cart]);

    const listItems = items.map((el) => (
        <div className="row border-top border-bottom" key={el.id}>
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={el.image} alt={el.title} />
                </div>
                <div className="col">
                    <div className="row text-muted">{el.title}</div>
                    <div className="row">{el.category}</div>
                </div>
                <div className="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)}> - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div className="col">
                    ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
    ));

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <img className="img-fluid" src={el.image} width={150} alt={el.title} />
            {el.title}
            ${el.price}
        </div>
    ));

    return (
        <div>
            <div className="card">
                <div className="row">
                    {/* HERE, IT IS THE SHOPPING CART */}
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col">
                                    <h4><b>319 Shopping Cart</b></h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">
                                    {cart.length}
                                </div>
                            </div>
                        </div>
                        <div>{listItems}</div>
                    </div>
                    <div className="float-end">
                        <p className="mb-0 me-5 d-flex align-items-center">
                            <span className="small text-muted me-2">Order total:</span>
                            <span className="lead fw-normal">${cartTotal}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
