import React from 'react';
import PinyinInput from './PinyinInput'
import { Card } from 'react-bootstrap';
import { CardState } from '../App.contracts';


function Pinyin(props: CardState) {
  return (
    <>
      <Card.Title>{props.phrase.hieroglyph}</Card.Title>
      <PinyinInput {...props} />
    </>
  )
}

export default Pinyin
