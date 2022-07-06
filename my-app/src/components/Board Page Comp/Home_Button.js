import { useNavigate } from "react-router-dom";

const Home_Button = () => {
  const navigate = useNavigate();
  const Home = () => {
    navigate("/");
  }
  return (
    <div id="home-button" onClick={Home}>Home</div>
  )
}

export default Home_Button