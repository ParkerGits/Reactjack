type card = {
    rank: string,
    suit: string,
    value: number
}

export default function getValue(hand: Array<card>): number {
let aceCount = 0;
    let valueSum = 0;
    hand.forEach((card)=>{
        if(card.value === 1){
            aceCount++
        } else {
            valueSum += card.value
        }
    })
    for (let i = 0; i < aceCount; i++) {
        if (valueSum > 10) {
            valueSum += 1;
        } else {
            valueSum += 11;
        }
    }
    return valueSum;
}