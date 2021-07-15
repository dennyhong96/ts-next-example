import { useCallback } from "react";
import { useQuery } from "react-query";

import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import { db } from "@lib/firebase";
import { IKanban } from "@localTypes/kanban";
import useKanbanQueryKey from "./useKanbanQueryKey";
import useKanbansSearchParams from "./useKanbansSearchParams";

const useKanbans = () => {
  const { projectId } = useKanbansSearchParams();

  const listKanbans = useCallback(async () => {
    type kanbansRefType = CollectionReference<DocumentData> | Query<DocumentData>;

    let kanbansRef: kanbansRefType = db.collection("kanbans");

    if (projectId) {
      kanbansRef = kanbansRef.where("projectId", "==", projectId);
    }

    const items: IKanban[] = [];

    const snapshots = await kanbansRef.get();

    snapshots.forEach((doc) => {
      const data = doc.data();
      items.push({ ...(data as Omit<IKanban, "id">), id: doc.id });
    });

    return items;
  }, [projectId]);

  return useQuery<IKanban[], Error>(useKanbanQueryKey(), () => listKanbans());
};

export default useKanbans;
