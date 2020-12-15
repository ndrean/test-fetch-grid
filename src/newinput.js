import React from "react";

export default function NewInput(props) {
  return (
    <>
      <label htmlFor={props.attr}>{props.children}</label>
      <input
        //{...props}
        type="text"
        name={props.attr}
        id={props.attr}
        value={props.val}
        onChange={props.handleInput}
      />
    </>
  );
}
