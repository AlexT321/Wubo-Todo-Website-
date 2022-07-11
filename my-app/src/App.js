/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {useState} from "react";
import Header from "./components/Home Page Comp/Header";
import Create_Buttons from "./components/Home Page Comp/Create_Buttons";

import Board_Header from "./components/Board Page Comp/Board_Header";
import Side_Menu from "./components/Board Page Comp/Side_Menu";
import ProfileOverlay from "./components/Board Page Comp/profile_overlay";
import Board_Header_2 from "./components/Board Page Comp/Board_Header_2";
import Create_List from "./components/Board Page Comp/Create_List";
import Create_List_Input from "./components/Board Page Comp/Create_List_Input";
import Create_List_Button from "./components/Board Page Comp/Create_List_Button";
import List_Board_Name from "./components/Board Page Comp/List_Board_Name";
import List_Board_Options from "./components/Board Page Comp/List_Board_Options";
import Add_Card from "./components/Board Page Comp/Add_Card";

export const Board_Id_Context = React.createContext();

function App() {
  const API = "http://localhost:5000";
  const [Side_Menu_visibility, set_Side_Menu_Visibility] = useState("");
  const [single_board_data, set_single_board_data] = useState([]);
  const [multiple_board_data, set_multiple_board_data] = useState([]);

  const logo_name = () => {
    console.log("hello world");
  };

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
                <Header logo_name={logo_name} />
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
            <Board_Id_Context.Provider
              value={{
                single_board_info: single_board_data,
                multiple_board_info: multiple_board_data,
              }}
            >
              <div className="App">
                <div id="container-2">
                  <Board_Header load_board_data={load_board_data} />
                  <div id="header2-content-body-container">
                    <Side_Menu
                      Side_Menu_Visibility={Side_Menu_visibility}
                      Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
                    />
                    <ProfileOverlay />
                    <Board_Header_2
                      Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
                    />
                    <div id="content-body2">
                      <Create_List />
                      <div id="create-list-overlay">
                        <Create_List_Input />
                        <Create_List_Button />
                      </div>
                      <div id="board">
                        <div id="board-header-container">
                          <List_Board_Name />
                          <List_Board_Options />
                        </div>
                        <Add_Card />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Board_Id_Context.Provider>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
