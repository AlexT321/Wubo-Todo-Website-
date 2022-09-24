import { User_Context } from "../../App";
import { useContext } from "react";
import CardService from "../../services/cardService";
import { useState } from "react";
const Card_Menu = ({
  id,
  board_index,
  card_index,
  set_card_label_vis,
  set_card_label_color,
}) => {
  const User = useContext(User_Context);
  const [label_color_vis, set_label_color_vis] = useState("none");

  const show_label_colors = () => {
    set_label_color_vis(label_color_vis === "none" ? "flex" : "none");
  };

  const turn_label_green = () => {
    set_card_label_vis("flex");
    set_card_label_color("#1ab4a7");
  };

  const turn_label_red = () => {
    set_card_label_vis("flex");
    set_card_label_color("#d60b0b");
  };

  const turn_label_yellow = () => {
    set_card_label_vis("flex");
    set_card_label_color("#f1e313");
  };

  const reset_label_colors = () => {
    set_card_label_vis("none");
    set_card_label_color("none");
  };

  const delete_card = () => {
    const remove_card_info = {
      list_id: {
        user_id: User.user_id,
      },
      cards: {
        $pull: { "boards.$[i].board_lists.$[j].cards": { id: id } },
      },
      filter: {
        arrayFilters: [
          {
            "i.board_id": User.single_board_info[0].board_id,
          },
          {
            "j.unique_id":
              User.single_board_info[0].board_lists[board_index].unique_id,
          },
        ],
      },
    };
    CardService.remove_card_from_list(remove_card_info);
    User.set_single_board_info([
      {
        ...User.single_board_info[0],
        board_lists: [
          ...User.single_board_info[0].board_lists.slice(0, board_index),
          {
            ...User.single_board_info[0].board_lists[board_index],
            cards: User.single_board_info[0].board_lists[
              board_index
            ].cards.filter((_, index) => index !== card_index),
          },
          ...User.single_board_info[0].board_lists.slice(board_index + 1),
        ],
      },
    ]);
  };

  return (
    <>
      <li className="card-menu-options" id="label-card-menu" onClick={show_label_colors}>
        Label
      </li>
      <li id="label-options" style={{ display: label_color_vis }}>
        <button
          className="label-colors"
          id="label-green"
          onClick={turn_label_green}
        ></button>
        <button
          className="label-colors"
          id="label-yellow"
          onClick={turn_label_yellow}
        ></button>
        <button
          className="label-colors"
          id="label-red"
          onClick={turn_label_red}
        ></button>
        <button
          className="label-colors"
          id="label-reset"
          onClick={reset_label_colors}
        ></button>
      </li>
      <li className="card-menu-options" id="delete-card-menu" onClick={delete_card}>
        Delete card
      </li>
    </>
  );
};

export default Card_Menu;
