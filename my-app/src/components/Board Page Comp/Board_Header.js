/* eslint-disable react/jsx-pascal-case */
import Logo2 from "./logo2";
import Logo_Name2 from "./logo_name2";
import Profile_Pic2 from "./profile_pic2";
import {useContext} from "react";
import {Board_Id_Context} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App"


const Board_Header = () => {
  const board_id = useContext(Board_Id_Context);
  const check_id = () => {
    console.log(board_id);
  }
  return (
    <div id="Board-header">
      <div id="logo-container-2">
        <Logo2 check_id={check_id}/>
        <Logo_Name2 />
      </div>
      <div id="profile-container-2">
        <Profile_Pic2 />
      </div>
    </div>
  );
};

export default Board_Header;
