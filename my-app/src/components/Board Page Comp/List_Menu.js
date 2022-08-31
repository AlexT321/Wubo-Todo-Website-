import { User_Context } from "../../App";
import { useContext} from "react";
import ListService from "../../services/listService";

const List_Menu = ({id, list_index}) => {
    const User = useContext(User_Context);

    const delete_list = () => {
      const list_info = {
        list_id: {
          user_id: User.user_id,
          "boards.board_id":
            User.single_board_info[0].board_id,
        },
        lists: {
          $pull: { "boards.$.board_lists": { unique_id: id } },
        },
      };
      ListService.remove_list_from_board(list_info);
        User.set_single_board_info([{
            ...User.single_board_info[0],
            board_lists: User.single_board_info[0].board_lists.filter((_, index) => index !== list_index)
        }]);
    }
  return (
    <li id="delete-list" onClick={delete_list}>Delete list</li>
  );
};

export default List_Menu;
