function SessionDetail(sessionNumber, attendanceStatus) {
  return (
    <div className="flex text-white px-5 justify-between py-2 gap-x-5 w-2/12">
      <p>{sessionNumber}</p>
      <div className="flex justify-start">
        <p>{attendanceStatus}</p>
      </div>
    </div>
  );
}

export default SessionDetail;
