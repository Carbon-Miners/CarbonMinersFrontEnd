import { create } from "zustand";

interface Store {
	addressConnect: `0x${string}`;
	setAddr: (address: `0x${string}`) => void;
}

const useStore = create<Store>((set) => ({
	addressConnect: "0x0",
	setAddr: (address: `0x${string}`) => set({ addressConnect: address }),
}));

export default useStore;
