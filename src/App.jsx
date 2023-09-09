import { useState } from "react";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import Items from "./components/Items";
import Timer from "./components/Timer";
import { ToastContainer, toast } from "react-toastify";

const setLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

const getDefaultList = () => {
  return JSON.parse(localStorage.getItem("items") || "[]");
};

const App = () => {
  const [items, setItems] = useState(getDefaultList());

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("Task added to the list");
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("Task removed");
  };

  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
  };

  const clearAll = () => {
    localStorage.removeItem("items");
    setItems([]);
  };
  return (
    <div className="items-container">
      <section className="section-center">
        <ToastContainer position="top-right" closeOnClick autoClose={1000} />
        <div>
          <Form addItem={addItem} items={items} />
          <Items items={items} removeItem={removeItem} editItem={editItem} />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button className="btn" onClick={clearAll}>
              clear all
            </button>
          </div>
        </div>
        <div></div>
      </section>
      {/* <Timer /> */}
    </div>
  );
};

export default App;
