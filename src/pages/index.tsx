import { FC, Fragment, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import FullPageLoading from "@components/fullPageLoading";

const Home: FC = () => {
  const { replace } = useRouter();
  useEffect(() => {
    replace("/projects");

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Loading...</title>
      </Head>
      <FullPageLoading />
    </Fragment>
  );
};

(Home as PageWithLayoutType).Layout = Layout;

export default Home;
