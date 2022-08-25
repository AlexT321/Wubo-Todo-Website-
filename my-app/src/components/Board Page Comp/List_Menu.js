import { User_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";
import { useContext} from "react";

const List_Menu = ({id, list_index}) => {
    const User = useContext(User_Context);
    
    const remove_list_from_board = async (body) => {
      try {
        const result = await fetch(
          "http://localhost:5000/Health-Website/remove_list_from_board",
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
      remove_list_from_board(list_info);
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
