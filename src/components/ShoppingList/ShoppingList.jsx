import ShoppingItem from "../ShoppingItem/ShoppingItem";
import axios from "axios";
import Swal from "sweetalert2";

export default function ShoppingList({ shoppingList, getShoppingList }) {
  const removeAll = () => {
    Swal.fire({
      title: "Are you sure you want to delete all items?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
        Swal.fire({
          title: "Deleted!",
          text: "Your shopping list has been cleared",
          icon: "success",
        });
      }
    });
  };

  const resetItems = () => {
    let data = {};

    Swal.fire({
      title: "Are you sure you want to Reset?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Reset",
      denyButtonText: `Don't Reset`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        for (let i = 0; i < shoppingList.length; i++) {
          const items = shoppingList[i];
    
          data = {
            purchased: items.purchased,
          };
          if (items.purchased) {
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
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  };

  return (
    <>
      <h2>Shopping List</h2>
      <button onClick={resetItems}>Reset</button>
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
