import { useNavigate } from "react-router-dom";

const Board = ({ name, unique_id }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/${name}`);
    console.log({ name, unique_id });
  };
  return (
    <div id="create-board-container">
      <button className="board-button" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default Board;
