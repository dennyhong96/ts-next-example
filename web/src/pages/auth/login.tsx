import { Fragment } from "react";
import Head from "next/head";

import LoginScreen from "@components/screens/login";

const Login = () => {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <LoginScreen />
    </Fragment>
  );
};

export default Login;
