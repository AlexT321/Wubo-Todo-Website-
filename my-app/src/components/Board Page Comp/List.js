import { useState, useRef, useContext } from "react";
import { Board_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";
import Card from "./Card";

const List = ({ name, index }) => {
  const Board = useContext(Board_Context);

  const [cards, set_cards] = useState([]);
  const [create_card_overlay_display, set_card_overlay_display] =
    useState("none");
  const [create_card_button_display, set_card_button_display] =
    useState("flex");
  const [card_name, set_card_name] = useState("");

  const create_card_ref = useRef(null);
  const add_card_ref = useRef(null);

  const create_card_server_side = async (body) => {
    try {
      const result = await fetch(
        "http://localhost:5000/Health-Website/create_card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };

  const create_card = () => {
    const card_info = {
      list_id: { _id: Board.single_board_info[0]._id, "board_lists.unique_id": Board.single_board_info[0].board_lists[index].unique_id },
      cards: {$push: {"board_lists.$.cards": {name: card_name}}},
    }
    create_card_server_side(card_info);
    Board.set_single_board_info([
      {
        ...Board.single_board_info[0],
        board_lists: [
          ...Board.single_board_info[0].board_lists.slice(0, index),
          {
            ...Board.single_board_info[0].board_lists[index],
            cards: [
              ...Board.single_board_info[0].board_lists[index].cards,
              {
                name: card_name,
              },
            ],
          },
          ...Board.single_board_info[0].board_lists.slice(index + 1),
        ],
      },
    ]);
    set_card_name("");
    set_card_overlay_display("none");
    set_card_button_display("flex");
  };

  const add_card = () => {
    set_card_overlay_display("flex");
    set_card_button_display("none");
  };

  const handleClickOutside = (e) => {
    if (
      create_card_ref.current &&
      !create_card_ref.current.contains(e.target) &&
      !add_card_ref.current.contains(e.target)
    ) {
      set_card_overlay_display("none");
      set_card_button_display("flex");
    }
  };
  document.addEventListener("click", handleClickOutside);

  if (
    Board.multiple_board_info.length === 0 ||
    Board.single_board_info.length === 0
  ) {
    return <div id="menu-overlay">Loading...</div>;
  }

  return (
    <div>
      <div className="board">
        <div id="board-header-container">
          <div id="board-name">{name}</div>
          <button id="board-functionalities">...</button>
        </div>
        {Board.single_board_info[0].board_lists[index].cards.map(
          (card, index) => {
            return (
              <Card
                name={card.name}
                key={index}
              />
            );
          }
        )}
        <div
          id="create-card-overlay"
          style={{ display: create_card_overlay_display }}
          ref={create_card_ref}
        >
          <input
            className="create-card-input"
            type="text"
            placeholder="Enter card name"
            value={card_name}
            onChange={(e) => set_card_name(e.target.value)}
          />
          <button id="create-card-button" onClick={create_card}>
            Create
          </button>
        </div>
        <div
          id="add-card"
          onClick={add_card}
          style={{ display: create_card_button_display }}
          ref={add_card_ref}
        >
          + Add card
        </div>
      </div>
    </div>
  );
};

export default List;
