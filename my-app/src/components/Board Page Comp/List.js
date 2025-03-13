/* eslint-disable react/jsx-pascal-case */
import { useState, useRef, useContext, forwardRef, useEffect } from "react";
import { User_Context } from "../../App";
import { Droppable, Draggable } from "react-beautiful-dnd";
import List_Menu from "./List_Menu";
import Card from "./Card";
import CardService from "../../services/cardService";

const List = forwardRef(
  ({ id, name, index, draggableProps, handleProps }, ref) => {
    const User = useContext(User_Context);

    const [list_menu_vis, set_list_menu_vis] = useState("none");
    const [create_card_overlay_display, set_card_overlay_display] =
      useState("none");
    const [create_card_button_display, set_card_button_display] =
      useState("flex");
    const [card_name, set_card_name] = useState("");

    const list_menu_ref = useRef(null);
    const functionalities_ref = useRef(null);
    const create_card_ref = useRef(null);
    const add_card_ref = useRef(null);

    const show_list_menu = () => {
      if (list_menu_vis === "none") {
        set_list_menu_vis("flex");
      } else {
        set_list_menu_vis("none");
      }
    };

    const create_card = () => {
      const random_number = Math.floor(Math.random() * 100);
      const card_info = {
        list_id: {
          user_id: User.user_id,
        },
        cards: {
          $push: {
            "boards.$[i].board_lists.$[j].cards": {
              id: "C-" + random_number,
              name: card_name,
              label_visibility: "none",
              label_color: "none",
            },
          },
        },
        filter: {
          arrayFilters: [
            {
              "i.board_id": User.single_board_info[0].board_id,
            },
            {
              "j.unique_id":
                User.single_board_info[0].board_lists[index].unique_id,
            },
          ],
        },
      };
      CardService.create_card(card_info);
      User.set_single_board_info([
        {
          ...User.single_board_info[0],
          board_lists: [
            ...User.single_board_info[0].board_lists.slice(0, index),
            {
              ...User.single_board_info[0].board_lists[index],
              cards: [
                ...User.single_board_info[0].board_lists[index].cards,
                {
                  id: "C-" + random_number,
                  name: card_name,
                  label_visibility: "none",
                  label_color: "none",
                },
              ],
            },
            ...User.single_board_info[0].board_lists.slice(index + 1),
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
      if (
        list_menu_ref.current &&
        !list_menu_ref.current.contains(e.target) &&
        !functionalities_ref.current.contains(e.target)
      ) {
        set_list_menu_vis("none");
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    if (
      User.multiple_board_info.length === 0 ||
      User.single_board_info.length === 0
    ) {
      return <div id="menu-overlay">Loading...</div>;
    }

    return (
      <div ref={ref} {...draggableProps}>
        <ul className="list">
          <div id="list-header-container" {...handleProps}>
            <h2 id="list-name">{name}</h2>
            <button
              id="list-functionalities"
              onClick={show_list_menu}
              ref={functionalities_ref}
            >
              ...
            </button>
            <ul
              id="list-menu-container"
              style={{ display: list_menu_vis }}
              ref={list_menu_ref}
            >
              <List_Menu id={id} list_index={index} />
            </ul>
          </div>
          <Droppable droppableId={id} type="droppableSubItem">
            {(provided) => (
              <div
                className="card-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {User.single_board_info[0].board_lists[index].cards.map(
                  ({ id, name }, card_index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={card_index}>
                        {(provided) => (
                          <Card
                            id={id}
                            board_index={index}
                            card_index={card_index}
                            name={name}
                            draggableProps={{ ...provided.draggableProps }}
                            dragHandleProps={{ ...provided.dragHandleProps }}
                            ref={provided.innerRef}
                          />
                        )}
                      </Draggable>
                    );
                  }
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

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
        </ul>
      </div>
    );
  }
);

export default List;
