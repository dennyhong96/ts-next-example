import { db } from "@lib/firebase";

type IdsType = "tasks" | "kanbans" | "epics";

const generateId = ({ type }: { type: IdsType }) => db.collection(type).doc().id;

export default generateId;
