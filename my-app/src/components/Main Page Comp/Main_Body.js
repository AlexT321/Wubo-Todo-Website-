import { useNavigate } from "react-router-dom";


const Main_Body = () => {
  const navigate = useNavigate();
  const go_to_create_account_page = () => {
    navigate("/sign-up");
  }
  
  return (
    <div id="main-body">
      <div id="content-container">
        <div id="main-text-container">
          <div id="main-text">
            <h1 id="main-title">A new way to organize your life</h1>
            <h2 id="main-description">Manage your projects and organize your life by creating a schedule or making a list of all your tasks for the day.</h2>
          </div>
          <div id="create-account-container-2">
            <h3 id="create-account-header">Get started by creating an acocunt</h3>
            <button id="create-account" onClick={go_to_create_account_page}>Create account</button>
          </div>
        </div>
        <div id="main-picture-container">
          <img src={require("../../assets/main_image.png")} alt="main" loading="lazy"/>
        </div>
      </div>
    </div>
  )
}

export default Main_Body