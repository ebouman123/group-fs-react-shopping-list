import React from 'react';

import Header from '../Header/Header.jsx'
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ShoppingForm from '../ShoppingForm/ShoppingForm.jsx';
import ShoppingList from '../ShoppingList/ShoppingList.jsx';

function App() {

    let [shoppingList, setShoppingList] = useState([])
    
    const getShoppingList = () => {
        axios
          .get("/api/itemList")
          .then((response) => {
            setShoppingList(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        getShoppingList();
      }, []);

    return (
        <div className="App">
            <Header />
            <main>
                <ShoppingForm getShoppingList={getShoppingList}/>
                <ShoppingList shoppingList={shoppingList}/>
            </main>
        </div>
    );
}

export default App;
