/* eslint-disable react/jsx-pascal-case */
import { useState, useRef, forwardRef } from "react";
import Card_Menu from "./Card_Menu";

const Card = forwardRef(({ id, board_index, card_index, name, draggableProps, dragHandleProps }, ref) => {
  const [hover_state, set_hover_state] = useState(false);
  const [edit_button_vis, set_edit_button_vis] = useState("none");
  const [card_menu_vis, set_card_menu_vis] = useState("none");

  const card_menu_ref = useRef(null);
  const edit_button_ref = useRef(null);

  const toggleHover = () => {
    set_hover_state(hover_state ? false : true);
    set_edit_button_vis(hover_state ? "none" : "flex");
  }

  const show_card_menu = () => {
    set_card_menu_vis(card_menu_vis === "none" ? "flex" : "none");
  }
  const handleClickOutside = (e) => {
    if (
      card_menu_ref.current &&
      !card_menu_ref.current.contains(e.target) &&
      !edit_button_ref.current.contains(e.target)
    ) {
      set_card_menu_vis("none");
    }
  }
  document.addEventListener("click", handleClickOutside);

  return (
    <div id="card-container">
      <ul id="card-menu-container" style={{display: card_menu_vis}} ref={card_menu_ref}>
        <Card_Menu id={id} board_index={board_index} card_index={card_index}/>
      </ul>
      <li id="card" ref={ref} {...draggableProps} {...dragHandleProps} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
        {name}
        <button id="edit-card" style={{display: edit_button_vis}} onClick={show_card_menu} ref={edit_button_ref}>=</button>
      </li>
    </div>
  );
});

export default Card;
