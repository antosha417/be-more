import React from 'react';
import { Card } from 'react-bootstrap';
import { CardState } from '../App.contracts';


function Translation(props: CardState) {
  const { hieroglyph, pinyin } = props.phrase;
  return (
    <>
      <Card.Title>{hieroglyph}</Card.Title>
      <Card.Text>{pinyin}</Card.Text>
    </>
  )
}

export default Translation
