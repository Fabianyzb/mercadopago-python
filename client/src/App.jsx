import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import "./App.css";

const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-82ea2518-1387-4c5a-a544-dabc7223b60e");

  /* Mercadopago nos pide crear una preferencia */
  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4444/create_preference",
        {
          description: "Shin-chan",
          price: 100,
          quantity: 1,
          currency_id: "CLP",
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handlebuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <>
      <div className="card-product-container">
        <div className="card-product">
          <div className="card">
            <img src="https://shorturl.at/jyV02" alt="" />
            <h3>Shin-chan</h3>
            <p className="price">$200</p>
            <button onClick={handlebuy}>Buy</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
