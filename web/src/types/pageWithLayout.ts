import { NextPage } from "next";
import Layout from "@components/layout";
// import SecondaryLayout from "@components/layout";

type PageWithMainLayoutType = NextPage & { Layout: typeof Layout };

// Multiple layouts
// type PageWithPostLayoutType = NextPage & { layout: typeof SecondaryLayout };
// type PageWithLayoutType = PageWithMainLayoutType | PageWithPostLayoutType;

type PageWithLayoutType = PageWithMainLayoutType;

export default PageWithLayoutType;
