// src/pages/NotFound.tsx

import { Link } from "react-router-dom";


const NotFound = () => {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center">


      <h1 className="text-5xl font-bold">
        404
      </h1>


      <p className="mt-3 text-gray-600">
        Page not found
      </p>


      <Link
        to="/"
        className="mt-5 btn-primary"
      >
        Go Home
      </Link>


    </div>

  );

};


export default NotFound;