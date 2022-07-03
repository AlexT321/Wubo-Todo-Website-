
const Close_Menu_Button = ({Set_Side_Menu_Visibility}) => {
  const close_menu = () => {
    Set_Side_Menu_Visibility("hidden");
  }
  return (
    <button id="close-menu-button" onClick={close_menu}>-</button>
  )
}

export default Close_Menu_Button