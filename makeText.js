const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

const errorMessage =
    'Usage: node makeText.js <type> <address>\n' +
    '<type> is either "file" or "url"' + 
    ' and <address> is the location of the file or webpage';

async function main() {
  // first check if valid number of arguments
  if (process.argv.length !== 4) {
    console.error(errorMessage);
    process.exit(1);
  }

  const type = process.argv[2];
  if (type === "file") {
    const path = process.argv[3];
    fs.readFile(path, "utf8", (errors, data) => {
      if (errors) {
        console.dir(errors);
        process.exit(1);
      }
      const markovMachine = new MarkovMachine(data);
      console.log(markovMachine.makeText());
    });
  }
  else if (type === "url") {
    const url = process.argv[3];
    try {
      const resp = await axios.get(url);
      const markovMachine = new MarkovMachine(resp.data);
      console.log(markovMachine.makeText());
    }
    catch(error) {
      console.error(error);
      process.exit(1);
    }
  }
  else {
    console.error(errorMessage);
    process.exit(1);
  }
}

main();