import ShoppingItem from "../ShoppingItem/ShoppingItem";

export default function ShoppingList({ ShoppingList }) {
    return (
      <ul>
        {ShoppingList.map((item) => {
          return (
            <ShoppingItem key={item.id} item={item} />
          );
        })}
      </ul>
    );
  }