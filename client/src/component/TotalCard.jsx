import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CountUp from "react-countup";

function TotalCard({ count, label, extra }) {
  return (
    <div className="bg-[#282828] grid-item w-56 h-40 flex flex-col rounded-lg justify-between">
      <div className="self-end m-2">
        <div className="text-[#FFFFFF]">
          <MoreHorizIcon style={{ fontSize: "40px" }} />
        </div>
      </div>
      <div className="flex flex-col px-4 mb-5">
        <p className="font-semibold mr-5 text-[#3ECF8E] text-5xl">
          <CountUp end={count} duration={2} />
          {extra}
        </p>
        <p className="font-normal mr-5 text-[#FFFFFF] text-base">{label}</p>
      </div>
    </div>
  );
}

export default TotalCard;
