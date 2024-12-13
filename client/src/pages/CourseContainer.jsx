  import CourseCard from "../component/CourseCard";
  import { useSchool } from "../contexts/SchoolContext";

  function CourseContainer() {

    const { courseData } = useSchool();

    return (
      <div className="grid grid-rows-[1fr_4fr] w-full h-full p-10">
        <div className="flex justify-between items-center border-b border-[#3ECF8E] py-8">
            {/* Class name container */}
            <div className="text-5xl text-white">
                Courses
            </div>
        </div>

        <div className="p-5 flex flex-wrap gap-12 h-full">
            
            {courseData ? (
                courseData.map((data, index) => (
                  <CourseCard courseData={data} key={index}/>
                ))
            ) : (
                <div>No courses found.</div>
            )}
        </div>
      </div>
    );
  }

  export default CourseContainer;
