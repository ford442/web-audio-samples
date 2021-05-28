const fs = require('fs');

const targetDirectory = '../vintage-demos/';

fs.readdir(targetDirectory, (err, files) => {
  const jsonData = [];
  files.forEach((fileName) => {
    const relativePath = targetDirectory + fileName;
    if (fs.lstatSync(relativePath).isFile() && relativePath.endsWith('.html')) {
      // Remove '.html'.
      fileName = fileName.slice(0, -5);

      // Replace non-alpha numeric to space.
      fileName = fileName.replace(/[\W_]+/g, ' ');

      // Add white space before a number.
      fileName = fileName.replace(/[^0-9](?=[0-9])/g, '$& ');

      // Capitalize the first letter.
      const words = fileName.split(' ');
      words.forEach((word, index) => {
        words[index] = word.charAt(0).toUpperCase() + word.slice(1);
      });
      const betterName = words.join(' ');

      jsonData.push({
        'title': betterName,
        'path': relativePath
      });
    }
 
  });

  const jsonString = JSON.stringify(jsonData);
  console.log(jsonString);
  fs.writeFileSync('../_data/vintageDemos.json', jsonString);
});