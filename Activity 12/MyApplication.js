import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Payment({ setDataF, setViewer }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data); // log all data
    console.log(data.fullName); // log only fullname
    // update hooks
    setDataF(data);
    setViewer(1);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("fullName", { required: true })} placeholder="Full Name" />
          {errors.fullName && <p>Full Name is required.</p>}
        </div>
        <div>
          <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
          {errors.email && <p>Email is required.</p>}
        </div>
        <div>
          <input {...register("creditCard", { required: true })} placeholder="Credit Card" />
          {errors.creditCard && <p>Credit Card is required.</p>}
        </div>
        <div>
          <input {...register("address", { required: true })} placeholder="Address" />
          {errors.address && <p>Address is required.</p>}
        </div>
        <div>
          <input {...register("address2")} placeholder="Address 2" />
        </div>
        <div>
          <input {...register("city", { required: true })} placeholder="City" />
          {errors.city && <p>City is required.</p>}
        </div>
        <div>
          <input {...register("state", { required: true })} placeholder="State" />
          {errors.state && <p>State is required.</p>}
        </div>
        <div>
          <input {...register("zip", { required: true })} placeholder="Zip" />
          {errors.zip && <p>Zip is required.</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function Summary({ dataF, setViewer, setDataF }) {
  const updateHooks = () => {
    setViewer(0);
    setDataF({});
  };

  return (
    <div>
      <h1>Payment summary:</h1>
      <h3>{dataF.fullName}</h3>
      <p>{dataF.email}</p>
      <p>{dataF.creditCard}</p>
      <p>{dataF.address}</p>
      <p>{dataF.city},{dataF.state} {dataF.zip} </p>
      <button onClick={updateHooks}>Submit</button>
    </div>
  );
};

function App() {
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);

  return (
    <div>
      {viewer === 0 && <Payment setDataF={setDataF} setViewer={setViewer} />}
      {viewer === 1 && <Summary dataF={dataF} setViewer={setViewer} setDataF={setDataF} />}
    </div>
  );
}

export default App;
