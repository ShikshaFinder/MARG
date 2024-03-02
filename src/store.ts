import {create} from "zustand";

type CounterStore={
    count:number;
    increment:()=>void;
    decrement:()=>void;
}
export const useCounterStore = create<CounterStore>(() => ({
    count: 0,
    increment: () => {},
    decrement: () => {},
}));
