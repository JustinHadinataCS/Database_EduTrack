import Header from "./Header";

function RightLeftContainer({ children }) {
  return (
    <div className="flex bg-[#121212] w-5/6 flex-col font-karla">
      <Header />
      {children}
    </div>
  );
}

export default RightLeftContainer;
