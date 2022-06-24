import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Home Page Comp/Header';
import Body from './components/Home Page Comp/Body';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element = {
            <div className="App">
              <Header />
              <Body />
            </div>
          }>
        </Route>
        <Route path="/Boards"></Route>
      </Routes>
    </Router>
  );
}

export default App;
