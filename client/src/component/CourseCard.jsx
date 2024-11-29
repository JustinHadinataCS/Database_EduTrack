import ScienceIcon from "@mui/icons-material/Science";

function CourseCard({ courseName, courseId }) {
  return (
    <div className="bg-[#282828] grid-item w-56 h-40 flex flex-col rounded-lg justify-between">
      <div className="self-end m-2">
        <div className="text-[#FFFFFF]">
          <ScienceIcon style={{ fontSize: "40px", color: "#3ECF8E" }} />
        </div>
      </div>
      <div className="flex flex-col px-4 mb-5 ">
        <p className="font-semibold mr-5 text-[#3ECF8E] text-2xl">
          {courseName}
        </p>
        <p className="font-normal mr-5 text-[#FFFFFF] text-base">
          Course ID: {courseId}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
