import { UseBoundStore } from "zustand";

type Store = UseBoundStore<
	Write<StoreApi<IAuthStore>, StorePersist<IAuthStore, unknown>>
>;

interface Window {
	__REDUX_DEVTOOLS_EXTENSION__?: {
		/* eslint-disable-next-line */
		connect: ({ name: string }) => any;
	};
}
