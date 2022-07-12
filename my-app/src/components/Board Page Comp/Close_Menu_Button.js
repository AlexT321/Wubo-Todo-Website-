
const Close_Menu_Button = ({Set_Side_Menu_Visibility, set_add_board_visibility}) => {
  const close_menu = () => {
    Set_Side_Menu_Visibility("hidden");
    set_add_board_visibility("hidden");
  }
  return (
    <button id="close-menu-button" onClick={close_menu}>-</button>
  )
}

export default Close_Menu_Button