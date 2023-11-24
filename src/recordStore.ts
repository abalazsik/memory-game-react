import { createWritableStore } from "react-store-js";

const RECORD_KEY = "record-key";

function createRecordStore() {
    let record: number | undefined = undefined;
    if (localStorage.getItem(RECORD_KEY) !== null) {
        record = Number.parseInt(localStorage.getItem(RECORD_KEY) as string);
    }
    const { subscribe, set, update } = createWritableStore<number | undefined>(record);
    return {
        subscribe,
        update,
        set: (value: number) => { set(value); console.log(value); localStorage.setItem(RECORD_KEY, value.toString()); }
    };
}

export const recordStore = createRecordStore();