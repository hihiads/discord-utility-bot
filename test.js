const {
  getAuthToken,
  getSpreadSheet,
  postSpreadSheetValues
} = require('./googleSheetsService.js');

const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
const sheetName = 'reviews';
const values = ['coach', 'student', 'score', 'comment']

async function testGetSpreadSheet() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
      spreadsheetId,
      auth,
      sheetName
    })
    console.log(response);
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

async function testPostSpreadSheetValues() {
  try {
    const auth = await getAuthToken();
    const response = await postSpreadSheetValues({
      spreadsheetId,
      auth,
      sheetName,
      values
    })
    console.log('output for postSpreadSheetValues', JSON.stringify(response.data, null, 2));
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

function main() {
  console.log(testGetSpreadSheet());
  //testPostSpreadSheetValues();
}

main()

// export GCLOUD_PROJECT=dfz-bots
// export GOOGLE_APPLICATION_CREDENTIALS=./mod.json