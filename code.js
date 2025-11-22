// Логируем в активный лист (первый в книге)
// Если хочешь — можешь заменить на явное имя листа.
function getLogSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Если у тебя лист называется по-особенному, впиши сюда его имя:
  return ss.getSheetByName('events');
  //return ss.getSheets()[0];
}

/**
 * doGet — роутер:
 *  ?mode=log&employee=E17&asset=TEST-POINT&token=...
 *  ?mode=geo&employee=E17&asset=OFFICE-ENTRANCE&token=...
 */
function doGet(e) {
  const params = e.parameter || {};
  const mode = (params.mode || 'log').toLowerCase();

  if (mode === 'log') {
    const employee = params.employee || '';
    const asset    = params.asset    || '';
    const token    = params.token    || '';

    // event_type = 'scan' для обычного режима
    appendLogRow(employee, asset, 'scan', '', '', '', token);

    return HtmlService.createHtmlOutputFromFile('success')
      .setTitle('Scan recorded');
  }

  if (mode === 'geo') {
    // отдаём HTML, который запросит геопозицию и дернет logScanGeo
    const t = HtmlService.createTemplateFromFile('geo');
    t.employee = params.employee || '';
    t.asset    = params.asset    || '';
    t.token    = params.token    || '';

    return t.evaluate()
      .setTitle('Geo scan')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return HtmlService.createHtmlOutput('Unknown mode');
}

/**
 * Собственно запись строки в твой формат:
 * timestamp | employee_id | asset_id | event_type | lat | lng | user_agent | token
 */
function appendLogRow(employee, asset, eventType, lat, lng, userAgent, token) {
  const sheet = getLogSheet();
  sheet.appendRow([
    new Date(),
    employee || '',
    asset    || '',
    eventType || '',
    lat || '',
    lng || '',
    userAgent || '',
    token || ''
  ]);
}

/**
 * Функция, которую дергает geo.html через google.script.run
 * event_type = 'geo'
 */
function logScanGeo(employee, asset, token, lat, lng, userAgent) {
  appendLogRow(employee, asset, 'geo', lat, lng, userAgent, token);
  return 'OK';
}
