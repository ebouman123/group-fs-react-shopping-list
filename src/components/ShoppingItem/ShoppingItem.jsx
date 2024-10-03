import { useState } from "react";

export default function ShoppingItem({ item }) {
  const [purchased, setPurchased] = useState(false);

  const buyItem = () => {
    setPurchased(true);
  };

  const removeItem = () => {};

  return (
    <>
      <li>
        <p>{item.name}</p>
        <p>{item.quantity}</p>
        <p>{item.unit}</p>
      </li>
      {purchased ? (
        <p>Purchased</p>
      ) : (
        <>
          <button onClick={buyItem}>Buy</button>
          <button onClick={removeItem}>Remove</button>
        </>
      )}
    </>
  );
}
