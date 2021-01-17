import React from 'react'
import { css } from '@emotion/css'
import Card from './Card'

type card = {
    rank: string,
    suit: string,
    value: number
}

type HandProps = {
    hand: Array<card>,
    hideSecondCard?: boolean
}


export default function Hand({hand, hideSecondCard}: HandProps) {
    return (
        <div className = {css`
            display: flex;
            margin-top: 10rem;
        `}>
            {console.log(hand)}
            {hand.map((card, i) => {
                return <Card key={i} {...card} hide={i==1 && hideSecondCard}/>
            })}
        </div>
    ) 
}
