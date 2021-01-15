const { MarkovMachine } = require("./markov");
let markovMachine;
describe("makeChains() tests (with setup)", () => {
  beforeAll(() => {
    markovMachine = new MarkovMachine("");
  });

  afterEach(() => {
    markovMachine.chains = {};
  });

  test("creates chain correctly when no words", () => {
    const words = [];
    markovMachine.words = words;
    markovMachine.makeChains();
    expect(markovMachine.chains).toEqual({ });
  });

  test("creates chain correctly when only 1 words", () => {
    const words = ["the"];
    markovMachine.words = words;
    markovMachine.makeChains();
    expect(markovMachine.chains).toEqual({ the: [null] });
  });

  test("creates chain correctly for multiple words", () => {
    const words = ["the", "cat", "in", "the", "hat"];
    markovMachine.words = words;
    markovMachine.makeChains();
    expect(markovMachine.chains).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [null]
    })
  });

  test("adds null to word already used", () => {
    const words = ["the", "cat", "in", "the", "hat", "is", "in", "the", "hat"];
    markovMachine.words = words;
    markovMachine.makeChains();
    expect(markovMachine.chains).toEqual({
      the: ["cat", "hat", "hat"],
      cat: ["in"],
      in: ["the", "the"],
      hat: ["is", null],
      is: ["in"]
    })
  });
});

describe("makeText(numWords=100) tests (with setup)", () => {
  beforeAll(() => {
    markovMachine = new MarkovMachine("");
  });

  test("returns empty string when 0 words", () => {
    const words = [];
    const chains = {};
    markovMachine.words = words;
    markovMachine.chains = chains;
    expect(markovMachine.makeText()).toEqual("");
  });

  test("returns word when 1 word", () => {
    const words = ["the"];
    const chains = { the: [null] };
    markovMachine.words = words;
    markovMachine.chains = chains;
    expect(markovMachine.makeText()).toEqual("the");
  });

  test("returns text with multiple words", () => {
    const words = ["the", "cat", "in", "the", "hat", "is", "in", "the", "hat"];
    const chains = {
      the: ["cat", "hat", "hat"],
      cat: ["in"],
      in: ["the", "the"],
      hat: ["is", null],
      is: ["in"]
    };
    markovMachine.words = words;
    markovMachine.chains = chains;
    expect(markovMachine.makeText()).not.toEqual("");
  });

  test("returns text with at most 100 words when no args passed", () => {
    const words = ["the", "cat", "in", "the", "hat", "is", "in", "the", "hat"];
    const chains = {
      the: ["cat", "hat", "hat"],
      cat: ["in"],
      in: ["the", "the"],
      hat: ["is"],
      is: ["in"]
    };
    markovMachine.words = words;
    markovMachine.chains = chains;
    const text = markovMachine.makeText();
    const textWords = text.split(" ");
    expect(textWords.length).toEqual(100);
  });

  test("returns empty string when 0 passed", () => {
    const words = ["the", "cat", "in", "the", "hat", "is", "in", "the", "hat"];
    const chains = {
      the: ["cat", "hat", "hat"],
      cat: ["in"],
      in: ["the", "the"],
      hat: ["is", null],
      is: ["in"]
    };
    markovMachine.words = words;
    markovMachine.chains = chains;
    expect(markovMachine.makeText(numWords=0)).toEqual("");
  });

  test("returns text with number of words restricted by number passed", () => {
    const words = ["the", "cat", "in", "the", "hat", "is", "in", "the", "hat"];
    const chains = {
      the: ["cat", "hat", "hat"],
      cat: ["in"],
      in: ["the", "the"],
      hat: ["is"],
      is: ["in"]
    };
    markovMachine.words = words;
    markovMachine.chains = chains;
    const limit = 50;
    const text = markovMachine.makeText(limit);
    const textWords = text.split(" ");
    expect(textWords.length).toEqual(limit);
  });

  test("starts with capitalized word if there is one", () => {
    const words = ["The", "cat", "in", "the", "hat", "is", "in", "the", "hat"];
    const chains = {
      The: ["cat"],
      cat: ["in"],
      in: ["the", "the"],
      the: ["hat", "hat"],
      hat: ["is", null],
      is: ["in"]
    };
    const capitalizedWords = ["The"];
    markovMachine.words = words;
    markovMachine.chains = chains;
    markovMachine.capitalizedWords = capitalizedWords;
    const text = markovMachine.makeText();
    expect(text.split(" ")[0]).toEqual("The");
  });
});

describe("getCapitalizedWords() tests (with setup)", () => {
  beforeAll(() => {
    markovMachine = new MarkovMachine("");
  });

  test("returns empty array if no words", () => {
    expect(markovMachine.getCapitalizedWords()).toEqual([]);
  });

  test("returns empty array if no capital words", () => {
    const words = ["the", "cat", "in", "the", "hat"];
    markovMachine.words = words;
    expect(markovMachine.getCapitalizedWords()).toEqual([]);
  });

  test("returns array of capitalized words", () => {
    const words = ["The", "Cat", "in", "the", "Hat"];
    markovMachine.words = words;
    expect(markovMachine.getCapitalizedWords()).toEqual(["The", "Cat", "Hat"]);
  });
});