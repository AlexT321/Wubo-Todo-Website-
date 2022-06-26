const Create_Button = ({input_title, create_button_title, visibilityState}) => {
  return (
    <div id="create-board-overlay" style={{visibility: visibilityState}}>
      <input className="create-board" type="text" placeholder={input_title} />
      <button id="create-board-button">{create_button_title}</button>
    </div>
  );
};

Create_Button.defaultProps = {
  visibilityState: "hidden"
}
export default Create_Button;
