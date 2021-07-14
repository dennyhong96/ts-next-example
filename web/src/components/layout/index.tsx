import { useAuth } from "@contexts/auth";
import { Fragment, ReactNode } from "react";

import Header from "./header";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  ) : null;
};

export default Layout;
