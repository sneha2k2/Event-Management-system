
import React, { useState } from "react";
import { addEvent } from "../services/eventSlice";
import { useDispatch } from "react-redux";



function AddEvent() {
  let [input, setInput] = useState("");
  const dispatch=useDispatch()

  let getValue = ({ target: { value } }) => {
    setInput(value);
  };
  let addEventHandler = (e) => {
    e.preventDefault();
    dispatch(addEvent(input));
    setInput("");
  };

  return (
    <>
      <form onSubmit={addEventHandler}>
        <input type="text" value={input} onChange={getValue} />
      </form>
    </>
  );
}

export default AddEvent;
