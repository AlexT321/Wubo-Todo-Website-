import { useState, useRef, useContext, useEffect } from "react";
import { Board_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";
import List from "./List"

const Create_List = () => {
  const Board = useContext(Board_Context);

  const [list_visibility, set_list_visibility] = useState("hidden");
  const [create_list_visibility, set_create_list_visibility] = useState("visible");

  const [list_name, set_list_name] = useState("");
  const [board_lists, set_board_lists] = useState([]);

  const create_list = useRef(null);
  const create_list_overlay = useRef(null);

  const create_board_list = () => {
    set_list_visibility("visible");
    set_create_list_visibility("hidden");
  };

  const handleClickOutside = (e) => {
    if (
      create_list_overlay.current &&
      !create_list_overlay.current.contains(e.target) &&
      !create_list.current.contains(e.target)
    ) {
      set_list_visibility("hidden");
      set_create_list_visibility("visible");
    }
  };
  document.addEventListener("click", handleClickOutside);

  const create_list_on_server = async (body) => {
    try {
      const result = await fetch(
        "http://localhost:5000/Health-Website/create_board_list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (e) {
      console.log(e);
    }
  };

  const create_list_component = () => {
    const list = {
      id: { _id: Board.single_board_info[0]._id },
      board_list: { $push: { board_list: { name: list_name} } },
    };
    create_list_on_server(list);
    set_board_lists([...board_lists, { name: list_name }]);
  };

  useEffect(() => {
    if (Board.multiple_board_info.length > 0) {
    }
  }, [Board]);

  return (
    <>
      {board_lists.map((board_list, index) => {
        return (
          <List key={index} />
        )
      })}
      <div id="Board_List_Container">
        <div
          id="create-list"
          onClick={create_board_list}
          style={{ visibility: create_list_visibility }}
          ref={create_list}
        >
          + create list
        </div>
        <div
          id="create-list-overlay"
          style={{ visibility: list_visibility }}
          ref={create_list_overlay}
        >
          <input
            className="create-list-input"
            type="text"
            placeholder="Enter list title"
            value={list_name}
            onChange={(e) => set_list_name(e.target.value)}
          />
          <button id="create-list-button" onClick={create_list_component}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default Create_List;
