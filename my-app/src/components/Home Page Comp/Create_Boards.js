import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Boards from "./Board";
import { User_Context } from "../../App";
import { useAuth } from "../../context/AuthContext";

import BoardService from "../../services/boardService";

const Create_Board_Button = () => {
  const { currentUser, logout } = useAuth();
  const User = useContext(User_Context);
  const navigate = useNavigate();

  const ref = useRef(null);

  const [board_title, set_board_title] = useState("Your Boards");

  const [visibilityState_cb_btn, setVisibilityState] = useState("visible");
  const [visibilityState_cb_input, setVisibilityState_input] =
    useState("hidden");

  const onClick = () => {
    setVisibilityState(
      visibilityState_cb_btn === "visible" ? "hidden" : "visible"
    );
    setVisibilityState_input(
      visibilityState_cb_input === "hidden" ? "visible" : "hidden"
    );
  };

  const [board_name, setBoard_name] = useState("");

  const show_boards = () => {
    set_board_title("Your Boards");
    User.set_boards(User.multiple_board_info);
  };

  const show_favorite_boards = () => {
    set_board_title("Favorite Boards");
    User.set_boards(
      User.multiple_board_info.filter((boards) => boards.favorite === true)
    );
  };

  const log_out = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const create_boards = () => {
    setVisibilityState_input("hidden");
    setVisibilityState("visible");

    const random_number = Math.floor(Math.random() * 100);

    const board_info = {
      id: { user_id: currentUser.uid },
      board_info: {
        $push: {
          boards: {
            board_id: "B" + random_number,
            name: board_name,
            board_background_img: `img${User.multiple_board_info.length + 1}`,
            choosen: false,
            favorite: false,
            board_lists: [],
            date: new Date(),
          },
        },
      },
    };

    BoardService.create_board(board_info);
    setBoard_name("");
    User.set_multiple_board_info([
      ...User.multiple_board_info,
      {
        board_id: "B" + random_number,
        name: board_name,
        board_background_img: `img${User.multiple_board_info.length + 1}`,
        choosen: false,
        favorite: false,
        board_lists: [],
        date: new Date(),
      },
    ]);
    User.load_board_data();
  };

  User.multiple_board_info.sort((a, b) => {
    if (a.favorite && !b.favorite) {
      return -1;
    } else if (!a.favorite && b.favorite) {
      return 1;
    } else {
      return 0;
    }
  });

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisibilityState("visible");
      setVisibilityState_input("hidden");
    }
  };
  document.addEventListener("click", handleClickOutside);

  useEffect(() => {
    User.set_user_id(currentUser.uid);
    User.load_board_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.user_id]);

  if (
    User.boards.length === undefined 
  ) {
    return <div id="menu-overlay">Loading...</div>;
  }

  return (
    <>
      <div id="side-content-container">
        <button
          className="main-content-buttons"
          id="boards-button"
          onClick={show_boards}
        >
          Boards
        </button>
        <button
          className="main-content-buttons"
          id="favortie-button"
          onClick={show_favorite_boards}
        >
          Favorites
        </button>
        <button
          className="main-content-buttons"
          id="log-out-button"
          onClick={log_out}
        >
          Log out
        </button>
      </div>
      <div>
        <div id="main-content-container">
          <div id="boards-title">{board_title}</div>

          <div id="boards-container-2">
            {User.boards.map((board, index) => {
              return (
                <Boards
                  name={board.name}
                  key={index}
                  unique_id={board.board_id}
                  img={board.board_background_img}
                />
              );
            })}
            <div ref={ref} id="create-board-container">
              <button
                className="content-buttons"
                id="create-board"
                onClick={onClick}
                style={{ visibility: visibilityState_cb_btn }}
              >
                + create board
              </button>
              <div
                id="create-board-overlay"
                style={{ visibility: visibilityState_cb_input }}
              >
                <input
                  className="create-board"
                  type="text"
                  placeholder="Name"
                  value={board_name}
                  onChange={(e) => setBoard_name(e.target.value)}
                />
                <button
                  className="content-buttons"
                  id="create-board-button"
                  onClick={create_boards}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Create_Board_Button.defaultProps = {
  visibilityState: "visible",
};

export default Create_Board_Button;
