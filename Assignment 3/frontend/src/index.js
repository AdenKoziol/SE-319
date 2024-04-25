import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

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

function App({ products }) {
    const [viewer, setViewer] = useState(0);

    return (
        <div className="product-list">
            {viewer === 0 && (
                <ProductsList products={products} setViewer={setViewer} />
            )}
            {viewer === 1 && (
                <CreateProduct setViewer={setViewer} />
            )}
            {viewer === 2 && (
                <UpdateProduct setViewer={setViewer} />
            )}
            {viewer === 3 && (
                <DeleteProduct setViewer={setViewer} />
            )}
            {viewer === 4 && (
                <About setViewer={setViewer} />
            )}
        </div>
    );
}

function ProductsList({ products, setViewer }) {
    return (
        <div className="bg-dark">
            <div className="row mb-3 bg-black py-2 justify-content-center align-items-center">
                <div className="col-auto mx-5">
                    <button className="btn btn-outline-light" onClick={() => setViewer(1)}>Add Product</button>
                </div>
                <div className="col-auto mx-5">
                    <button className="btn btn-outline-light" onClick={() => setViewer(2)}>Update Product</button>
                </div>
                <div className="col-auto mx-5">
                    <button className="btn btn-outline-light" onClick={() => setViewer(3)}>Delete Product</button>
                </div>
                <div className="col-auto mx-5">
                    <button className="btn btn-outline-light" onClick={() => setViewer(4)}>About</button>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {products.map((product, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card shadow-sm">
                                <img className="card-img-top" alt={product.title} src={product.image} style={{ width: "100%", objectFit: "cover" }} />
                                <div className="card-body">
                                    <p>Product ID: {product.id}</p>
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">Price: <span className="text-success">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span></p>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Category: {product.category}</p>
                                    <p className="card-text">Average Rating: {product.rating.rate}/5</p>
                                    <p className="card-text">Number of Ratings: {product.rating.count}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CreateProduct({ setViewer }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        data.id = parseInt(data.id);
        data.price = parseFloat(data.price);
        console.log(data);
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
        <div className="bg-dark min-vh-100 ">
            <button className="btn btn-outline-light my-2 mx-2" onClick={() => setViewer(0)}>Back</button>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-3 my-2 mx-2">
                <input {...register("id", {required: true})} placeholder="Product ID" className="form-control" />
                {errors.id && <p className="text-danger">Product ID is required.</p>}

                <input {...register("title", { required: true })} placeholder="Title" className="form-control" />
                {errors.title && <p className="text-danger">Title is required.</p>}

                <input {...register("price", { required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })} placeholder="Price" className="form-control" />
                {errors.price && <p className="text-danger">Price is required and must be a valid number.</p>}

                <textarea {...register("description", { required: true })} placeholder="Description" className="form-control" />
                {errors.description && <p className="text-danger">Description is required.</p>}

                <input {...register("category")} placeholder="Category" className="form-control" />

                <input {...register("image")} placeholder="Image URL" className="form-control" />

                <input {...register("rating.rate", { required: true, pattern: /^[0-5]$/ })} placeholder="Rating (0-5)" className="form-control" />
                {errors["rating.rate"] && <p className="text-danger">Rating is required and must be between 0 and 5.</p>}

                <input {...register("rating.count", { required: true, pattern: /^[0-9]+$/ })} placeholder="Rating Count" className="form-control" />
                {errors["rating.count"] && <p className="text-danger">Rating count is required and must be a valid number.</p>}

                <button type="submit" className="btn btn-outline-light">Submit</button>
            </form>
        </div>
    );
}

function UpdateProduct({ setViewer }) {
    const [id, setId] = useState('');
    const [oneProduct, setOneProduct] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    const handlePriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    const onSubmit = () => {
        if (id.trim() !== '') {
            fetch(`http://localhost:8081/updateProduct/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price: newPrice }) // Send new price in the request body
            })
            .then(response => {
                if (response.ok) {
                    console.log('Product updated successfully.');
                    setOneProduct(null);
                    setId('');
                    setNewPrice(''); // Reset new price state
                    setViewer(0);
                    window.location.reload();
                } else {
                    console.error('Failed to update product.');
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
        } else {
            console.error('Please enter a valid product ID.');
        }
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

    return (
        <div className="bg-dark min-vh-100">
            <button className="btn btn-outline-light my-2 mx-2" onClick={() => setViewer(0)}>Back</button>

            <div className='mx-2'>
                <input 
                    type="text" 
                    id="message" 
                    name="message" 
                    placeholder="Product ID" 
                    value={id} 
                    onChange={(e) => {
                        setId(e.target.value);
                        getOneProduct(e.target.value);
                    }} 
                    className="form-control"
                    style={{ width: '200px' }}
                />
            </div>
            <div>
                {oneProduct && (
                    <div key={oneProduct.id} className='mx-2 my-2'>
                        <img src={oneProduct.image} alt="images" /> <br />
                        <div className="text-white">
                            <p>Product ID: {oneProduct.id}</p>
                            <p>Title: {oneProduct.title}</p>
                            <p>Price: {oneProduct.price}</p>
                            <p>Description: {oneProduct.description}</p>
                            <p>Category: {oneProduct.category}</p>
                            <p>Average Rating: {oneProduct.rating.rate}</p>
                            <p>Number of Ratings: {oneProduct.rating.count}</p>
                        </div>
                    </div>
                )}
            </div>
            {oneProduct && (
                <div className="row align-items-center">
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
    );
}

function DeleteProduct({ setViewer }) {
    const [id, setId] = useState('');
    const [oneProduct, setOneProduct] = useState(null);

    const onSubmit = () => {
        if (id.trim() !== '') {
            fetch(`http://localhost:8081/deleteProduct/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            .then(response => {
                if (response.ok) {
                    console.log('Product deleted successfully.');
                    setOneProduct(null);
                    setId('');
                    setViewer(0);
                    window.location.reload();

                } else {
                    console.error('Failed to delete product.');
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
        } else {
            console.error('Please enter a valid product ID.');
        }
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
    
    return (
        <div className="bg-dark min-vh-100">
            <button className="btn btn-outline-light my-2 mx-2" onClick={() => setViewer(0)}>Back</button>

            <div className="my-2 mx-2">
                <input 
                    type="text" 
                    id="message" 
                    name="message" 
                    placeholder="Product ID" 
                    value={id} 
                    onChange={(e) => {
                        setId(e.target.value);
                        getOneProduct(e.target.value);
                    }} 
                    className="form-control"
                    style={{ width: '200px' }}
                />
            </div>
            {id && (
                <div>
                    {oneProduct && (
                        <div key={oneProduct.id} className='mx-2 my-2'>
                            <img src={oneProduct.image} alt="images" /> <br />
                            <div className="text-white">
                                <p>Product ID: {oneProduct.id}</p>
                                <p>Title: {oneProduct.title}</p>
                                <p>Price: {oneProduct.price}</p>
                                <p>Description: {oneProduct.description}</p>
                                <p>Category: {oneProduct.category}</p>
                                <p>Average Rating: {oneProduct.rating.rate}</p>
                                <p>Number of Ratings: {oneProduct.rating.count}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {id && (
                <div className="col-auto pl-0">
                    <button className="btn btn-outline-light my-2 mx-2" onClick={onSubmit}>Delete Product</button>
                </div>
            )}
        </div>
    );
}

function About({ setViewer })
{
    return(
        <div className="bg-dark min-vh-100">
            <button className="btn btn-outline-light my-2 mx-2" onClick={() => setViewer(0)}>Back</button>
                <div className="mx-4 my-4 text-white">
                <h1>About</h1>
                <h4>Aden Koziol: akoziol@iastate.edu</h4>
                <h4>Ryan Holden: ryanhol@iastate.edu</h4>
                <p>Course: SE 319</p>
                <p>Date: 4/20/2024</p>
                <p>Professor: Ali Jannesari</p>
                <p> Project Description: This project requires implementing CRUD operations for products, with separate views for creating, 
                    reading, updating, and deleting items. The frontend will be developed in React with Bootstrap 
                    styling, while the backend will use Node.js with Express and MongoDB for data storage</p>
                </div>
        </div>
    );
}