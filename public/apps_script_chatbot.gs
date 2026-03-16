// Dr. Darshana Chatbot - Google Apps Script
// Go to https://script.google.com → New Script → Paste this → Deploy → New Deployment
// Set Execute as: "Me" and Who has access: "Anyone"

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Chatbot Leads');
  
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }
  
  var data = JSON.parse(e.postData.contents);
  
  var timestamp = new Date();
  var name = sanitize(data.name);
  var phone = sanitize(data.phone);
  var reason = sanitize(data.reason || data.course);
  var source = sanitize(data.source || 'chatbot');
  
  // Validation
  if (!name || name.length < 2) {
    return ContentService.createTextOutput(JSON.stringify({error: 'Invalid name'})).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (!phone || phone.length < 10) {
    return ContentService.createTextOutput(JSON.stringify({error: 'Invalid phone'})).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Check if headers exist
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Reason for Visit', 'Source', 'Status']);
  }
  
  // Append data
  sheet.appendRow([timestamp, name, phone, reason, source, 'New']);
  
  return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
}

function sanitize(input) {
  if (!input) return '';
  return String(input).replace(/[<>]/g, '').slice(0, 100);
}

// For testing
function doGet() {
  return ContentService.createTextOutput('Dr. Darshana Chatbot API is running!');
}