import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteTodo = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        // Handle the case where the token is not available
        console.error("JWT token is missing.");
        return;
      }

      const response = await axios.delete(`${baseURL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setUpdateUI((prevState) => !prevState);
    } catch (error) {
      console.error("AxiosError:", error);
      // Handle the error appropriately, such as displaying an error message to the user
    }
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
    <div className="toDo">
      {text}
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDo;
