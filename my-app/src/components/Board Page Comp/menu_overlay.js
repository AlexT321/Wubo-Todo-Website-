const menu_overlay = () => {
  return (
    <div id="menu-overlay">
      <div id="menu-header">
        <div id="menu-board-name">Board Name</div>
        <button id="close-menu-button">-</button>
      </div>
      <div id="home-button">Home</div>
      <div id="menu-header2">
        <div id="your-boards">Your Boards</div>
        <button id="add-board-button">+</button>
      </div>
      <div id="boards-container">
        <div id="board-1">Board Name</div>
      </div>
    </div>
  );
};

export default menu_overlay;
