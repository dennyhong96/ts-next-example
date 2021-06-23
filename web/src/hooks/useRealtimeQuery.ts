import { useEffect } from "react";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";

import { db } from "@lib/firebase";

function useRealTimeQuery<T>(
	firebasePathKey: string,
	useQueryOptions: UseQueryOptions<T, Error> = {},
) {
	const queryClient = useQueryClient();

	useEffect(() => {
		let unsubscribe;

		const parts = firebasePathKey.split("/");
		if (parts.length % 2 === 0) {
			unsubscribe = db.doc(firebasePathKey).onSnapshot(snapshot => {
				console.log({ snapshot });
				queryClient.setQueryData(firebasePathKey, snapshot.data());
			});
		} else {
			unsubscribe = db.collection(firebasePathKey).onSnapshot(snapshot => {
				console.log({ snapshot });
				const items: any = [];
				snapshot.forEach(doc => {
					items.push({ id: doc.id, ...doc.data() });
				});
				queryClient.setQueryData(firebasePathKey, items);
			});
		}

		return unsubscribe;
	}, [queryClient, firebasePathKey]);

	return useQuery<T, Error>(firebasePathKey, () => new Promise<T>(() => {}), useQueryOptions);
}

export default useRealTimeQuery;
