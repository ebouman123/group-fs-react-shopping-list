import axios from "axios";

export default function ShoppingItem({ item, getShoppingList }) {

  const buyItem = () => {
    axios
      .put(`/api/itemList/${item.id}`)
      .then((response) => {
        getShoppingList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeItem = () => {
    axios
      .delete(`/api/itemList/${item.id}`)
      .then((response) => {
        getShoppingList();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <>
      <li>
        <p>{item.name}</p>
        <p>{item.quantity}</p>
        <p>{item.unit}</p>
        {item.purchased ? (
        <p>Purchased</p>
      ) : (
        <>
          <button onClick={buyItem}>Buy</button>
          <button onClick={removeItem}>Remove</button>
        </>
      )}
      </li>

    </>
  );

}