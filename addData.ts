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

  const taskTypeIds: string[] = [];

  // Add task types
  await Promise.all(
    ["bug", "test", "feature", "chore"].map((taskType) => {
      const taskTypeId = db.collection("taskTypes").doc().id;
      taskTypeIds.push(taskTypeId);
      return db.collection("taskTypes").doc(taskTypeId).set({
        name: taskType,
      });
    }),
  );

  console.log({ taskTypeIds });

  // Add projects
  await Promise.all(
    userIds.map(
      async (uid) =>
        await Promise.all(
          Array.from({ length: 2 }, async () => {
            const projectId = db.collection("projects").doc().id;

            const kanbanIdsOrder: string[] = [];

            // Add kanbans
            await Promise.all(
              ["backlog", "in-progress", "done"].map(async (kanban) => {
                const kanbanId = db.collection("projects").doc().id;
                kanbanIdsOrder.push(kanbanId);

                const taskIdsOrder: string[] = [];

                // Add tasks
                await Promise.all(
                  Array.from({ length: 3 }, async () => {
                    const taskId = db.collection("tasks").doc().id;
                    taskIdsOrder.push(taskId);

                    return await db
                      .collection("tasks")
                      .doc(taskId)
                      .set({
                        name: faker.lorem.words(3),
                        kanbanId,
                        projectId,
                        note: faker.lorem.sentence(),
                        typeId: taskTypeIds[Math.floor(Math.random() * taskTypeIds.length)],
                        processorId: userIds[Math.floor(Math.random() * userIds.length)],
                      });
                  }),
                );

                return await db.collection("kanbans").doc(kanbanId).set({
                  projectId,
                  name: kanban,
                  taskIdsOrder,
                });
              }),
            );

            return await db.collection("projects").doc(projectId).set({
              personId: uid,
              name: faker.lorem.word(),
              organization: faker.name.jobType(),
              created: Date.now(),
              kanbanIdsOrder,
            });
          }),
        ),
    ),
  );
};
