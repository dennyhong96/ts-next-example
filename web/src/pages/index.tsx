import { FC } from "react";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import useDocumentTitle from "@hooks/useDocumentTitle";
import Layout from "@components/layout";
import ProjectsScreen from "@components/screens/projects";

const Home: FC = () => {
  useDocumentTitle("Project list", false);
  return <ProjectsScreen />;
};

(Home as PageWithLayoutType).Layout = Layout;

export default Home;
