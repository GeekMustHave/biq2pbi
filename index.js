// --- ES6 qustions
const fs = require('fs');


// --- Command Line Interface CLI libraries, not required but, I wanted to up the cute content
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer    = require('inquirer');

// --- Simplified reading a file directly without moving it all into a string
//     these out files can be huge
const lineReader = require('line-reader');

// --- @TODO - change to a selection of *.TXT files
biqFile = "./documents/MAIMSModel.txt";
pbiFile = "./pbi.txt";
biqFileYellow = chalk.yellow(biqFile);
pbiFileYellow = chalk.yellow(pbiFile);

dwFlag = false;  // --- Design Windows encountered
dwName = "";     // --- Name of the Window

lineCount = 0;

/**************************************
 * Let's get started                  * 
 **************************************/

  // --- Heading
  clear();
  console.log( chalk.yellow(figlet.textSync('BIQ2PBI', {horizontalLayout: 'full'})));
  console.log("Version 2.1b 04/22/2019");
  console.log("");

  //console.log(chalk.cyan("stuff"));
  console.log(`-- File ${biqFileYellow} being processed...`);
  // --- Create txt file write header
  try {
    header = "BIQ2PBI Header";
    const data = fs.writeFileSync(pbiFile, header);
    console.log(`-- File ${pbiFileYellow} being written to...`);
  } catch (err) {
    console.log(`***** Unable to write to ${pbiFileYellow}`);
    process.exit(22);
  }


  // --- Read each line (Main Loop)
  lineReader.eachLine(biqFile, {encoding: 'utf8'}, function(line,last){
    lineCount++
    if(dwFlag == false && line == "Design Windows"){
      console.log(`-- Design Windows encountered at ${lineCount}`);
      dwFlag = true;
    };
    // --- Process post design window lines
    if(dwFlag == true){
      // --- anything starting without a tab (Should be a window name), skip blank lines
      oneChar = line.substr(0,1);
      oneChar = oneChar.trim()
      if(oneChar !== "" ){
        if(oneChar !== "_"){
          dwName = line;
          console.log(`--- Line: ${line} at ${lineCount}`);
        }
      }
      // --- Look for 'Relationships'
      relationString = line.substr(2,14);
      if(oneChar =="" && relationString == "Relationships"){
        console.log(`---- Relationships found at ${LineCount}`);
      }
    };
  
    // --- Done??
    if(last){
      console.log(`-- ${biqFileYellow} File processed.`);
      console.log(`-- Lines read: ` + chalk.yellow(lineCount));
      console.log('Press any key to exit');
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on('data', process.exit.bind(process, 0));
     };
  })


 /**** App history
  *  
  *    Date     Version  Author  Description
  * ----------  -------  ------  ------------------------------------------------------------------------------------
  * 04/22/2019   V2.1b    JHRS    Initial version
  * 

 */