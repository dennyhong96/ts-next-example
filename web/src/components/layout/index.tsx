import { FC, Fragment } from "react";

import Header from "./header";

const Layout: FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default Layout;
