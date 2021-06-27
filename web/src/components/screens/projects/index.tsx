import React, { useState, useEffect, FC } from "react";
import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import { Box, Heading } from "@chakra-ui/react";

import { db } from "@lib/firebase";
import useMount from "@hooks/useMount";
import useDebounce from "@hooks/useDebounce";
import SearchPanel from "./components/search-panel";
import List from "./components/list";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IProject {
  id: string;
  name: string;
  organization: string;
  personId: string;
  created: string;
}

const ProjectsScreen: FC = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState<IProject[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  useMount(async () => {
    const snapshots = await db.collection("users").get();
    const items: IUser[] = [];
    snapshots.forEach((doc) => {
      items.push({ id: doc.id, ...(doc.data() as { name: string; email: string }) });
    });
    setUsers(items);
  });

  const debouncedParam = useDebounce(param, 200);

  useEffect(() => {
    (async () => {
      type projectRefType = CollectionReference<DocumentData> | Query<DocumentData>;

      let projectsRef: projectRefType = db.collection("projects");

      if (debouncedParam.personId) {
        projectsRef = projectsRef.where("personId", "==", debouncedParam.personId);
      }

      if (debouncedParam.name) {
        projectsRef = projectsRef.where("name", "==", debouncedParam.name);
      }

      const snapshots = await projectsRef.get();

      const items: IProject[] = [];

      snapshots.forEach((doc) => {
        const data = doc.data();
        const created = data.created.toDate().toISOString();
        items.push({ ...(data as Omit<IProject, "id" | "created">), id: doc.id, created });
      });

      setList(items);
    })();
  }, [debouncedParam]);

  return (
    <Box padding={4}>
      <Heading mb={4}>Projects List</Heading>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Box>
  );
};

export default ProjectsScreen;
