function CourseCard({ courseData}) {
  return (
    <div className="bg-[#282828] grid-item w-56 h-40 flex flex-col rounded-lg justify-between">
      <div className="flex flex-col px-4 mb-5 ">
        <p className="font-semibold mr-5 text-[#3ECF8E] text-2xl border-b border-[#3d3d3d] py-3">
          {courseData.name}
        </p>
        <p className="font-normal mr-5 text-[#FFFFFF] text-base py-2">
          {courseData.teacher_firstname} {courseData.teacher_lastname}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
