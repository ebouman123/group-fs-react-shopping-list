import ShoppingItem from "../ShoppingItem/ShoppingItem";
import axios from "axios";

export default function ShoppingList({ shoppingList, getShoppingList }) {
  const removeAll = () => {
    for (let i = 0; i < shoppingList.length; i++) {
      const items = shoppingList[i];

      axios
        .delete(`/api/itemList/${items.id}`)
        .then((response) => {
          getShoppingList();
        })
        .catch((err) => {
          console.log("error removing all", err);
        });
    }
  };

  const resetItem = () => {
    let data = {};

    for (let i = 0; i < shoppingList.length; i++) {
      const items = shoppingList[i];

      data = {
        purchased: items.purchased,
      };
      if (items.purchased){
      axios
        .put(`/api/itemList/${items.id}`, data)
        .then((response) => {
          getShoppingList();
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
  };

  return (
    <>
      <h2>Shopping List</h2>
      <button onClick={resetItem}>Reset</button>
      <button onClick={removeAll}>Clear</button>
      <ul>
        {shoppingList.map((item) => {
          return (
            <ShoppingItem
              getShoppingList={getShoppingList}
              key={item.id}
              item={item}
            />
          );
        })}
      </ul>
    </>
  );
}
