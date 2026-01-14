import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page404">
      <h1>404</h1>
      <p>Oops! This page doesn't exist.</p>
      <p className="japanese">ページが見つかりません</p>
      <Link to="/" className="home-link">
        ← Back to Home
      </Link>
    </div>
  );
};

export default Page404;
