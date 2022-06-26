import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Home Page Comp/Header";
import Body from "./components/Home Page Comp/Body";
import Header2 from "./components/Board Page Comp/Header2";
import styles from "./Boards.css";
import style from "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div className={style} id="container">
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
              <div className={styles} id="container-2">
                <Header2 />
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
