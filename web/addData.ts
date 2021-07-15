import faker from "faker";

import { db } from "@lib/firebase";

export const addData = async () => {
  const userIds = Array.from({ length: 15 }, () => db.collection("users").doc().id);

  // Add users
  await Promise.all(
    userIds.map(
      async (id) =>
        await db.collection("users").doc(id).set({
          email: faker.internet.email(),
          name: faker.name.findName(),
        }),
    ),
  );

  const projectIds: string[] = [];

  // Add projects
  await Promise.all(
    userIds.map(
      async (uid) =>
        await Promise.all(
          Array.from({ length: 2 }, async () => {
            const projectId = db.collection("projects").doc().id;
            projectIds.push(projectId);
            return await db.collection("projects").doc(projectId).set({
              personId: uid,
              name: faker.lorem.word(),
              organization: faker.name.jobType(),
              created: Date.now(),
            });
          }),
        ),
    ),
  );

  const kanbansInfo: {
    kanbanId: string;
    projectId: string;
  }[] = [];

  // Add kanbans
  await Promise.all(
    projectIds.map(
      async (pid) =>
        await Promise.all(
          ["backlog", "in-progress", "done"].map(async (kanban) => {
            const kanbanId = db.collection("projects").doc().id;
            kanbansInfo.push({
              kanbanId,
              projectId: pid,
            });
            return await db.collection("kanbans").doc(kanbanId).set({
              projectId: pid,
              name: kanban,
            });
          }),
        ),
    ),
  );

  // Add tasks
  await Promise.all(
    kanbansInfo.map(
      async (kb) =>
        await Promise.all(
          Array.from({ length: 3 }, async () => {
            const taskId = db.collection("tasks").doc().id;
            return await db
              .collection("tasks")
              .doc(taskId)
              .set({
                name: faker.lorem.words(3),
                kanbanId: kb.kanbanId,
                projectId: kb.projectId,
                note: faker.lorem.sentence(),
              });
          }),
        ),
    ),
  );
};
