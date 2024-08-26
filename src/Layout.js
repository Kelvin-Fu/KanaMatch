import { Outlet, Link } from "react-router-dom";
import React from "react";
import Footer from "./components/Footer";
const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Kana Match</Link>
          </li>
          <li>
            <Link to="/about">More</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
