import { useState } from "react";
import axios from "axios";

export default function ShoppingForm ({getShoppingList}) {

    let [name, setName] = useState("");
    let [quantity, setQuantity] = useState("");
    let [unit, setUnit] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("/api/itemList", { name: name, quantity: quantity, unit: unit })
      .then((response) => {
        event.target.reset()
        getShoppingList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2>Add an Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">Item:</label>
        <input
          id="nameInput"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
       <label htmlFor = "quantityInput">Quantity</label>
        <input 
        id ="quantityInput"
        type = "text"
        onChange={(event) => setQuantity(event.target.value)}
        />
        <label htmlFor = "unitInput">Unit</label>
        <input 
        id ="unitInput"
        type = "text"
        onChange={(event) => setUnit(event.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}