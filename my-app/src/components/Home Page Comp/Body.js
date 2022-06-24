const Body = () => {
  return (
    <div id="content-body">
      <div id="Your-Boards">Your Boards</div>
      <div id="Boards-container">
        <div id="create-board-container">
          <div id="create-board-overlay">
            <input className="create-board" type="text" placeholder="Name" />
            <button id="create-board-button">Create</button>
          </div>
          <div id="create-board">+ Create Board</div>
        </div>
      </div>
    </div>
  );
};

export default Body;
