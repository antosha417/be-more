import React, { useState, useRef } from 'react';
import {
  Button,
  Container,
  Col,
  Row,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  ButtonToolbar,
} from 'react-bootstrap';
import { Phrase } from './App.contracts';
import { PINYIN_VOWEL_REGEX, vowelToPinyin } from '../helpers/pinyin';

function AddPhrases() {

  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const [lesson, setLesson] = useState<number>(9);
  const [pinyin, setPinyin] = useState('');
  const [hieroglyph, setHieroglyph] = useState('');
  const [translate, setTranslate] = useState('');
  const [sound, setSound] = useState('');
  const pinyinInputRef = useRef<HTMLTextAreaElement>(null);

  const addPhrase = () => {
    setPhrases([{pinyin, hieroglyph, translate, sound, lesson}, ...phrases]);
    setPinyin('');
    setHieroglyph('');
    setTranslate('');
    setSound('');
  };

  const deletePhrase = (phrase: Phrase) => {
    setPhrases([...phrases.filter(p => p !== phrase)])
  };

  return <>
    <Container className="mt-5">
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl size="lg" type="text" placeholder="pinyin" value={pinyin} ref={pinyinInputRef as React.RefObject<any>}
                         onChange={(e: any) => setPinyin(e.target.value.toLocaleLowerCase().replace(PINYIN_VOWEL_REGEX, vowelToPinyin))}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <FormControl size="lg" type="text" placeholder="hieroglyph"
                         onChange={(e: any) => setHieroglyph(e.target.value)}
                         value={hieroglyph}
              />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl size="lg" type="text" placeholder="translation"
                         onChange={(e: any) => setTranslate(e.target.value)}
                         value={translate}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <FormControl size="lg" type="text" placeholder="sound"
                         onChange={(e: any) => setSound(e.target.value)}
                         onKeyPress={(e: any) => { if (e.key === 'Enter') {
                           addPhrase();
                           pinyinInputRef && pinyinInputRef.current && pinyinInputRef.current.focus();
                         }}}
                         value={sound}
            />
          </InputGroup>
        </Col>
      </Row>

      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-2" aria-label="First group">
          <DropdownButton id="lesson-dropdown" title={"Lesson" + lesson}>
            {Array.from(Array(20).keys()).map(x =>
              <Dropdown.Item onClick={() => setLesson(x + 1)}>Lesson {x + 1}</Dropdown.Item>
            )}
          </DropdownButton>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Second group">
          <Button variant="success" onClick={addPhrase}>Add</Button>
        </ButtonGroup>
      </ButtonToolbar>

      {phrases.map(p =>
        <Row>
          <Col style={{color: 'white'}}>
            {`{pinyin: '${p.pinyin}', hieroglyph: '${p.hieroglyph}', translate: '${p.translate}', lesson: ${p.lesson}, sound: '${p.lesson}/${p.sound}.mp3'},`}
          </Col>
          <Col>
            <Button variant="danger" onClick={() => deletePhrase(p)}>Delete</Button>
          </Col>
        </Row>
      )}
    </Container>
  </>
}

export default AddPhrases;
