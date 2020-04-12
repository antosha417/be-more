import React from 'react';
import { vowelToPinyin, PINYIN_VOWEL_REGEX } from '../../helpers/pinyin'
import { InputGroup, FormControl } from 'react-bootstrap';
import { CardState } from '../App.contracts';



function PinyinInput(props: CardState) {
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          size="lg"
          type="text"
          placeholder="pinyin"
          onChange={(e: any) => props.setInput(e.target.value.toLocaleLowerCase().replace(PINYIN_VOWEL_REGEX, vowelToPinyin))}
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

export default PinyinInput
