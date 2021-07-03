import { db } from "@lib/firebase";
import { IProject, IUser } from "@components/screens/projects";

const projects: Omit<IProject, "id">[] = [
  {
    name: "proj1",
    organization: "org1",
    personId: "p1",
    created: new Date().toISOString(),
  },
  {
    name: "proj2",
    organization: "org2",
    personId: "p2",
    created: new Date().toISOString(),
  },
  {
    name: "proj3",
    organization: "org3",
    personId: "p3",
    created: new Date().toISOString(),
  },
  {
    name: "proj4",
    organization: "org4",
    personId: "p4",
    created: new Date().toISOString(),
  },
  {
    name: "proj5",
    organization: "org5",
    personId: "p5",
    created: new Date().toISOString(),
  },
];

const users: IUser[] = [
  {
    id: "p1",
    name: "Denny Hong",
    email: "test@test.com",
  },
  {
    id: "p2",
    name: "Sharon Zhang",
    email: "test1@test.com",
  },
  {
    id: "p3",
    name: "Joseph Hong",
    email: "test3@test.com",
  },
  {
    id: "p4",
    name: "Rita Li",
    email: "test4@test.com",
  },
];

export const addData = async () => {
  await Promise.all(projects.map((p) => db.collection("projects").add(p)));

  await Promise.all(
    users.map(async (u) => {
      const { id, ...rest } = u;
      await db.collection("users").doc(id).set(rest);
    }),
  );
};
