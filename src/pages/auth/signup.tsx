import Head from "next/head";
import { Fragment } from "react";

import SignupScreen from "@components/screens/signup";

const Signup = () => {
  return (
    <Fragment>
      <Head>
        <title>Signup</title>
      </Head>
      <SignupScreen />
    </Fragment>
  );
};

export default Signup;
