const Body2 = () => {
  return (
    <div id="content-body2">
      <div id="create-list">+ create list</div>
      <div id="create-list-overlay">
        <input
          class="create-list-input"
          type="text"
          placeholder="Enter list title"
        />
        <button id="create-list-button">Create</button>
      </div>
      <div id="board">
        <div id="board-header-container">
          <div id="board-name">Board Title</div>
          <button id="board-functionalities">...</button>
        </div>
        <div id="add-card">+ Add card</div>
      </div>
    </div>
  );
};

export default Body2;
