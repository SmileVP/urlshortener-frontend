import React from "react";
import { useNavigate } from "react-router-dom";
import CreateUrl from "./CreateUrl";

function Menu() {
  let navigate = useNavigate();

  return (
    <div>
      <CreateUrl />
    </div>
  );
}

export default Menu;
