/* eslint-disable react/jsx-pascal-case */
import Side_Menu_Button from "./Side_Menu_Button";
import Name_of_Board from "./Name_of_Board";
import Favorite_Button from "./Favorite_Button";
import {useContext} from "react";
import {Board_Id_Context} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";


const Board_Header_2 = ({Board_Name_Info}) => {
  return (
    <div id="header-2">
      <Side_Menu_Button />
      <Name_of_Board Board_Name_Info={Board_Name_Info}/>
      <Favorite_Button />
    </div>
  );
};

export default Board_Header_2;
