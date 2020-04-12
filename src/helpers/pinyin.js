
export const PINYIN_VOWEL_REGEX = /[aeiouüv]:?(\d)?/gi;

export function vowelToPinyin(vowelAndTone, tone) {
  vowelAndTone = vowelAndTone.replace('u:', 'ü').replace('v', 'ü');
  if (tone < 0 || tone > 4) {
    return vowelAndTone
  }
  const map = new Map([
    ['a1', 'ā'], ['a2', 'á'], ['a3', 'ǎ'], ['a4', 'à'],
    ['o1', 'ō'], ['o2', 'ó'], ['o3', 'ǒ'], ['o4', 'ò'],
    ['e1', 'ē'], ['e2', 'é'], ['e3', 'ě'], ['e4', 'è'],
    ['u1', 'ū'], ['u2', 'ú'], ['u3', 'ǔ'], ['u4', 'ù'],
    ['i1', 'ī'], ['i2', 'í'], ['i3', 'ǐ'], ['i4', 'ì'],
    ['ü1', 'ǖ'], ['ü2', 'ǘ'], ['ü3', 'ǚ'], ['ü4', 'ǜ'],
  ]);
  return map.get(vowelAndTone) || vowelAndTone;
}

