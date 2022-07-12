
const Side_Menu_Button = ({Set_Side_Menu_Visibility, set_move_content_to_right}) => {
  const open_side_menu = () => {
    Set_Side_Menu_Visibility("visible");
    set_move_content_to_right("28vh");
  }
  return (
    <button id="side-menu-button" onClick={open_side_menu}>-</button>
  )
}

export default Side_Menu_Button