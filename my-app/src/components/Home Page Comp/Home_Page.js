/* eslint-disable react/jsx-pascal-case */
import Header from "./Header";
import Create_Boards from "./Create_Boards";

const Home_Page = () => {
  return (
    <div className="App">
      <div id="container">
        <Header />
        <div id="content-body">
          <div id="Boards-container">
            <Create_Boards
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Page;
