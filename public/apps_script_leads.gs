// ============================================================================
// Dr. Darshana Reddy - Lead Capture
// ----------------------------------------------------------------------------
// Routes each form to its own tab in one spreadsheet:
//   Sheet 1 - "Chatbot Leads"  (source: chatbot)
//   Sheet 2 - "Contact Leads"  (source: contact, help)
//
// SETUP
// 1. Create a Google Sheet to hold the leads.
// 2. Extensions -> Apps Script -> paste this file.
// 3. Set "Execute as: Me" and "Who has access: Anyone".
// 4. Deploy -> New deployment -> Type: Web app -> Deploy, then copy the URL
//    into VITE_GOOGLE_SHEET_URL in your environment.
//
// The tabs and their headers are created automatically on first submission,
// so you do not need to set anything up in the spreadsheet by hand.
// ============================================================================

var TABS = {
  chatbot: {
    name: 'Chatbot Leads',
    headers: ['Timestamp', 'Name', 'Phone', 'Reason for Visit', 'Page', 'Status']
  },
  contact: {
    name: 'Contact Leads',
    headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Concern',
              'Preferred Date', 'Message', 'Page', 'Status']
  }
};

var DEFAULT_TAB = TABS.contact;

function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  var source = String(data.source || '').toLowerCase();
  var tab = TABS[source] || DEFAULT_TAB;

  var name = sanitize(data.name);
  var email = sanitizeEmail(data.email);
  var phone = sanitize(data.phone);
  var message = sanitizeLong(data.message);
  var reason = sanitizeLong(data.reason);
  var condition = sanitizeLong(data.condition);
  var preferredDate = sanitize(data.preferredDate);
  var page = sanitize(data.page);
  var consent = sanitize(data.consent);
  var submittedAt = sanitize(data.submittedAt);

  // Validation - a lead needs at least a name plus one way to reach them.
  if (!name || name.length < 2) {
    return json({ success: false, error: 'Invalid name' });
  }
  if (!phone && !email) {
    return json({ success: false, error: 'Phone or email required' });
  }

  var sheet = getOrCreateSheet(tab);

  var row = source === 'chatbot'
    ? [now(), name, phone, reason, page, 'New']
    : [now(), name, email, phone, condition, preferredDate, message, page, 'New'];

  sheet.appendRow(row);

  return json({
    success: true,
    tab: tab.name,
    source: source || 'contact',
    receivedAt: submittedAt
  });
}

function doGet() {
  return ContentService.createTextOutput(
    'Dr. Darshana lead capture is running. Tabs: ' +
    Object.keys(TABS).map(function (k) { return TABS[k].name; }).join(', ')
  );
}

// --- helpers ----------------------------------------------------------------

function getOrCreateSheet(tab) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tab.name);

  if (!sheet) {
    sheet = ss.insertSheet(tab.name);
  }

  // Only write headers when the tab is empty, so existing rows are never
  // overwritten on redeploy.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(tab.headers);
    sheet.setFrozenRows(1);
    sheet
      .getRange(1, 1, 1, tab.headers.length)
      .setFontWeight('bold')
      .setBackground('#e8eaed');
  }

  return sheet;
}

function now() {
  return Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy HH:mm:ss');
}

function sanitize(input) {
  if (input === undefined || input === null) return '';
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, 100);
}

function sanitizeLong(input) {
  if (input === undefined || input === null) return '';
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, 2000);
}

function sanitizeEmail(input) {
  var value = sanitize(input).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? value : '';
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
