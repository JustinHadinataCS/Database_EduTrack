function SideItem({ icon, context, isActive, onClick, itemRef }) {
  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`
        flex gap-x-4 transition-all hover:text-[#3ECF8E] duration-100 cursor-pointer p-3 ml-2 ${
          isActive ? "text-[#3ECF8E] " : ""
        }`}
    >
      {icon}
      <p>{context}</p>
    </div>
  );
}

export default SideItem;
