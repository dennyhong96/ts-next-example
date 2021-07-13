import { Fragment, FC } from "react";

import { useAuth } from "@contexts/auth";
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
