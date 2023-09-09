import React, { useState } from "react";
import { toast } from "react-toastify";

const Form = ({ addItem, items }) => {
  const [newItemName, setNewItemName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItemName) {
      toast.error("Please provide some value");
      return;
    }
    addItem(newItemName);
    setNewItemName("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4 className="title" style={{ fontSize: "32px", color: "gray" }}>
        TASKIFY
      </h4>
      <h4 className="title">
        {items.length !== 0
          ? `You have ${items.length} tasks for today.`
          : `Add your tasks here`}
      </h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          placeholder="Add an task"
          value={newItemName}
          onChange={(e) => {
            setNewItemName(e.target.value);
          }}
        />
        <button type="submit" className="btn">
          Add task
        </button>
      </div>
    </form>
  );
};

export default Form;
