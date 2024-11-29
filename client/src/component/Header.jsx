function Header() {
  return (
    <div className="flex bg-[#1d1d1d] text-white gap-y-3 p-4 items-center justify-between">
      <h1 className="text-[#3ECF8E] text-4xl font-light tracking-tighter">
        Dashboard
      </h1>
      <div className="flex items-center">
        <div className="rounded-full  bg-[#3ECF8E] w-8 h-8 mr-2 flex items-center justify-center">
          <span className="text-[#121212] text-sm font-medium">JA</span>
        </div>
        <span className="text-[#FFFFFF] text-base font-normal">
          <div className="flex gap-x-1">
            {" "}
            Justin <span className="text-[#3ECF8E] font-bold">Admin</span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Header;
