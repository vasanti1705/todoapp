// import axios from "axios";
// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { baseURL } from "../utils/constant";

// const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
//   const [input, setInput] = useState(popupContent.text);

//   const updateToDo = () => {
//     axios
//       .put(`${baseURL}/update/${popupContent.id}`, { toDo: input })
//       .then((res) => {
//         console.log(res.data);
//         setUpdateUI((prevState) => !prevState);
//         setShowPopup(false);
//       });
//   };

//   return (
//     <div className="backdrop">
//       <div className="popup">
//         <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
//         <h1>Update ToDo</h1>

//         <div className="popup__input_holder">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             type="text"
//             placeholder="Update ToDo..."
//           />
//           <button onClick={updateToDo}>Update</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;

import axios from "axios";
import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri"; // Update to the correct import for the close icon
import { baseURL } from "../utils/constant";

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const [input, setInput] = useState(popupContent.text); // Assuming `toDo` is the property name for the text

  // const updateToDo = () => {
  //   axios
  //     .put(`${baseURL}/update/${popupContent.userId}`, { toDo: input }) // Assuming `_id` is the property name for the ID
  //     .then((res) => {
  //       console.log(res.data);
  //       setUpdateUI((prevState) => !prevState);
  //       setShowPopup(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       // Handle the error as needed
  //     });
  // };

  const updateToDo = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        // Handle the case where the token is not available
        console.error("JWT token is missing.");
        return;
      }

      const response = await axios.put(
        `${baseURL}/update/${popupContent.id}`,
        { toDo: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setUpdateUI((prevState) => !prevState);
      setShowPopup(false);
    } catch (error) {
      console.error("AxiosError:", error);
      // Handle the error appropriately, such as displaying an error message to the user
    }
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <RiCloseLine className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update ToDo</h1>

        <div className="popup__input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Update ToDo..."
          />
          <button onClick={updateToDo}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
