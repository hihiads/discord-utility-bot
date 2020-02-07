const {
  getAuthToken,
  getSpreadSheet,
  postSpreadSheetValues
} = require('./googleSheetsService.js');

const spreadsheetId = '1uCkgD4sSi5-SBtuMQkIxa_NFCp36SJLO7b_97zf0M9A';
const sheetName = 'reviews';

async function testGetSpreadSheet() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
      spreadsheetId,
      auth
    })
    console.log('output for getSpreadSheet', JSON.stringify(response.data, null, 2));
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

async function testPostSpreadSheetValues() {
  try {
    const auth = await getAuthToken();
    const response = await postSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth
    })
    console.log('output for postSpreadSheetValues', JSON.stringify(response.data, null, 2));
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

function main() {
  //testGetSpreadSheet();
  testPostSpreadSheetValues();
}

main()

// export GCLOUD_PROJECT=dfz-bots
// export GOOGLE_APPLICATION_CREDENTIALS=./service_account_credentials.json