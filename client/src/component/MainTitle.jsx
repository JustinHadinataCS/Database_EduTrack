import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { useNavigate } from "react-router-dom";
import { useSchool } from "../contexts/SchoolContext";

function MainTitle({ onClick, setIndicatorStyle }) {
  const { userData } = useSchool();
  const navigate = useNavigate();
  function handleButton(e) {
    e.preventDefault();
    navigate("/dashboard");
    onClick();
    setIndicatorStyle();
  }
  console.log(userData);
  return (
    <div
      onClick={handleButton}
      className="text-4xl font-roboto font-extralight cursor-pointer text-[#3ECF8E] p-7"
    >
      <SquareFootIcon style={{ fontSize: "50px" }} />
      <p>EduTrack</p>
    </div>
  );
}

export default MainTitle;
