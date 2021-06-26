import { useEffect, FC } from "react";
import { useRouter } from "next/router";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import { useAuth } from "@contexts/auth";
import Layout from "@components/layout";
import ProjectsScreen from "@components/screens/projects";

const Home: FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  return <ProjectsScreen />;
};

(Home as PageWithLayoutType).Layout = Layout;

export default Home;
