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
  const [board_id_state, set_board_id_state] = useState("");
  const logo_name = () => {
    console.log("hello world");
  };

  const get_Boards = async (boards, setBoards) => {
    const result = await fetch(API + "/Health-Website");
    const data = await result.json();
    setBoards([...boards, ...data]);
  };

  const update_info = async (update_Information) => {
    try {
      const result = await fetch(API + "/Health-Website", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(update_Information),
      });
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };

  const get_Board_Info = async (board_id) => {
    const result = await fetch(API + "/Health-Website?id=" + board_id);
    const data = await result.json();
    console.log(data)
    return data;
  }


  const get_Id = (id) => {
    console.log(id);
    set_board_id_state(id);
    console.log(board_id_state);

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
                      update_Info={update_info}
                      Get_Boards={get_Boards}
                      get_Id={get_Id}
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
            <Board_Id_Context.Provider value={board_id_state}>
              <div className="App">
                <div id="container-2">
                  <Board_Header />
                  <div id="header2-content-body-container">
                    <Side_Menu />
                    <ProfileOverlay />
                    <Board_Header_2 Board_Name_Info={get_Board_Info} />
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
