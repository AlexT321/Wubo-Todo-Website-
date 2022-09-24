/* eslint-disable react/jsx-pascal-case */
import Board_Header from "./Board_Header";
import Board_Header_2 from "./Board_Header_2";
import ProfileOverlay from "./ProfileOverlay";
import Side_Menu from "./Side_Menu";
import Board_List from "./Board_List";
import { useState, useRef, useContext, useEffect } from "react";
import { User_Context } from "../../App";

const Board_Page = (load_board_data) => {
  const [Side_Menu_visibility, set_Side_Menu_Visibility] = useState("hidden");
  const [move_content_to_right, set_move_content_to_right] = useState("0vh");
  const [profile_vis, set_profile_vis] = useState("hidden");
  const profile_ref = useRef();
  const [background_img, set_background_img] = useState();

  const [side_menu_animation, set_side_menu_animation] = useState("none");
  const [content_body_animation, set_content_body_animation] = useState("none");

  const [profile_animation, set_profile_animation] = useState("none");
  const [profile_content_vis, set_profile_content_vis] = useState("hidden");

  const User = useContext(User_Context);

  const content_animation = () => {
    set_move_content_to_right(move_content_to_right === "0vh" ? "28vh" : "0vh");
    set_Side_Menu_Visibility(
      Side_Menu_visibility === "visible" ? "hidden" : "visible"
    );
  };

  useEffect(() => {
    if (User.single_board_info.length > 0) {
      set_background_img(
        require(`../../assets/board_background_images/${User.single_board_info[0].board_background_img}.webp`)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.multiple_board_info]);

  return (
    <div className="App">
      <div
        id="container-2"
        style={{ backgroundImage: `url(${background_img})` }}
        loading="lazy"
      >
        <Board_Header
          set_profile_overlay_vis={set_profile_vis}
          profile_ref={profile_ref}
          profile_animation={profile_animation}
          set_profile_animation={set_profile_animation}
          profile_content_vis={profile_content_vis}
          set_profile_content_vis={set_profile_content_vis}
        />
        <div id="header2-content-body-container">
          <Side_Menu
            Side_Menu_Visibility={Side_Menu_visibility}
            load_board_data={load_board_data}
            side_menu_animation={side_menu_animation}
            set_side_menu_animation={set_side_menu_animation}
            set_content_body_animation={set_content_body_animation}
          />
          <ProfileOverlay
            profile_vis={profile_vis}
            set_profile_overlay_vis={set_profile_vis}
            profile_ref={profile_ref}
            profile_animation={profile_animation}
            set_profile_animation={set_profile_animation}
            profile_content_vis={profile_content_vis}
          />
          <Board_Header_2
            side_Menu_Visibility={Side_Menu_visibility}
            move_content_to_right={move_content_to_right}
            set_side_menu_animation={set_side_menu_animation}
            content_body_animation={content_body_animation}
            set_content_body_animation={set_content_body_animation}
          />
          <div
            id="content-body2"
            style={{
              left: move_content_to_right,
              animation: content_body_animation,
            }}
            onAnimationEnd={content_animation}
          >
            <Board_List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board_Page;
