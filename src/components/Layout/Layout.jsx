import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Employees</Link>
          </li>
          <li>
            <Link to="/manage">Manage Employees</Link>
          </li>
        </ul>
      </nav> */}

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
