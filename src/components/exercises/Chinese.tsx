import React from 'react';
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import { CardState } from '../App.contracts';

function Chinese(props: CardState) {
  return (
    <>
      <Card.Title>{props.phrase.translate}</Card.Title>
      <InputGroup className="mb-3">
        <FormControl
          size="lg"
          type="text"
          placeholder="汉语"
          onChange={(e: any) => props.setInput(e.target.value)}
          onKeyPress={(e: any) => { e.key === 'Enter' && props.checkPhrase() }}
          value={props.input}
          autoFocus={true}
          autoComplete='off'
          autoCorrect='off'
        />
      </InputGroup>
    </>
  )
}

export default Chinese
