function showDialog(){
  const html = HtmlService.createHtmlOutputFromFile('dialog');
  DocumentApp.getUi().showModalDialog(html, "議事録作成");
}

function send(form) {
  const [person, remark] = form.remark.split(' ', 2)
  const doc = DocumentApp.getActiveDocument();
  const TABLETYPE = DocumentApp.ElementType.TABLE;
  const TABLECELLROW = DocumentApp.ElementType.TABLE_ROW;
  const body = doc.getBody();
  const cursor = doc.getCursor();
  const mainTable = body.findElement(TABLETYPE, null).getElement;
  const cursorTableRow = cursor.getElement().getParent().getParent();
  if (cursorTableRow.getType() == TABLECELLROW) {
    const cursorTable = cursorTableRow.getParent();
    cursorTableRow.getCell(0).setText(person);
    cursorTableRow.getCell(1).setText(remark);
    const cursorRowNumber = cursorTable.getChildIndex(cursorTableRow);
    const nextTableRow = cursorTable.insertTableRow(cursorRowNumber + 1);
    nextTableRow.insertTableCell(0);
    doc.setCursor(doc.newPosition(nextTableRow.insertTableCell(1), 0));
  }
}