import { useContext, useState, useEffect } from "react";
import { Board_Id_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Favorite_Button = () => {
  const board_id = useContext(Board_Id_Context);
  const [is_active, set_is_active] = useState("rgba(255, 255, 255, 1)");

  const update_favorite = async (board_info) => {
    try {
      const result = await fetch(
        "http://localhost:5000/Health-Website/update_favorite_state",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(board_info),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  }

  const onClick = () => {
    if (is_active === "rgba(255, 255, 255, 1)") {
      update_favorite({ id: {_id: board_id.single_board_info[0]._id}, favorite: {$set: {favorite: true}}});
    } else {
      update_favorite({ id: {_id: board_id.single_board_info[0]._id}, favorite: {$set: {favorite: false}}});
    }
    set_is_active(
      is_active === "rgba(255, 196, 0, 1)"
        ? "rgba(255, 255, 255, 1)"
        : "rgba(255, 196, 0, 1)"
    );
    for (let i = 0; i < board_id.multiple_board_info.length; i++) {
      if (board_id.single_board_info[0]._id === board_id.multiple_board_info[i]._id) {
        board_id.multiple_board_info[i].favorite = board_id.multiple_board_info[i].favorite ? false: true;
      }
    }
    board_id.set_single_board_info([{...board_id.single_board_info[0], favorite: !board_id.single_board_info[0].favorite}]);
    //board_id.single_board_info[0].favorite = board_id.single_board_info[0].favorite ? false : true;

    board_id.multiple_board_info.sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1;
      } else if (!a.favorite && b.favorite) {
        return 1;
      } else {
        return 0;
      }
    });
    
  };

  useEffect(() => {
    if (board_id.single_board_info.length > 0) {
      if (board_id.single_board_info[0].favorite) {
        set_is_active("rgba(255, 196, 0, 1)");
      } else {
        set_is_active("rgba(255, 255, 255, 1)");
      }
    }
  }, [board_id]);

  return (
    <button id="favorite-button" onClick={onClick} style={{ color: is_active }}>
      F
    </button>
  );
};

export default Favorite_Button;
