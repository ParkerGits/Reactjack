const RANKS: string[] = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];
const SUITS: string[] = ["\u2660", "\u2666", "\u2663", "\u2665"];

const VALUES: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10
]

type card = {
    rank: string,
    suit: string,
    value: number
}

export default function generateDeck(): Array<card> {
    let deck: Array<card> = [];
    RANKS.forEach((rank, i) => {
        SUITS.forEach((suit) => {
            deck.push({rank, suit, value: VALUES[i]})
        })
    })
    return deck;
}