import Header from "./Header";


function RightLeftContainer({ children }) {
  return (
    
    <div className="flex bg-[#121212] w-5/6 flex-col font-karla">
      <div className="fixed top-0 left-[16.67%] right-0 h-[70px]">
        <Header />
      </div>

      <div className="mt-[70px] h-[calc(100vh-70px)] overflow-y-auto">
        {children}
      </div>
    </div>

  );
}

export default RightLeftContainer;
