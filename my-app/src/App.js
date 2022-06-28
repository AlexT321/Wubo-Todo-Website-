import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Home Page Comp/Header";
import Body from "./components/Home Page Comp/Body";
import Header2 from "./components/Board Page Comp/Header2";
import MenuOverlay from "./components/Board Page Comp/menu_overlay";
import ProfileOverlay from "./components/Board Page Comp/profile_overlay";
import BoardHeader2 from "./components/Board Page Comp/header2_2";
import Body2 from "./components/Board Page Comp/Body2";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div id="container">
                <Header />
                <Body />
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/Boards"
          element={
            <div className="App">
              <div id="container-2">
                <Header2 />
                <div id="header2-content-body-container">
                  <MenuOverlay/>
                  <ProfileOverlay/>
                  <BoardHeader2 />
                  <Body2 />
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
