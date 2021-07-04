import { NextPage } from "next";
import Layout from "@components/layout";
import ProjectLayout from "@components/projectLayout";
// import SecondaryLayout from "@components/layout";

type PageWithMainLayoutType = NextPage & { Layout: typeof Layout };

// type PageWithLayoutType = PageWithMainLayoutType;

// Multiple layouts
type PageWithPostLayoutType = NextPage & { SubLayout: typeof ProjectLayout };
type PageWithLayoutType = PageWithMainLayoutType & PageWithPostLayoutType;

export default PageWithLayoutType;
