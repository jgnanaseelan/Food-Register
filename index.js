const express = require('express');
const { google } = require('googleapis');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.set('Views,', './Views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});
app.post('/', async (req, res) => {
  const { name, adult, child, date, remark } = req.body;
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = '1AIOQAf0FwadMDjjFI3Wsy23APIPw6nSARLnlojIOb1Q';
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Sheet1!A:E',
  });
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'Sheet1!A:D',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[name, adult, child, date, remark]],
    },
  });
  res.status(204).send();
});
app.listen(1337, (req, res) => console.log('running on 1337'));
