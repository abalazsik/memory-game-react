
const CARD_SELECTED = "CARD_SELECTED";

export const subscribeCardSelect = (handler: any) => window.addEventListener(CARD_SELECTED, handler);

export const unsubscribeCardSelect = (handler: any) => window.removeEventListener(CARD_SELECTED, handler);

export const emitCardSelect = (id: number) => window.dispatchEvent(new CustomEvent(CARD_SELECTED, { detail: { idx: id } }));

