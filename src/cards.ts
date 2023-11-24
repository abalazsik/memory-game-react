
export enum Color {
    Red, Green, Blue
}

class CardData {
    constructor(public readonly color: Color,
        public readonly backColor: Color,
        public readonly text: Color
    ) { }

    public equals(other: CardData) {
        return (this.color === other.color && this.backColor === other.backColor && this.text === other.text);
    }
}

export class CardDataWithPosition extends CardData {
    constructor(color: Color,
        backColor: Color,
        text: Color,
        public x: number,
        public y: number,
        public idx: number,
        public visible: boolean = false
    ) {
        super(color, backColor, text)
    }
}

export class Generator {

    private static validPermutations(): CardData[] {
        const colors = [Color.Blue, Color.Green, Color.Red];

        let cards: CardData[] = [];

        for (let text of colors) {
            for (let backColor of colors) {
                for (let color of colors) {
                    if (backColor !== color) {
                        cards.push(new CardData(color, backColor, text));
                    }
                }
            }
        }

        return cards;
    }

    static generate(): CardDataWithPosition[] {
        const validPermutations = this.validPermutations();

        let cards = validPermutations.concat(validPermutations);

        cards.sort(() => Math.random() - 0.5);//shuffle
        let idx = 0;
        const cardsWithPositions = cards.map((card) =>
            new CardDataWithPosition(card.color, card.backColor, card.text, (idx % 6) + 1, Math.floor(idx / 6) + 1, (idx++)));

        return cardsWithPositions;
    }
}

export function colorToRGB(color: Color): string {
    switch (color) {
        case Color.Blue: return '#0000ff';
        case Color.Green: return '#00ff00';
        case Color.Red: return '#ff0000';
    }
}

export function colorToText(color: Color): string {
    switch (color) {
        case Color.Blue: return 'blue';
        case Color.Green: return 'green';
        case Color.Red: return 'red';
    }
}
