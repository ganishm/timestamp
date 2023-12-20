const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;

app.use(bodyParser.json());

const filesFolder = './files';
if (!fs.existsSync(filesFolder)) {
  fs.mkdirSync(filesFolder);
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

app.post('/createFile', (req, res) => {
  try {
        const currentTimestamp = Date.now().toString();
        const fileName = `${getCurrentDateTime()}.txt`;
        const filePath = `${filesFolder}/${fileName}`;

        fs.appendFile(filePath, currentTimestamp, (err) => {
            if (err) {
              console.error('Error appending to file:', err);
            } else {
              console.log('Content appended successfully!');
              
            }
        });
  } catch (error) {
        return res.send({message: error.message})
    }
});

app.get('/', (req, res) => {
  try {
    fs.readdir(filesFolder, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      res.send({ file: files })
    });
  } catch (error) {
    return res.send({ message: error.message })
  }
});

app.listen(PORT, () => {
  console.log (`Server is running on http://localhost:${PORT}`);
}); 