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
    const numOfWords = this.words.length;
    for (let i = 0; i < numOfWords; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      // since no word follows last word, append null
      if (i === numOfWords - 1) {
        if (this.chains[word]) {
          this.chains[word].push(null);
        }
        else {
          this.chains[word] = [null];
        }
      }
      else {
        if (this.chains[word]) {
          this.chains[word].push(nextWord);
        }
        else {
          this.chains[word] = [nextWord];
        }
      }
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random starting word
    let currWord = this.words[Math.floor(Math.random() * this.words.length)];
    let text = "";
    let numOfWordsUsed = 0;
    // if reach limit for number of words or pick null, end text
    while (numOfWordsUsed < numWords && currWord != null) {
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
      currWord = nextWords[Math.floor(Math.random() * nextWords.length)];
    }

    return text;
  }
}

module.exports = { MarkovMachine };