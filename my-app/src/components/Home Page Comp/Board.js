import { useNavigate } from "react-router-dom";

const Board = ({ name }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/Boards');
  };
  return (
    <div id="create-board-container">
      <button id="board-created" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default Board;
