/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // don't need to check last word, since no words will follow it
    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      if (this.chains[word] && this.chains[word].indexOf(nextWord) === -1) {
        this.chains[word].push(nextWord);
      }
      else {
        this.chains[word] = [nextWord];
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random starting word
    let currWord = this.words[Math.floor(Math.random() * this.words.length)];
    let text = "";
    let numOfWordsUsed = 0;
    while (numOfWordsUsed < numWords) {
      // first word isn't preceded by space
      if (numOfWordsUsed === 0) {
        text += currWord;
      }
      else {
        text += " ";
        text += currWord;
      }
      numOfWordsUsed++;

      // pick next random word that could follow currWord
      const nextWords = this.chains[currWord];
      // if no words can follow, end text
      if (nextWords) {
        currWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      }
      else {
        break;
      }
    }

    return text;
  }
}

module.exports = { MarkovMachine };