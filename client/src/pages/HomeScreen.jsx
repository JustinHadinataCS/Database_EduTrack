import TotalCard from "../component/TotalCard";
import { useSchool } from "../contexts/SchoolContext";

function HomeScreen() {
  const { totals, attendance } = useSchool();
  return (
    <div className="grid grid-cols-1 gap-4 mt-8 gap-x-6 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* <TotalCard count={totals.totalStudents} label="Total Students" />
      <TotalCard count={totals.totalTeachers} label="Total Teachers" />
      <TotalCard
        count={attendance.percentPresent}
        label="Present Students"
        extra="%"
      />
      <TotalCard
        count={attendance.percentAbsent}
        label="Absent Students"
        extra="%"
      /> */}
    </div>
  );
}

export default HomeScreen;
