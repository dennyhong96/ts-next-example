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

  // Add projects
  await Promise.all(
    userIds.map(
      async (uid) =>
        await Promise.all(
          Array.from(
            { length: 2 },
            async () =>
              await db.collection("projects").add({
                personId: uid,
                name: faker.lorem.word(),
                organization: faker.name.jobType(),
                created: Date.now(),
              }),
          ),
        ),
    ),
  );
};
