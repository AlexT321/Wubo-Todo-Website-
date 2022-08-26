/* eslint-disable react/jsx-pascal-case */
import "./assets/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

import Header from "./components/Home Page Comp/Header";
import Create_Boards from "./components/Home Page Comp/Create_Boards";

import Board_Header from "./components/Board Page Comp/Board_Header";
import Side_Menu from "./components/Board Page Comp/Side_Menu";
import ProfileOverlay from "./components/Board Page Comp/profile_overlay";
import Board_Header_2 from "./components/Board Page Comp/Board_Header_2";
import Board_List from "./components/Board Page Comp/Board_List";

import Login from "./components/Login Page Comp/Login";
import Sign_Up from "./components/Login Page Comp/Sign_Up";
import ForgotPassword from "./components/Login Page Comp/ForgotPassword";

import UserService from "./services/userService";


export const User_Context = createContext();

function App() {
  const [Side_Menu_visibility, set_Side_Menu_Visibility] = useState("");
  const [single_board_data, set_single_board_data] = useState([]);
  const [multiple_board_data, set_multiple_board_data] = useState([]);
  const [single_user_data, set_single_user_data] = useState([]);
  const [move_content_to_right, set_move_content_to_right] = useState("0vh");
  const [user_id, set_user_id] = useState("");

  const [boards, set_boards] = useState();

  const load_board_data = async () => {
    const user = {
      user_id: {user_id: user_id},
    };
    const user_data = await UserService.loadUserData(user);
    if (user_id !== "") {
      set_single_board_data(user_data[0].boards.filter((boards) => boards.choosen === true));
      set_single_user_data(user_data);
      set_multiple_board_data(user_data[0].boards);
      set_boards(user_data[0].boards);
    }
  };

  return (
    <Router>
      <AuthProvider>
        <User_Context.Provider
          value={{
            user_id: user_id,
            set_user_id: set_user_id,
            single_user_info: single_user_data,
            set_single_user_info: set_single_user_data,
            single_board_info: single_board_data,
            multiple_board_info: multiple_board_data,
            set_single_board_info: set_single_board_data,
            set_multiple_board_info: set_multiple_board_data,
          }}
        >
          <Routes>
            <Route
              path="/login"
              element={
                <div className="App">
                  <div id="login-container">
                    <Login />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/sign-Up"
              element={
                <div className="App">
                  <div id="login-container">
                    <Sign_Up />
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/forgot-password"
              element={
                <div className="App">
                  <div id="login-container">
                    <ForgotPassword />
                  </div>
                </div>
              }
            ></Route>
            <Route element={<PrivateRoute />}>
              <Route
                exact
                path="/"
                element={
                  <div className="App">
                    <div id="container">
                      <Header />
                      <div id="content-body">
                        <div id="Boards-container">
                          <Create_Boards
                            load_board_data={load_board_data}
                            boards={boards}
                            set_boards={set_boards}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                }
              ></Route>
              <Route
                path="/user/:boardName"
                element={
                  <div className="App">
                    <div id="container-2">
                      <Board_Header load_board_data={load_board_data} />
                      <div id="header2-content-body-container">
                        <Side_Menu
                          Side_Menu_Visibility={Side_Menu_visibility}
                          Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
                          set_move_content_to_right={set_move_content_to_right}
                          load_board_data={load_board_data}
                        />
                        <ProfileOverlay />
                        <Board_Header_2
                          Set_Side_Menu_Visibility={set_Side_Menu_Visibility}
                          move_content_to_right={move_content_to_right}
                          set_move_content_to_right={set_move_content_to_right}
                        />
                        <div
                          id="content-body2"
                          style={{ left: move_content_to_right }}
                        >
                          <Board_List />
                        </div>
                      </div>
                    </div>
                  </div>
                }
              ></Route>
            </Route>
          </Routes>
        </User_Context.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
