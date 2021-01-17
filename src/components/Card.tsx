import React from 'react'
import { css } from '@emotion/css'

type CardProps = {
    rank: string,
    suit: string,
    hide?: boolean
}

export default function Card({rank, suit, hide}: CardProps) {
    return (
        <div className={css`
            border: solid black 2px;
            width: 3.75rem;
            height: 5.00rem;
            display: flex;
            justify-content: center;
        `}>
            <h1 className={css`align-self: center`}>{hide ? "" : rank + suit }</h1>
        </div>
    ) 
}
