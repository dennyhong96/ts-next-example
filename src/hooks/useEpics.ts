import { useCallback } from "react";
import { QueryKey, useQuery } from "react-query";

import { IEpic } from "@localTypes/epic";
import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import { db } from "@lib/firebase";
import useEpicsSearchParams from "./useEpicsSearchParams";

const useEpics = (queryKey: QueryKey) => {
  const { projectId } = useEpicsSearchParams();

  const listEpics = useCallback(async () => {
    type EpicsRefType = CollectionReference<DocumentData> | Query<DocumentData>;

    let kanbansRef: EpicsRefType = db.collection("epics");

    if (projectId) {
      kanbansRef = kanbansRef.where("projectId", "==", projectId);
    }

    const items: IEpic[] = [];

    const snapshots = await kanbansRef.get();

    snapshots.forEach((doc) => {
      const data = doc.data();
      items.push({ ...(data as Omit<IEpic, "id">), id: doc.id });
    });

    return items;
  }, [projectId]);

  return useQuery<IEpic[], Error>(queryKey, () => listEpics());
};

export default useEpics;
