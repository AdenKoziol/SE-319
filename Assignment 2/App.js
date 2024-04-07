import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import DATA from './data.json';

function Browse({ searchResults, setViewer, handleSearchSubmit, searchTerm, handleSearchInputChange, handleQuantityChange }) {
  const onSubmit = () => {
    setViewer(1);
  };

  return (
    <div className="container">
      {/* Top Bar */}
      <div className="row mb-3 align-items-center">
        <div className="col">
          <form id="searchBar" onSubmit={handleSearchSubmit} className="d-flex">
            {/* Search Bar */}
            <input type="text" name="inputName" value={searchTerm} onChange={handleSearchInputChange} placeholder="Search..." className="form-control" />
            <button type="submit" className="btn btn-primary ml-2">Search</button>
          </form>
        </div>
        <div className="col-auto">
          {/* Cart Button */}
          <button onClick={onSubmit} className="btn btn-primary">Cart</button>
        </div>
      </div>

      {/* Cards */}
      <div className="row">
        {Array.isArray(searchResults) && searchResults.map((product, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card h-100">
              <img className="card-img-top" alt={product.name} src={product.url} style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: <span className="text-success">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span></p>
                <p className="card-text">{product.description}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <button onClick={() => handleQuantityChange(index, (product.quantity || 0) - 1)} className="btn btn-sm btn-outline-secondary">-</button>
                  <span>{product.quantity || 0}</span>
                  <button onClick={() => handleQuantityChange(index, (product.quantity || 0) + 1)} className="btn btn-sm btn-outline-secondary">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ setDataF, setViewer, handleQuantityChange, searchResults }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const calculateSubtotal = (quantity, price) => {
    if (quantity === undefined)
      return 0;
    return quantity * price;
  };

  const totalPrice = searchResults.reduce((total, product) => {
    return total + calculateSubtotal(product.quantity, product.price);
  }, 0);

  const totalPriceRounded = () => {
    return totalPrice.toFixed(2);
  };

  const tax = () => {
    return (totalPrice * 0.07).toFixed(2);
  };

  const totalAfterTax = () => {
    return (totalPrice * 1.07).toFixed(2);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.fullName);
    setDataF(data);
    setViewer(2);
  };

  return (
    <div className="container">
      {/* Top Bar */}
      <button onClick={() => setViewer(0)} className="btn btn-primary mb-3">Return</button>

      {/* Cards */}
      <div className="row">
        {searchResults.map((product, index) => (
          product.quantity > 0 && (
            <div key={index} className="col-md-13 offset-md-0 mb-3">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img className="card-img-top" alt={product.name} src={product.url} style={{ height: "200px", objectFit: "cover" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Price: ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
                      <p className="card-text">Quantity: {product.quantity}</p>
                      <p className="card-text">Subtotal: ${typeof calculateSubtotal(product.quantity, product.price) === 'number' ? calculateSubtotal(product.quantity, product.price).toFixed(2) : calculateSubtotal(product.quantity, product.price)}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button onClick={() => handleQuantityChange(index, (product.quantity || 0) - 1)} className="btn btn-sm btn-outline-secondary">-</button>
                        <span>{product.quantity || 0}</span>
                        <button onClick={() => handleQuantityChange(index, (product.quantity || 0) + 1)} className="btn btn-sm btn-outline-secondary">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )))}
      </div>
      <div className="row mb-3 align-items-center">
        <div className="col">
          <p className="mb-0">Total Price: ${totalPriceRounded()}</p>
        </div>
        <div className="col">
          <p className="mb-0">Tax: ${tax()}</p>
        </div>
        <div className="col">
          <p className="mb-0">Total After Tax: ${totalAfterTax()}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2>Payment</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
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
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Confirmation({ dataF, setViewer, setDataF, purchasedItems, searchResults, setSearchResults }) {
  const updateHooks = () => {
    setViewer(0);
    setDataF({});

    const resetQuantities = searchResults.map(product => ({ ...product, quantity: 0 }));
    setSearchResults(resetQuantities);
  };

  const calculateCardNum = (number) => {
    return number % 10000;
  };

  const calculateSubtotal = (quantity, price) => {
    if (quantity === undefined)
      return 0;
    return quantity * price;
  };

  return (
    <div className="container">
      <h1>Payment summary:</h1>
      <h3>Name: {dataF.fullName}</h3>
      <p>Email: {dataF.email}</p>
      <p>Credit Card: xxxx xxxx xxxx {calculateCardNum(dataF.creditCard)}</p>
      <p>Address: {dataF.address}, {dataF.city}, {dataF.state} {dataF.zip}</p>
      <h2>Purchased Items:</h2>

      {/* Cards */}
      <div className="row">
        {searchResults.map((product, index) => (
          product.quantity > 0 && (
            <div key={index} className="col-md-13 offset-md-0 mb-3">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img className="card-img-top" alt={product.name} src={product.url} style={{ height: "200px", objectFit: "cover" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Price: ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
                      <p className="card-text">Quantity: {product.quantity}</p>
                      <p className="card-text">Subtotal: ${typeof calculateSubtotal(product.quantity, product.price) === 'number' ? calculateSubtotal(product.quantity, product.price).toFixed(2) : calculateSubtotal(product.quantity, product.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )))}
      </div>

      <button onClick={updateHooks} className="btn btn-primary">Keep Shopping</button>
    </div>
  );
}

function App() {
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(DATA.fruits);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filteredResults = DATA.fruits.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Function to handle changing quantity
  const handleQuantityChange = (index, newQuantity) => {
    const newSearchResults = [...searchResults];
    const productToUpdate = newSearchResults[index];

    if (!productToUpdate.hasOwnProperty('quantity')) {
      productToUpdate.quantity = 0;
    }

    productToUpdate.quantity = Math.max(newQuantity, 0);
    setSearchResults(newSearchResults);
  };

  return (
    <div>
      {viewer === 0 && (
        <Browse
          searchResults={searchResults}
          handleSearchSubmit={handleSearchSubmit}
          searchTerm={searchTerm}
          handleSearchInputChange={handleSearchInputChange}
          handleQuantityChange={handleQuantityChange}
          setViewer={setViewer}
        />
      )}
      {viewer === 1 && (
        <Cart
          setDataF={setDataF}
          setViewer={setViewer}
          searchResults={searchResults}
          handleQuantityChange={handleQuantityChange}
        />
      )}
      {viewer === 2 && (
        <Confirmation
          dataF={dataF}
          setViewer={setViewer}
          setDataF={setDataF}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      )}
    </div>
  );
}

export default App;
