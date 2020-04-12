import React from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import { CardState, Exercise, Phrase } from '../App.contracts';

const getExpectedInput = (phrase: Phrase, exercise: Exercise) => {
  let expectedInput = '';
  if (exercise === 'Pinyin') {
    expectedInput = phrase.pinyin;
  } else  if (exercise === 'Chinese') {
    expectedInput = phrase.hieroglyph;
  }
  return expectedInput;
}

export function isAnswerCorrect(input: string, phrase: Phrase, exercise: Exercise) {
  const expected = getExpectedInput(phrase, exercise);
  return input.replace(/\s+/g, '') === expected.replace(/\s+/g, '');
}

function Answer(props: CardState) {
  const { input, phrase, inProgress } = props;
  const { hieroglyph, pinyin, translate } = phrase;

  const isCorrect = isAnswerCorrect(input, phrase, inProgress);

  return <>
    <Card.Title>{hieroglyph}</Card.Title>

    {['Pinyin', 'Audio', 'Chinese'].includes(inProgress) &&
      <Card.Text style={{ color: isCorrect ? 'green' : 'red' }}>
        {input || 'Empty'}
      </Card.Text>
    }
    <Card.Text>{pinyin}</Card.Text>
    <Card.Text>{translate}</Card.Text>

    {inProgress==='Translation' &&
    <ButtonGroup className="mr-2">
      <Button variant="primary" onClick={props.studyAgain}>Study again</Button>
    </ButtonGroup> 
    }
  </>
}

export default Answer
