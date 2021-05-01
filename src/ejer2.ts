import * as fs  from 'fs';
 import * as yrgs from "yargs";

if(process.argv.length < 4) {
  console.error("Less arguments than expected");
  console.error(`Usage: node dist/ejer2 <filename> <action/s>`);
  console.error(`Where contemplated actions are:`);
  console.error(`--lines`);
  console.error(`--words`);
  console.error(`--chars`);
} else {
  const filename = process.argv[2];
  fs.access(filename, fs.constants.O_RDONLY, (err) =>{
    if (err) {
      console.error(`File ${filename} does not exist`);
    } else {
      yrgs.command({
        command: 'lines',
        describe: 'Count the lines in a file',
        handler(argv) {
        
        }
       })  
       const rs = fs.createReadStream(filename);
          
       let i: number = 0
       let nLines: number = 0
       rs.on('data', function(chunk) {
         for (i=0; i < chunk.length; ++i)
           if (chunk[i] == 10) nLines++;
       })
       .on('end', function() {
         console.log(nLines);
       }); 
    }
  });
  console.log("Accepted input");
}
