function showDialog(){
  const html = HtmlService.createHtmlOutputFromFile('dialog');
  DocumentApp.getUi().showModalDialog(html, "議事録作成");
}

function send(form) {
  const remark = form.remark
  // DocumentApp.getActiveDocument().getBody().insertParagraph(0, remark);
}