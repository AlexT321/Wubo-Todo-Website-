/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Website_logo from "./components/Home Page Comp/logo";
import Logo_Name from "./components/Home Page Comp/logo_name";
import Profile_Pic from "./components/Home Page Comp/profile_pic";
import Create_Buttons from "./components/Home Page Comp/Create_Buttons";

import Logo2 from "./components/Board Page Comp/logo2";
import Logo_Name2 from "./components/Board Page Comp/logo_name2";
import Profile_Pic2 from "./components/Board Page Comp/profile_pic2";
import Menu_Board_Name from "./components/Board Page Comp/Menu_Board_Name";
import Close_Menu_Button from "./components/Board Page Comp/Close_Menu_Button";
import Home_Button from "./components/Board Page Comp/Home_Button";
import Add_Board_Button from "./components/Board Page Comp/Add_Board_Button";
import Menu_Boards from "./components/Board Page Comp/Menu_Boards";
import ProfileOverlay from "./components/Board Page Comp/profile_overlay";
import Side_Menu_Button from "./components/Board Page Comp/Side_Menu_Button";
import Name_of_Board from "./components/Board Page Comp/Name_of_Board";
import Favorite_Button from "./components/Board Page Comp/Favorite_Button";
import Create_List from "./components/Board Page Comp/Create_List";
import Create_List_Input from "./components/Board Page Comp/Create_List_Input";
import Create_List_Button from "./components/Board Page Comp/Create_List_Button";
import List_Board_Name from "./components/Board Page Comp/List_Board_Name";
import List_Board_Options from "./components/Board Page Comp/List_Board_Options";
import Add_Card from "./components/Board Page Comp/Add_Card";

function App() {
  const logo_name = () => {
    console.log("hello world");
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div id="container">
                <div id="header">
                  <div id="logo-container">
                    <Website_logo />
                    <Logo_Name logo_clicked={logo_name} />
                  </div>
                  <div id="profile-container">
                    <Profile_Pic />
                  </div>
                </div>
                <div id="content-body">
                  <div id="Your-Boards">Your Boards</div>
                  <div id="Boards-container">
                    <Create_Buttons />
                  </div>
                </div>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/:boardName"
          element={
            <div className="App">
              <div id="container-2">
                <div id="Board-header">
                  <div id="logo-container-2">
                    <Logo2 />
                    <Logo_Name2 />
                  </div>
                  <div id="profile-container-2">
                    <Profile_Pic2 />
                  </div>
                </div>
                <div id="header2-content-body-container">
                  <div id="menu-overlay">
                    <div id="menu-header">
                      <Menu_Board_Name />
                      <Close_Menu_Button />
                    </div>
                    <Home_Button />
                    <div id="menu-header2">
                      <div id="your-boards">Your Boards</div>
                      <Add_Board_Button />
                    </div>
                    <div id="boards-container">
                      <Menu_Boards />
                    </div>
                  </div>
                  <ProfileOverlay />
                  <div id="header-2">
                    <Side_Menu_Button />
                    <Name_of_Board />
                    <Favorite_Button />
                  </div>
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
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
