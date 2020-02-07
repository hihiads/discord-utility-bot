// googleSheetsService.js

const { google } = require('googleapis');
const sheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({spreadsheetId, auth}) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function postSpreadSheetValues({spreadsheetId, auth, sheetName}) {
	var request = 
	{
		// The ID of the spreadsheet to update.
		spreadsheetId: spreadsheetId,  // TODO: Update placeholder value.

		// The A1 notation of a range to search for a logical table of data.
		// Values will be appended after the last row of the table.
		range: sheetName,  // TODO: Update placeholder value.

		// How the input data should be interpreted.
		valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.

		// How the input data should be inserted.
		insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.

		resource: 
		{
			  range: sheetName,
			  majorDimension: 'ROWS',
			  values: [
			    ['test', 'test', 'test', 'test']
			  ]
		},

		auth: auth
	}


	const res = await sheets.spreadsheets.values.append(request);
	return res;
}


module.exports = {
  getAuthToken,
  getSpreadSheet,
  postSpreadSheetValues
}