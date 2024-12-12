import { useSchool } from "../contexts/SchoolContext";

function Header() {
  const { userData } = useSchool();
  console.log(userData);

  if (!userData || !userData.firstname || !userData.lastname) {
    return (
      <div className="flex bg-[#1d1d1d] text-white gap-y-3 p-4 items-center justify-between">
        <h1 className="text-[#3ECF8E] text-4xl font-light tracking-tighter">
          Dashboard
        </h1>
        <div className="flex items-center">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#1d1d1d] text-white gap-y-3 p-4 items-center justify-between">
      <h1 className="text-[#3ECF8E] text-4xl font-light tracking-tighter">
        Dashboard
      </h1>
      <div className="flex items-center">
        <div className="rounded-full bg-[#3ECF8E] w-8 h-8 mr-2 flex items-center justify-center">
          <span className="text-[#121212] text-sm font-medium">
            {userData.firstname[0]}
            {userData.lastname[0]}
          </span>
        </div>
        <span className="text-[#FFFFFF] text-base font-normal">
          <div className="flex gap-x-1">
            {userData.firstname} {userData.lastname}
            {" | "}
            <span className="text-[#3ECF8E] font-bold">
              {userData.usertype}
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Header;
