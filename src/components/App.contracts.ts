import React from 'react';

export type Exercise = 'Translation' | 'Pinyin' | 'Audio' | 'Chinese';
export const Exercises: Exercise[] = ['Translation', 'Pinyin', 'Audio', 'Chinese'];

export type Phrase = {
  pinyin: string,
  hieroglyph: string,
  translate: string,
  lesson: number,
  sound: string,
  audio?: HTMLAudioElement,
}

export type CardProps = {
  inProgress: Exercise,
  samples: Phrase[],
  setSamples: React.Dispatch<React.SetStateAction<Phrase[]>>,
  phrase: Phrase,
  isAnswerShown: boolean,
  setIsAnswerShown: React.Dispatch<React.SetStateAction<boolean>>,
  sound: boolean,
}

export type CardState = {
    phrase: Phrase,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    isAnswerShown: boolean, 
    setIsAnswerShown: React.Dispatch<React.SetStateAction<boolean>>,
    checkPhrase(): void,
    inProgress: Exercise,
    studyAgain(): void,
}