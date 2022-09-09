/* eslint-disable react/jsx-pascal-case */
import Board_Header from "./Board_Header";
import Board_Header_2 from "./Board_Header_2";
import ProfileOverlay from "./ProfileOverlay";
import Side_Menu from "./Side_Menu";
import Board_List from "./Board_List";
import { useState, useRef } from "react";

const Board_Page = (load_board_data) => {
  const [Side_Menu_visibility, set_Side_Menu_Visibility] = useState("");
  const [move_content_to_right, set_move_content_to_right] = useState("0vh");
  const [profile_vis, set_profile_vis] = useState("hidden");
  const profile_ref = useRef();
  return (
    <div className="App">
      <div id="container-2">
        <Board_Header
          load_board_data={load_board_data}
          set_profile_overlay_vis={set_profile_vis}
          profile_vis={profile_vis}
          profile_ref={profile_ref}
        />
        <div id="header2-content-body-container">
          <Side_Menu
            Side_Menu_Visibility={Side_Menu_visibility}
            Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
            set_move_content_to_right={set_move_content_to_right}
            load_board_data={load_board_data}
          />
          <ProfileOverlay profile_vis={profile_vis} profile_ref={profile_ref} />
          <Board_Header_2
            Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
            move_content_to_right={move_content_to_right}
            set_move_content_to_right={set_move_content_to_right}
          />
          <div id="content-body2" style={{ left: move_content_to_right }}>
            <Board_List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board_Page;
