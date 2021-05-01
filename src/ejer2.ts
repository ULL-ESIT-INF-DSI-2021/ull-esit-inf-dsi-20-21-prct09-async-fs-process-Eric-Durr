import * as fs  from 'fs';
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
      for (let i = 3; i < process.argv.length; i++) {
        // console.log(process.argv[i]);
        if (process.argv[i].toString() === "--lines") {
          const rs = fs.createReadStream(filename); 
          let i: number = 0
          let nLines: number = 0
          rs.on('data', function(chunk) {
            for (i=0; i < chunk.length; ++i)
              if (chunk[i] == 10) nLines++;
          })
          .on('end', function() {
            console.log(`File ${filename} has ${nLines + 1} lines.`);
          }); 
        
        } else if (process.argv[i].toString() === "--words") {
          const rs = fs.createReadStream(filename); 
          let nWords: number = 0
          rs.on('data', function(chunk) {
            nWords += chunk.toString().split(" ").length;
          })
          .on('end', function() {
            console.log(`File ${filename} has ${nWords} words.`);
          }); 
        } else if (process.argv[i].toString() === "--chars") {
          const rs = fs.createReadStream(filename); 
          let nChars: number = 0
          rs.on('data', function(chunk) {
            nChars += chunk.toString().split("").length;
          })
          .on('end', function() {
            console.log(`File ${filename} has ${nChars} characters.`);
          }); 
        } else {
          console.log ("option " + 
                        process.argv[i].toString() +
                        " not available");
        }
      }
    }
  });
}