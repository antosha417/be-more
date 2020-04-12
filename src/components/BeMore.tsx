import React, { useEffect, useState } from 'react';
import { Exercise, Phrase, CardProps, Exercises } from './App.contracts';
import { NavDropdown, Navbar, Button, ButtonGroup } from 'react-bootstrap';
import { allLessons, allSamples } from '../allSamples';
import ACard from './Card'

export const SAMPLES_SIZE = 9;

const createAudio = (phrase: Phrase) => {
  if(!phrase.audio) {
    phrase.audio = new Audio('/sounds/' + phrase.sound);
  }
};

export const playAudio = (phrase: Phrase) => {
  if (!phrase.audio) {
    return;
  }
  phrase.audio.currentTime = 0;
  console.log(JSON.stringify(phrase), phrase.audio.currentTime);
  phrase.audio.play().then();
};

const randomSamples = (lesson: number, size: number, showSentences: boolean): Phrase[] => {
  return allSamples
    .filter(x => lesson === 0 || x.lesson === lesson)
    .filter(p => showSentences || !p.sound.includes('phrases'))
    .sort(() => 0.5 - Math.random())
    .slice(0, size);
};

function useStateWithLocalStorage<T> (localStorageKey: string, initial: T) : [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(localStorageKey);
    return savedValue ? JSON.parse(savedValue) : initial;
  });
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  } );
  return [value, setValue];
}

function BeMore() {
  const [inProgress, setInProgress] = useStateWithLocalStorage<Exercise>('inProgress','Pinyin');
  const [lesson, setLesson] = useStateWithLocalStorage<number>('lesson', 0);
  const [sound, setSound] = useStateWithLocalStorage<boolean>('sound', true);
  const [showSentences, setShowSentences] = useStateWithLocalStorage<boolean>('showSentences', true);

  const [samples, setSamples] = useState(() => randomSamples(lesson, SAMPLES_SIZE, showSentences));
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  if (sound) {
    samples.forEach(createAudio);
  }

  const changeSamples = (lesson: number, showSentences: boolean) => {
    const newSamples = randomSamples(lesson, SAMPLES_SIZE, showSentences);

    sound && newSamples.forEach(createAudio);
    playAudio(newSamples[0]);

    setSamples(newSamples);
    setIsAnswerShown(false);

    // if lesson is chosen it is possible to learn offline
    sound && allSamples.filter(x => x.lesson === lesson).forEach(createAudio);
  };

  if (samples.length === 0) {
    changeSamples(lesson, showSentences);
  }

  const changeLesson = (lesson: number) => {
    setLesson(lesson);
    changeSamples(lesson, showSentences);
  };

  const changeExercise = (exercise: Exercise) => {
    setInProgress(exercise);
    changeSamples(lesson, showSentences);
  };

  const toggleSentences = () => {
    changeSamples(lesson, !showSentences);
    setShowSentences(!showSentences);
  };

  const toggleSound = () => {
    sound && allSamples.forEach(p => p.audio = undefined);
    setSound(!sound);
  };

  const phrase = samples[0];
  const state: CardProps = {
    inProgress, phrase,
    samples, setSamples,
    isAnswerShown, setIsAnswerShown,
    sound,
  };

  return (
    <>
      <Navbar variant="light" bg='light'>
        <NavDropdown id="dropdown-basic-lesson" title={lesson === 0 ? "All Lessons" : "Lesson " + lesson}>
          <NavDropdown.Item onClick={() => changeLesson(0)} active={lesson === 0}>All Lessons</NavDropdown.Item>
          {allLessons.map(l => <NavDropdown.Item onClick={() => changeLesson(l)} active={lesson === l} key={l}> {l} </NavDropdown.Item>)}
        </NavDropdown>
        <NavDropdown id="dropdown-basic-exercise" title={inProgress}>
          {Exercises.map(e => <NavDropdown.Item onClick={() => changeExercise(e)} key={e}> {e} </NavDropdown.Item>)}
        </NavDropdown>
        <ButtonGroup className="mr-2">
          <Button variant="outline-primary" onClick={toggleSentences}>{showSentences ? 'Sentences On' : 'Sentences Off'}</Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button variant="outline-primary" onClick={toggleSound}>{sound ? 'Sound On' : 'Sound Off'}</Button>
        </ButtonGroup>
      </Navbar>

      <ACard {...state}/>
    </>
  );
}

export default BeMore;
