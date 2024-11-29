import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Sorry this page does not exist</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}

export default Error;
