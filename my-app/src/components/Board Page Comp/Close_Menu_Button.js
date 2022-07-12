
const Close_Menu_Button = ({Set_Side_Menu_Visibility, set_add_board_visibility, set_move_content_to_right}) => {
  const close_menu = () => {
    Set_Side_Menu_Visibility("hidden");
    set_add_board_visibility("hidden");
    set_move_content_to_right("0vh");
  }
  return (
    <button id="close-menu-button" onClick={close_menu}>-</button>
  )
}

export default Close_Menu_Button