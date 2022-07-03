/* eslint-disable react/jsx-pascal-case */
import Side_Menu_Button from "./Side_Menu_Button";
import Name_of_Board from "./Name_of_Board";
import Favorite_Button from "./Favorite_Button";


const Board_Header_2 = ({ Set_Side_Menu_Visibility}) => {
  
  return (
    <div id="header-2">
      <Side_Menu_Button Set_Side_Menu_Visibility={Set_Side_Menu_Visibility}/>
      <Name_of_Board />
      <Favorite_Button />
    </div>
  );
};

export default Board_Header_2;
