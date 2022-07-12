import { forwardRef } from "react";

const Add_Board_Button = forwardRef(({ set_add_board_visibility, add_board_ref}, ref) => {


  const onClick = () => {
    set_add_board_visibility("visible");
    setTimeout(() => {
      add_board_ref.current.focus();
    }, 100);
  };


  return (
    <button id="add-board-button" onClick={onClick} ref={ref}>+</button>
  )
});

export default Add_Board_Button