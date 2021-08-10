import { render } from "@testing-library/react";
import { FC, Fragment } from "react";

const Providers: FC = ({ children }) => {
  // For providers
  return <Fragment>{children}</Fragment>;
};

const customRender = (ui: any, options = {}) => render(ui, { wrapper: Providers, ...options });

// export * from "@testing-library/react";
export * from "@testing-library/react-hooks";

export { customRender as render };
