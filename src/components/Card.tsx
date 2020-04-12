import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Button, ButtonGroup, ProgressBar } from 'react-bootstrap';


import Answer from './exercises/Answer'
import AAudio from './exercises/AAudio'
import Pinyin from './exercises/Pinyin'
import Translation from './exercises/Translation'
import { CardProps, CardState, Phrase } from './App.contracts';
import { isAnswerCorrect } from './exercises/Answer';
import Chinese from './exercises/Chinese';
import { playAudio, SAMPLES_SIZE } from './BeMore';

function ACard(props: CardProps) {

  const { inProgress, samples, setSamples, phrase, isAnswerShown, setIsAnswerShown, sound } = props;

  const [input, setInput] = useState('');
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    nextButtonRef.current && nextButtonRef.current.focus();
  });

  const newPhrase = (previous: Phrase, phrase: Phrase | undefined) => {
    if (previous.audio) {
      previous.audio.pause();
      previous.audio.currentTime = 0;
    }
    setInput('');
    setIsAnswerShown(false);
    phrase && phrase.audio && phrase.audio.play()
  };

  const nextPhrase = () => {
    phrase.audio && phrase.audio.pause();
    if (inProgress === 'Translation' || isAnswerCorrect(input, phrase, inProgress)) {
      const newSamples = [...samples.filter(p => p !== phrase)];
      setSamples(newSamples);
      newPhrase(phrase, newSamples[0]);
    } else {
      const newSamples = [...samples.filter(p => p !== phrase), phrase];
      setSamples(newSamples);
      newPhrase(phrase, newSamples[0]);
    }
  };

  const studyAgain = () => {
    const newSamples = [...samples.filter(p => p !== phrase), phrase];
    setSamples(newSamples);
    newPhrase(phrase, newSamples[0]);
  };

  const skipPhrase = () => {
    const newSamples = [...samples.filter(p => p !== phrase)];
    setSamples(newSamples);
    newPhrase(phrase, newSamples[0]);
  };

  const checkPhrase = () => {
    setIsAnswerShown(true);
    playAudio(phrase);
  };

  const state: CardState = {
    phrase,
    input, setInput,
    isAnswerShown, setIsAnswerShown,
    checkPhrase,
    inProgress,
    studyAgain,
  };

  const wordsToStudy: number = SAMPLES_SIZE - samples.length + 1;

  return (
    <Container className="mt-5">
      <Card>
        <ProgressBar now={wordsToStudy / SAMPLES_SIZE * 100} label={wordsToStudy + '/' + SAMPLES_SIZE}/>
        <Card.Body>
          {isAnswerShown
            ? <Answer {...state} />
            : <>
              {inProgress === 'Translation' && <Translation {...state} />}
              {inProgress === 'Pinyin'      && <Pinyin {...state} />}
              {inProgress === 'Audio'       && <AAudio {...state} />}
              {inProgress === 'Chinese'     && <Chinese {...state}/> }
            </>
          }
          <ButtonGroup className="mr-2">
            {isAnswerShown
              ? <button type="button" className="btn btn-primary" onClick={nextPhrase} ref={nextButtonRef}>Next</button>
              : <Button variant="primary" onClick={checkPhrase}>Check</Button>
            }
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            <Button variant="secondary" onClick={skipPhrase}>Skip</Button>
          </ButtonGroup>
          {sound && <ButtonGroup className="mr-2">
            <button className='megaphone' onClick={() => phrase.audio && phrase.audio.play()} style={{height: '2rem', width: '2rem'}}/>
          </ButtonGroup>}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ACard;
