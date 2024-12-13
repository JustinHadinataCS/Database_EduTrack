import { useSchool } from "../contexts/SchoolContext";
import StudentCard from "../component/StudentCard"

function MyClass(){
    const { classData } = useSchool();

    return(
        <div className="grid grid-rows-[1fr_4fr] w-full h-full p-10">
            <div className="flex justify-between items-center border-b border-[#3ECF8E]">
                {/* Class name container */}
                <div className="text-5xl text-white">
                    Class {classData.className}
                </div>

                {/* Homeroom teacher container */}
                <div className="flex items-center">
                    <div className="text-white h-full flex flex-col justify-center p-5 text-right">
                        <span className="font-semibold text-2xl">
                            {classData.teacher.firstName} {classData.teacher.lastName}
                        </span>
                        <hr className="w-full border-t border-gray-400 my-2" />
                        <span className="text-gray-300 text-sm">
                            Homeroom Teacher
                        </span>
                    </div>

                    <div className="rounded-full bg-[#3ECF8E] w-24 h-24 mr-2 flex items-center justify-center">
                        <span className="text-[#121212] text-5xl font-bold">
                            {classData.teacher.firstName[0]}
                            {classData.teacher.lastName[0]}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-5 flex flex-wrap gap-12 h-full">
                
                {classData.students ? (
                    classData.students.map((data, index) => (
                    <StudentCard studentData={data} key={index}/>
                    ))
                ) : (
                    <div>No students found.</div>
                )}
            </div>
        </div>
    );
}

export default MyClass;