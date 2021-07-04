import { useAuth } from "@contexts/auth";
import { FC, Fragment } from "react";

import Header from "./header";

const Layout: FC = ({ children }) => {
  const { user } = useAuth();
  return user ? (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  ) : null;
};

export default Layout;
