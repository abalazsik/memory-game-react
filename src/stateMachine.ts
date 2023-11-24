import { CardDataWithPosition, Generator } from './cards';
import { recordStore } from './recordStore';
import { createWritableStore, getStore } from 'react-store-js';

export enum State {
    AllUnselected, FirstSelected, SecondSelected
}

export interface StateMachineState {
    state: State,
    firstIdx: number,
    secondIdx: number,
    cardData: CardDataWithPosition[],
    isEnded: boolean,
    isClickable: boolean,
    steps: number
};

function createStateMachineStore() {
    const cardData = Generator.generate();

    const { subscribe, set, update } = createWritableStore(
        {
            state: State.AllUnselected,
            firstIdx: -1,
            secondIdx: -1,
            cardData: cardData,
            isEnded: false,
            isClickable: true,
            steps: 0
        } as StateMachineState);
    return {
        subscribe,
        set,
        update,
        transition: (data: {idx: number}) => {
            update((old: StateMachineState) => {

                switch (old.state) {
                    case State.AllUnselected: 
                        return {...old, firstIdx: data.idx, state: State.FirstSelected, isClickable: true};
                    case State.FirstSelected: {
                        setTimeout(() => {
                            update((old: StateMachineState) => {
                                const first = old.cardData.find(data => data.idx === old.firstIdx);
                                const second = old.cardData.find(data => data.idx === old.secondIdx);
                                
                                if (!first) { throw "invalid firstIdx" }
                                if (!second) { throw "invalid secondIdx"; }

                                if (first.equals(second)) {
                                    old.cardData = old.cardData.filter(data => data.idx !== old.firstIdx && data.idx !== old.secondIdx);
                                } else {
                                    first.visible = false;
                                    second.visible = false;
                                }
                                old.state = State.AllUnselected;
                                old.isEnded = old.cardData.length === 0;
                                old.steps = old.steps + 1;
                                
                                if (!old.isEnded) {
                                    old.isClickable = true;
                                } else if (getStore(recordStore) === undefined || getStore(recordStore) as number > old.steps) {
                                    recordStore.set(old.steps);
                                }
                                
                                return {...old};
                            });
                        }, 2000);
                        return {...old, secondIdx: data.idx, state: State.SecondSelected, isClickable: false};
                    }
                }
                return old;
            });
        },
        reset: () => {
            const cardData = Generator.generate();
            set({
                state: State.AllUnselected,
                firstIdx: -1,
                secondIdx: -1,
                cardData: cardData,
                isEnded: false,
                isClickable: true,
                steps: 0
            });
        }
    }
}

export const stateMachine = createStateMachineStore();
