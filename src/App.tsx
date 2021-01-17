import React, {useState, useEffect, useRef, FunctionComponent } from 'react';
import './App.css';
import { css } from '@emotion/css'

import generateDeck from './functions/generateDeck'
import getValue from './functions/getValue'

import Hand from './components/Hand'

type card = {
  rank: string,
  suit: string,
  value: number
}

function App(): FunctionComponent {
  const [deck, setDeck] = useState<card[]>(generateDeck())
  const [playerHand, setPlayerHand] = useState<card[]>([])
  const [dealerHand, setDealerHand] = useState<Array<card>>([])
  const [playerHandValue, setPlayerHandValue] = useState<number>()
  const [dealerHandValue, setDealerHandValue] = useState<number>(getValue(dealerHand))
  const [playerBust, setPlayerBust] = useState<boolean>(false)
  const [playerStand, setPlayerStand] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [hideSecondCard, setHideSecondCard] = useState<boolean>(true);
  const didMountRef = useRef<boolean>(false)
  // On playerHand update, set new value, check bust
  useEffect(() => {
    let newValue = getValue(playerHand)
    setPlayerHandValue(newValue)
    if(newValue > 21) {
      setPlayerBust(true)
    }
  }, [playerHand])

  // On stand, dealer draws until win or bust
  useEffect(() => {
    if(didMountRef.current) {
      setHideSecondCard(false)
      let newDealerHand = dealerHand
      let newDeck = deck
      let newValue = getValue(newDealerHand)
      while (newValue < playerHandValue && newValue <= 21) {
        let randomCard = Math.floor(Math.random() * newDeck.length)
        newDealerHand = newDealerHand.concat([newDeck[randomCard]])
        newDeck = newDeck.filter(card => card !== newDeck[randomCard])
        newValue = getValue(newDealerHand)
      }
      setDealerHand([...newDealerHand])
      setDealerHandValue(newValue)
      setDeck(newDeck)
      if(newValue > 21){
        setResult("You win!")
      }
      else if(newValue === playerHandValue)
      {
        setResult("Draw!")
      }
      else if(newValue > playerHandValue)
      {
        setResult("Dealer wins!")
      }
    } else didMountRef.current = true;
  }, [playerStand])

  // First two cards for both player and dealer
  if(playerHand.length === 0){
    let randomCardIndex1 = Math.floor(Math.random() * deck.length)
    let newDeck = deck.filter(card => card !== deck[randomCardIndex1])
    let randomCardIndex2 = Math.floor(Math.random() * deck.length)
    newDeck = newDeck.filter(card => card !== deck[randomCardIndex2])
    setPlayerHand([deck[randomCardIndex1], deck[randomCardIndex2]])
    let randomCardIndex3 = Math.floor(Math.random() * deck.length)
    newDeck = newDeck.filter(card => card !== deck[randomCardIndex3])
    let randomCardIndex4 = Math.floor(Math.random() * deck.length)
    newDeck = newDeck.filter(card => card !== deck[randomCardIndex4])
    setDealerHand([deck[randomCardIndex3], deck[randomCardIndex4]])
    setDeck(newDeck)
  }

  return (
    <div className={css`
      width: 50%;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <Hand hand={dealerHand} hideSecondCard={hideSecondCard}/>
      <Hand hand={playerHand}/>
      <h1>{ playerBust ? "Bust!" : `${playerHandValue ? `Player Hand Value: ${playerHandValue}` : ""}` }</h1>
      
      <div className={css`display: flex; justify-content: space-between;`}>
        <button disabled={playerBust || playerStand } onClick={() => {
          let randomCard = Math.floor(Math.random() * deck.length)
          let newPlayerHand = playerHand.concat([deck[randomCard]])
          let newDeck = deck.filter(card => card !== deck[randomCard])
          setPlayerHand([...newPlayerHand])
          setDeck(newDeck)
        }}>Hit</button>

        <button disabled={playerBust || playerStand} onClick={() => {
          setPlayerStand(true)
        }}>Stand</button>
      </div>

      <h1 className={css`display: ${playerBust ? "block" : "none"}`}>You lose!</h1>
      <h1 className={css`display: ${playerStand ? "block" : "none"}`}>{dealerHandValue <= 21 ? "Dealer Hand Value: " + dealerHandValue : "Dealer Bust!"} - {result}</h1>
      {/* Play again button - reset all state to initial. */}
      <button className={css`display: ${playerBust || playerStand ? "block" : "none"};`} onClick={() => {
        setDeck(generateDeck)
        setPlayerHand([])
        setDealerHand([])
        setPlayerHandValue()
        setDealerHandValue()
        setPlayerBust(false)
        setPlayerStand(false)
        setResult("")
        setHideSecondCard(true)
        didMountRef.current = false
      }}>Play again?</button>
    </div>
  );
}

export default App;
