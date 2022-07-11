import { useContext, useRef, useEffect } from "react";
import { Board_Id_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Name_of_Board = () => {
  const board_id = useContext(Board_Id_Context);
  const ref = useRef(null);
  const board_name = useRef(null);

  const update_name = async (name) => {
    try {
      const result = await fetch(
        "http://localhost:5000/Health-Website/update_board_name",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(name),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };

  const change_board_name = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (board_name.current.innerText !== board_id.single_board_info[0].name) {
        const update_name_of_board = {
          id: {_id: board_id.single_board_info[0]._id},
          name: {$set: {name: board_name.current.innerText}},
        };
        update_name(update_name_of_board);
        for (let i = 0; i < board_id.multiple_board_info.length; i++) {
          if (board_id.single_board_info[0].name === board_id.multiple_board_info[i].name) {
            board_id.multiple_board_info[i].name = board_name.current.innerText;
          }
        }
        board_id.single_board_info[0].name = board_name.current.innerText;
        board_name.current.blur();
      }
    }
  };

  useEffect(() => {
    if (board_id.single_board_info.length > 0) {
      
    }
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        //set the board name to Health
        if (board_id.single_board_info.length > 0) {
          if (
            board_name.current.innerText !== board_id.single_board_info[0].name
          ) {
            board_name.current.innerText = board_id.single_board_info[0].name;
          }
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board_id]);

  if (
    board_id.multiple_board_info.length === 0 ||
    board_id.single_board_info.length === 0
  ) {
    return <div id="name-of-board">Loading...</div>;
  }

  return (
    <>
      <div id="name-of-board" ref={ref}>
        <span
          ref={board_name}
          id="span-of-name-of-board"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onKeyDown={change_board_name}
          spellCheck={false}
        >
          {board_id.single_board_info[0].name}
        </span>
      </div>
    </>
  );
};

export default Name_of_Board;
