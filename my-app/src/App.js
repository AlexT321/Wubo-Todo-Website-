/* eslint-disable react/jsx-pascal-case */
import "./assets/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

import Home_Page from "./components/Home Page Comp/Home_Page";

import Board_Page from "./components/Board Page Comp/Board_Page";

import Main_Login from "./components/Login Page Comp/index_files/Main_Login";
import Main_Sign_Up from "./components/Login Page Comp/index_files/Main_Sign_Up";
import Main_Forget_Password from "./components/Login Page Comp/index_files/Main_Forget_Password";

import Main_Page from "./components/Main Page Comp/Main_Page";

import UserService from "./services/userService";


export const User_Context = createContext();

function App() {
  const [single_board_data, set_single_board_data] = useState([]);
  const [multiple_board_data, set_multiple_board_data] = useState([]);
  const [single_user_data, set_single_user_data] = useState([]);
  const [user_id, set_user_id] = useState("");

  const [boards, set_boards] = useState([]);

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
            load_board_data: load_board_data,
            boards: boards,
            set_boards: set_boards,
          }}
        >
          <Routes>
            <Route
              path="/login"
              element={
                <Main_Login/>
              }
            ></Route>
            <Route
              path="/sign-Up"
              element={
                <Main_Sign_Up />
              }
            ></Route>
            <Route
              path="/forgot-password"
              element={
                <Main_Forget_Password/>
              }
            ></Route>
            <Route
              path="/"
              element={
                <Main_Page/>
              }
              ></Route>
            <Route element={<PrivateRoute />}>
              <Route
                path="/home"
                element={
                  <Home_Page/>
                }
              ></Route>
              <Route
                path="/user/:boardName"
                element={
                  <Board_Page/>
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
