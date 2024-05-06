import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import './index.css';

document.body.classList.add('overflow-x-hidden');

fetch("http://localhost:8081/listProducts")
    .then(response => response.json())
    .then(products => {
        ReactDOM.render(
            <React.StrictMode>
                <App products={products} />
            </React.StrictMode>,
            document.getElementById('root')
        );
    })
    .catch(error => console.error('Error fetching products:', error));
    
function App ({ products }) {
    const [viewer, setViewer] = useState(0);
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [currID, setCurrID] = useState(-1);
    const [total, setTotal] = useState(0);
    const [paymentData, setPaymentData] = useState({});
    
    return (
        <div>
            {viewer === 0 && (
                <HomePage 
                    products={products} 
                    setViewer={setViewer} 
                    setSelectedSport={setSelectedSport} 
                />
            )}
            {viewer === 1 && (
                <SportsPage 
                    products={products} 
                    setViewer={setViewer} 
                    selectedSport ={selectedSport} 
                    setSelectedItem={setSelectedItem} 
                    selectedItem={selectedItem} 
                />
            )}
            {viewer === 2 && (
                <ItemPage 
                    products={products}    
                    setViewer={setViewer} 
                    selectedItem={selectedItem} 
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    setCurrID={setCurrID}
                />
            )}
            {viewer === 3 && (
                <Cart 
                    products={products} 
                    setViewer={setViewer} 
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    setTotal={setTotal}
                    setPaymentData={setPaymentData}
                />
            )}
            {viewer === 4 && (
                <ConfirmationPage 
                    products={products} 
                    setViewer={setViewer} 
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    total={total}
                    paymentData={paymentData}
                />
            )}
            {viewer === 5 && (
                <CreateItem 
                    products={products} 
                    setViewer={setViewer} 
                />
            )}
            {viewer === 6 && (
                <UpdateItem
                    products={products} 
                    setViewer={setViewer}
                    currID={currID}
                />
            )}
            {viewer === 7 && (
                <DeleteItem
                    products={products} 
                    setViewer={setViewer} 
                    currID={currID}
                />
            )}
            {viewer === 8 && (
                <AboutPage 
                    setViewer={setViewer} 
                    currID={currID}
                />
            )}
        </div>
    );
}
    
function HomePage ({ products, setViewer, setSelectedSport }) {
    const uniqueSports = products.reduce((sports, product) => {
        sports.add(product.sport);
        return sports;
    }, new Set());

    const sportsList = Array.from(uniqueSports);
    
    function handleClick(sport) {
        setSelectedSport(sport);
        setViewer(1);
    }

    return (
        <div>
            <header data-bs-theme="dark">
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-light mr-2" onClick={() => setViewer(8)}>About Us</button>
                            </div>
                            <h3 className="resportify mx-auto">Resportify</h3>
                            <div>
                                <button className="btn btn-outline-light mr-2" onClick={() => setViewer(5)}>Post Item</button>
                                <button className="btn btn-outline-light" onClick={() => setViewer(3)}>Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='bg-black min-vh-100'>
                <div className="container py-4">
                    <div className="row">
                        {sportsList.map((sport, index) => (
                            <div key={index} className="col-md-6 mb-3">
                                <a className="text-decoration-none" onClick={() => handleClick(sport)}>
                                    <div className="card bg-dark shadow-sm" style={{ height: '200px' }}>
                                        <div className="card-body d-flex justify-content-center align-items-center">
                                            <h2 className="card-title-0">{sport}</h2>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function SportsPage ({ products, setViewer, selectedSport, setSelectedItem, selectedItem }) {
    const filteredProducts = products.filter(product => product.sport === selectedSport);
    
    function handleClick(item) {
        setSelectedItem(item);
        setViewer(2);
    }

    return (
        <div>
            <header data-bs-theme="dark">
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-light" onClick={() => setViewer(0)}>Back</button>
                        <h3 className="resportify">Resportify</h3>
                        <div>
                            <button className="btn btn-outline-light" onClick={() => setViewer(5)}>Post Item</button>
                            <button className="btn btn-outline-light" onClick={() => setViewer(3)}>Cart</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className='bg-black min-vh-100'>
                <div className="container py-4">
                    <div className="row">
                        {filteredProducts.map((item, index) => (
                            <div key={index} className="col-md-6 mb-3">
                                <a href="#" className="text-decoration-none">
                                    <div className="card shadow-sm h-100" onClick={() => handleClick(item)}>
                                        <img src={item.url} className="card-img-top" alt={item.name} />
                                        <div className="card-body bg-dark d-flex justify-content-center align-items-center">
                                            <h2 className="card-title-0">{item.name} - ${item.price}</h2>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ItemPage ({ products, setViewer, selectedItem, cartItems, setCartItems, setCurrID }) {
    
    function addToCart(item) {
        cartItems.push(item);
    }

    function updateItem(id) {
        setCurrID(id);
        setViewer(6);
    }

    function deleteItem(id) {
        setCurrID(id);
        setViewer(7);
    }

    return (
    <div>
        <header data-bs-theme="dark">
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-light" onClick={() => setViewer(1)}>Back</button>
                    <h3 className="resportify">Resportify</h3>
                    <div>
                        <button className="btn btn-outline-light" onClick={() => setViewer(5)}>Post Item</button>
                        <button className="btn btn-outline-light" onClick={() => setViewer(3)}>Cart</button>
                    </div>
                </div>
            </div>
            <div className='bg-dark min-vh-100'>
                <div className='container py-4'>
                    <div className='row'>
                        <div className='col-auto'>
                            <img src={selectedItem.url} className='itemImage' alt="..."></img>
                        </div>
                        <div className='col-auto'>
                            <div className='item-text'>
                                <h3 className='itemTitle'>{selectedItem.name}</h3>
                                <p className='cost'>${selectedItem.price}</p>
                                <p>Date Posted: {selectedItem.datePosted}</p>
                                <p>Poster: {selectedItem.poster}</p>
                                <p>Description: {selectedItem.description}</p>
                                <button className="btn btn-outline-light" onClick={() => addToCart(selectedItem)}>Add to Cart</button>
                                <button className="btn btn-outline-light" onClick={() => updateItem(selectedItem.id)}>Update Item</button>
                                <button className="btn btn-outline-light" onClick={() => deleteItem(selectedItem.id)}>Delete Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
);
}

function Cart ({ products, setViewer, setCartItems, cartItems, setTotal, setPaymentData }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    function removeFromCart(item) {
        const indexToRemove = cartItems.indexOf(item);
        if (indexToRemove !== -1) {
            const newCartItems = [...cartItems.slice(0, indexToRemove), ...cartItems.slice(indexToRemove + 1)];
            setCartItems(newCartItems);
        }
    }
    
    function getSubtotal() {
        let total = 0;
        for(let i = 0; i < cartItems.length; i++)
        {
            total += cartItems[i].price;
        }
        return total.toFixed(2);
    }

    function getTax() {
        return (getSubtotal() * .07).toFixed(2);
    }

    function getTotal() {
        const subtotal = parseFloat(getSubtotal());
        const tax = parseFloat(getTax());
        return (subtotal + tax).toFixed(2);
    }

    function onSubmit(data) {
        setTotal(getTotal());
        setPaymentData(data);
        setViewer(4);
    }

    return (
        <div>
            <header data-bs-theme="dark">
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-light" onClick={() => setViewer(0)}>Back</button>
                        <h3 className="resportify mx-auto">Resportify</h3>
                        {/* Empty div for spacing */}
                        <div></div>
                    </div>
                </div>
            </header>
            <div className='bg-dark min-vh-100'>
                <div className="container">
                    <div className="row">
                        {cartItems.map((item, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card text-white bg-dark">
                                    <img src={item.url} className='card-img-top' alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">${item.price}</p>
                                        <button className="btn btn-outline-light" onClick={() => removeFromCart(item)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='row text-white'>
                    <div className='col'>
                        <p>Subtotal: ${getSubtotal()}</p>
                    </div>
                    <div className='col'>
                        <p>Tax: {getTax()}</p>
                    </div>
                    <div className='col'>
                        <p>Total: ${getTotal()}</p>
                    </div>
                </div>
                <div className="row text-white">
                    <div className="col">
                        <h2>Payment</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control" />
                                {errors.fullName && <p className="text-danger">Full Name is required.</p>}
                            </div>
                            <div className="form-group">
                                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control" />
                                {errors.email && <p className="text-danger">Email is required.</p>}
                            </div>
                            <div className="form-group">
                                <input {...register("creditCard", { required: true, pattern: { value: /^[0-9]{16}$/, message: "Please enter a valid 16-digit credit card number" } })} placeholder="Credit Card" className="form-control" />
                                {errors.creditCard && <p className="text-danger">Please enter a valid 16-digit credit card number.</p>}
                            </div>
                            <div className="form-group">
                                <input {...register("address", { required: true })} placeholder="Address" className="form-control" />
                                {errors.address && <p className="text-danger">Address is required.</p>}
                            </div>
                            <div className="form-group">
                                <input {...register("address2")} placeholder="Address 2 (Optional)" className="form-control" />
                            </div>
                            <div className="form-group">
                                <input {...register("city", { required: true })} placeholder="City" className="form-control" />
                                {errors.city && <p className="text-danger">City is required.</p>}
                            </div>
                            <div className="form-group">
                                <input {...register("state", { required: true })} placeholder="State" className="form-control" />
                                {errors.state && <p className="text-danger">State is required.</p>}
                            </div>
                            <div className="form-group">
                                <input {...register("zip", { required: true, pattern: { value: /^\d{5}$/, message: "Please enter a valid 5-digit ZIP code" } })} placeholder="Zip" className="form-control" />
                                {errors.zip && <p className="text-danger">Zip is required.</p>}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-outline-light">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ConfirmationPage ({ products, setViewer, cartItems, setCartItems, total, paymentData }) {
    
    function onSubmit() {
        setCartItems([]);
        setViewer(0);
    }

    const calculateCardNum = (number) => {
        return number % 10000;
    };

    return (
        <div className='bg-dark min-vh-100'>
            <header data-bs-theme="dark">
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-center align-items-center">
                        <h3 className="resportify">Resportify</h3>
                    </div>
                </div>
            </header>   
            <div className='text-white'>
                <h1>Payment summary:</h1>
                <h3>Name: {paymentData.fullName}</h3>
                <p>Email: {paymentData.email}</p>
                <p>Credit Card: xxxx xxxx xxxx {calculateCardNum(paymentData.creditCard)}</p>
                <p>Address: {paymentData.address}, {paymentData.city}, {paymentData.state} {paymentData.zip}</p>
                <p>Total: ${total}</p>
            </div>

            <div className='text-white'>
                <h2>Purchased Items:</h2>
                <div className='container py-4'>
                    <div className='row'>
                        {cartItems.map((item, index) => (
                            <div key={index} className="col-md-6 mb-3">
                                <div className="card shadow-sm h-100">
                                    <img src={item.url} className="card-img-top" alt="..."></img>
                                    <div className="card-body bg-dark d-flex justify-content-center align-items-center text-white">
                                        <h2>{item.description}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <button className='btn btn-outline-light' onClick={() => onSubmit()}>Return</button>
            </div>
        </div>
    );
}



function CreateItem ({ products, setViewer }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        data.id = parseInt(data.id);
        data.price = parseFloat(data.price);
        fetch("http://localhost:8081/addProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        setViewer(0);
        window.location.reload();
    };

    return (
        <div className="bg-dark min-vh-100">
            <button className="btn btn-outline-light my-2 mx-2" onClick={() => setViewer(0)}>Back</button>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-3 my-2 mx-2">
                <input {...register("id", {required: true})} placeholder="Item ID" className="form-control" />
                {errors.id && <p className="text-danger">Product ID is required.</p>}

                <input {...register("name", { required: true })} placeholder="Name" className="form-control" />
                {errors.name && <p className="text-danger">Name is required.</p>}

                <input {...register("url")} placeholder="Image URL" className="form-control" />
                {errors.url && <p className="text-danger">URL is required.</p>}

                <input {...register("price", { required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })} placeholder="Price" className="form-control" />
                {errors.price && <p className="text-danger">Price is required and must be a valid number.</p>}

                <input {...register("datePosted")} placeholder="Date Posted" className="form-control" />
                {errors.datePosted && <p className="text-danger">Date Posted is required.</p>}

                <input {...register("poster", { required: true })} placeholder="Poster" className="form-control" />
                {errors.poster && <p className="text-danger">Poster is required.</p>}

                <textarea {...register("description", { required: true })} placeholder="Description" className="form-control" />
                {errors.description && <p className="text-danger">Description is required.</p>}

                <input {...register("sport")} placeholder="Sport" className="form-control" />
                {errors.sport && <p className="text-danger">Sport is required.</p>}

                <button type="submit" className="btn btn-outline-light">Submit</button>
            </form>
        </div>
    );
}

function UpdateItem ({ products, setViewer, currID }) {
    const [oneProduct, setOneProduct] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    const handlePriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    const onSubmit = () => {
        fetch(`http://localhost:8081/updateProduct/${currID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price: newPrice })
        })
        .then(response => {
            if (response.ok) {
                console.log('Product updated successfully.');
                setOneProduct(null);
                setNewPrice('');
                setViewer(0);
                window.location.reload();
            } else {
                console.error('Failed to update product.');
            }
        })
        .catch(error => {
            console.error('Error updating product:', error);
        });
    };

    function getOneProduct(id) {
        if (id > 0 && id < 999) {
            console.log("Fetching product with ID:", id);
            fetch("http://127.0.0.1:8081/getProduct/" + id)
            .then(response => response.json())
            .then(data => {
                console.log("Received product data:", data);
                setOneProduct(data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                setOneProduct(null);
            });
        } else {
            setOneProduct(null);
        }
    }

    useEffect(() => {
        getOneProduct(currID);
    }, [currID]);

    return (
        <div className="bg-dark min-vh-100">
            <button className="btn btn-outline-light my-2 mx-2" onClick={() => setViewer(0)}>Back</button>
            <div className='container py-4'>
                    <div className='row'>
                        <div className='col-auto'>
                            {oneProduct && (
                                <div key={oneProduct.id} className='mx-2 my-2'>
                                    <img src={oneProduct.url} className='itemImage' alt="images" /> <br />
                                </div>
                            )}
                        </div>
                        <div className='col-auto'>
                            {oneProduct && (
                                <div className="row align-items-center">
                                    <div className="text-white item-text">
                                        <p>Product ID: {oneProduct.id}</p>
                                        <p>Name: {oneProduct.name}</p>
                                        <p>Price: {oneProduct.price}</p>
                                        <p>Date Posted: {oneProduct.datePosted}</p>
                                        <p>Poster: {oneProduct.poster}</p>
                                        <p>Description: {oneProduct.description}</p>
                                        <p>Sport: {oneProduct.sport}</p>
                                    </div>
                                    <div className="col-auto">
                                        <input 
                                            type="text" 
                                            id="price"
                                            name="price"
                                            placeholder="New Price" 
                                            value={newPrice} 
                                            onChange={handlePriceChange}
                                            className="form-control"
                                            style={{ width: '200px' }}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-outline-light" onClick={onSubmit}>Update Price</button>
                                    </div>
                                </div>
                            )}
                        </div>
                </div>.
            </div>
        </div>
    );
}

function DeleteItem ({ products, setViewer, currID }) {
    const [oneProduct, setOneProduct] = useState(null);

    const onSubmit = () => {
        fetch(`http://localhost:8081/deleteProduct/${currID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currID })
        })
        .then(response => {
            if (response.ok) {
                console.log('Product deleted successfully.');
                setOneProduct(null);
                setViewer(0);
                window.location.reload();
            } else {
                console.error('Failed to delete product.');
            }
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });
    };

    function getOneProduct(id) {
        if (id > 0 && id < 999) {
            console.log("Fetching product with ID:", id);
            fetch("http://127.0.0.1:8081/getProduct/" + id)
            .then(response => response.json())
            .then(data => {
                console.log("Received product data:", data);
                setOneProduct(data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                setOneProduct(null);
            });
        } else {
            setOneProduct(null);
        }
    }

    useEffect(() => {
        getOneProduct(currID);
    }, [currID]);
    
    return (
        <div className="bg-dark min-vh-100">
            <button className="btn btn-outline-light my-2 mx-2" onClick={() => setViewer(2)}>Back</button>
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-auto'>
                        {oneProduct && (
                            <div key={oneProduct.id} className='mx-2 my-2'>
                                <img src={oneProduct.url} className='itemImage' alt="images" /> <br />
                            </div>
                        )}
                    </div>
                    <div className='col-auto'>
                        {oneProduct && (
                            <div key={oneProduct.id} className='mx-2 my-2'>
                                <div className="text-white item-text">
                                    <p>Product ID: {oneProduct.id}</p>
                                    <p>Name: {oneProduct.name}</p>
                                    <p>Price: {oneProduct.price}</p>
                                    <p>Date Posted: {oneProduct.datePosted}</p>
                                    <p>Poster: {oneProduct.poster}</p>
                                    <p>Description: {oneProduct.description}</p>
                                    <p>Sport: {oneProduct.sport}</p>
                                </div>
                            </div>
                        )}
                        <div className="col-auto pl-0">
                            <button className="btn btn-outline-light my-2 mx-2" onClick={onSubmit}>Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AboutPage({setShowAbout}) {
    return (
        <div className="bg-dark min-vh-100 text-white">
            <header data-bs-theme="dark">
            <div class="navbar navbar-dark bg-dark shadow-sm">
                <div class="container">
                <a href="./index.html" class="navbar-brand d-flex align-items-center text-white">Home</a>
                </div>
            </div>
            </header>

            <h1 style={{textAlign: 'center'}}><strong>About</strong></h1>
            <p id="info">Course name: SE/ComS319 Construction of User Interfaces, Spring 2024</p>
            <p id="info">Date: May 2, 2024</p>
            <p id="title">Webpage Authors:</p>
            <p id="name">Aden Koziol - Email: <strong>akoziol@iastate.edu</strong></p>
            <p id="name"> Ryan Holden - Email: <strong>ryanhol@iastate.edu</strong></p>
            <br/>
            <p> Course Instructors:</p>
            <p> Dr. Abraham N. Aldaco Gastelum</p>
            <p> Dr. Ali Jannesari</p>
         </div>
    );
}