import axios from "axios";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/itemList/${item.id}`)
          .then((response) => {
            getShoppingList();
          })
          .catch((error) => {
            console.error(error);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="shoppingList">
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
      </div>
    </>
  );
}
