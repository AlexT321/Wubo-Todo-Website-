/* eslint-disable react/jsx-pascal-case */
import Main_Header from "./Main_Header";
import Main_Body from "./Main_Body";
const Main_Page = () => {
  return (
    <div className="App">
      <div id="main-container">
        <Main_Header />
        <div id="main-body-container">
          <Main_Body />
        </div>
      </div>
    </div>
  );
};

export default Main_Page;
