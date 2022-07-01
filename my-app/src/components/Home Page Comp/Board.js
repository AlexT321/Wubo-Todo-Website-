import { useNavigate } from "react-router-dom";

const Board = ({ name, unique_id, get_Id}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/${name}`);
    get_Id(unique_id);
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
