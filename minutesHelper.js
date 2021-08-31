function showDialog(){
  const html = HtmlService.createHtmlOutputFromFile('dialog');
  SpreadsheetApp.getUi().showModalDialog(html, "議事録作成");
}

function send(form) {
  const remark = form.remark
  return false;
}