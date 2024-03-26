#!/usr/bin/env node
const packageJSON = require('./package.json');
const path = require('path');

const options = require('yargs-parser')(process.argv.slice(2),{
  boolean: ['help'],
  string: ['origin', 'from', 'to'],
  number: ['depth'],
  default: {
    origin: 'npm',
    from: '.',
    to: './dependencies.json',
    depth: 20
  },
  alias: {
    help: ['h'],
    origin: ['o'],
    from: ['f'],
    to: ['t'],
    depth: ['d']
  }
});

function help(){
  const helpMessage = [
    `WELCOME TO ${packageJSON.name.toUpperCase()}`,
    `CLI Help Under Construction`,
    ``,
    `Commands:`,
    `hi -> Greets user`,
    ``,
    `Options:`,
    `-h, --help -> Help`,
    `-o, --origin -> Graph Data Origin ["all", "npm", "imports"]. Default: "npm"`,
    ``,
    `The End`
  ]
  console.log(helpMessage.join('\n'));
}

function run(options){
  switch (options?.origin){
    case 'npm':{
      runNpm(options.from, options.to, options.depth)
      break;
    }
    case 'import':{
      //TODO here we can add getting dependencies from skott's
      break;
    }
    default:{
      break;
    }
  }
}

function runNpm(directoryPath, outputPath, depth){
  const { execSync } = require('child_process');
  const fs = require('fs')

  try {
    //TODO here we can either save the data as it comes, without having to parse it, if going to be consume from a file. Or we can place it in a global object for the stories to consume.
    const npmListOutput = execSync(`npm ls --json --depth=${depth}`, { encoding: 'utf-8', cwd: directoryPath });
    const npmListJSON = JSON.parse(npmListOutput);
    fs.writeFileSync(outputPath, JSON.stringify(npmListJSON, null, 2));
    console.log(`npm ls output saved to ${outputPath} successfully.`); //TODO we can also work on the logging strategy for debug, user friendly and for consistency. Should we Use Chalk?
  } catch (error) {
    console.error(`Error occurred while executing npm ls command: ${error}`);
  }
}

function greetings(options){
  console.log('Hello World', {options})
}

function init (options){
  let command = options._[0];

  if (options.help || !command) {
    return help()
  }

  switch (command) {
    case 'hi':
      return greetings(options);
    case 'run':
      return run(options);
    default:
      return help();
  }
}

init(options)