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
    let words = [];
    markovMachine.words = words;
    markovMachine.makeChains();
    expect(markovMachine.chains).toEqual({ });
  });

  test("creates chain correctly when only 1 words", () => {
    let words = ["the"];
    markovMachine.words = words;
    markovMachine.makeChains();
    expect(markovMachine.chains).toEqual({ the: [null] });
  });

  test("creates chain correctly for multiple words", () => {
    let words = ["the", "cat", "in", "the", "hat"];
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
    let words = ["the", "cat", "in", "the", "hat", "is", "in", "the", "hat"];
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