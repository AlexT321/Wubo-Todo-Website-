
const Side_Menu_Button = ({Set_Side_Menu_Visibility}) => {
  const open_side_menu = () => {
    Set_Side_Menu_Visibility("visible");
  }
  return (
    <button id="side-menu-button" onClick={open_side_menu}>-</button>
  )
}

export default Side_Menu_Button