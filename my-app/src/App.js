/* eslint-disable react/jsx-pascal-case */
import "./assets/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState, createContext} from "react";

import Header from "./components/Home Page Comp/Header";
import Create_Buttons from "./components/Home Page Comp/Create_Boards";

import Board_Header from "./components/Board Page Comp/Board_Header";
import Side_Menu from "./components/Board Page Comp/Side_Menu";
import ProfileOverlay from "./components/Board Page Comp/profile_overlay";
import Board_Header_2 from "./components/Board Page Comp/Board_Header_2";
import Create_List from "./components/Board Page Comp/Board_List";

export const Board_Context = createContext();

function App() {
  const API = "http://localhost:5000";
  const [Side_Menu_visibility, set_Side_Menu_Visibility] = useState("");
  const [single_board_data, set_single_board_data] = useState([]);
  const [multiple_board_data, set_multiple_board_data] = useState([]);
  const [move_content_to_right, set_move_content_to_right] = useState("0vh");


  const get_Boards = async (boards, setBoards) => {
    const result = await fetch(API + "/Health-Website");
    const data = await result.json();
    setBoards([]);
    setBoards([...boards, ...data]);
  };

  const create_board = async (update_Information) => {
    try {
      const result = await fetch(API + "/Health-Website", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(update_Information),
      });
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };

  const get_Multiple_Board_Info = async () => {
    const result = await fetch(API + "/Health-Website");
    const data = await result.json();
    return data;
  };

  const update_all_choosen_state = async (update_information) => {
    try {
      const result = await fetch(
        API + "/Health-Website/update_all_choosen_state",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(update_information),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };

  const update_choosen_state = async (board_id) => {
    try {
      const result = await fetch(API + "/Health-Website/update_choosen_state", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(board_id),
      });
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };

  const get_Single_Board = async () => {
    const result = await fetch(API + "/Health-Website/Single_Board");
    const data = await result.json();
    return data;
  };

  const load_board_data = async () => {
    const single_board_data1 = await get_Single_Board();
    const multiple_board_data1 = await get_Multiple_Board_Info();
    set_single_board_data(single_board_data1);
    set_multiple_board_data(multiple_board_data1);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div id="container">
                <Header />
                <div id="content-body">
                  <div id="Your-Boards">Your Boards</div>
                  <div id="Boards-container">
                    <Create_Buttons
                      create_board={create_board}
                      Get_Boards={get_Boards}
                      update_all_choosen_state={update_all_choosen_state}
                      update_choosen_state={update_choosen_state}
                      load_board_data={load_board_data}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/:boardName"
          element={
            <Board_Context.Provider
              value={{
                single_board_info: single_board_data,
                multiple_board_info: multiple_board_data,
                set_single_board_info: set_single_board_data,
                set_multiple_board_info: set_multiple_board_data,
              }}
            >
              <div className="App">
                <div id="container-2">
                  <Board_Header load_board_data={load_board_data} />
                  <div id="header2-content-body-container">
                    <Side_Menu
                      Side_Menu_Visibility={Side_Menu_visibility}
                      Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
                      create_board={create_board}
                      set_move_content_to_right={set_move_content_to_right}
                      update_all_choosen_state={update_all_choosen_state}
                      update_choosen_state={update_choosen_state}
                      load_board_data={load_board_data}
                    />
                    <ProfileOverlay />
                    <Board_Header_2
                      Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
                      move_content_to_right={move_content_to_right}
                      set_move_content_to_right={set_move_content_to_right}
                    />
                    <div id="content-body2" style={{left: move_content_to_right}}>
                      <Create_List />
                    </div>
                  </div>
                </div>
              </div>
            </Board_Context.Provider>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
