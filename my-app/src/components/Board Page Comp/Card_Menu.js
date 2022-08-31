import { User_Context } from "../../App";
import { useContext } from "react";
import CardService from "../../services/cardService";
const Card_Menu = ({ id, board_index, card_index }) => {
  const User = useContext(User_Context);

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
            "j.unique_id": User.single_board_info[0].board_lists[board_index].unique_id,
          }
        ]
      }
    };
    CardService.remove_card_from_list(remove_card_info);
    User.set_single_board_info([
      {
        ...User.single_board_info[0],
        board_lists: [
          ...User.single_board_info[0].board_lists.slice(0, board_index),
          {
            ...User.single_board_info[0].board_lists[board_index],
            cards: User.single_board_info[0].board_lists[board_index].cards
            .filter((_, index) => index !== card_index),
          },
          ...User.single_board_info[0].board_lists.slice(board_index + 1),
        ],
      },
    ]);
  };

  return (
    <div id="card-menu" onClick={delete_card}>
      Delete card
    </div>
  );
};

export default Card_Menu;
