import React from 'react';
import PinyinInput from './PinyinInput'
import { CardState } from '../App.contracts';


function AAudio(props: CardState) {
  return (
    <>
      <PinyinInput {...props} />
    </>
  )
}

export default AAudio
