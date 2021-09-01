function onOpen() {
  const ui = DocumentApp.getUi();
  ui.createMenu('議事録作成')
    .addItem('発言入力', 'showDialog')
    .addToUi();
}

function showDialog() {
  const html = HtmlService.createHtmlOutputFromFile('dialog');
  DocumentApp.getUi().showModalDialog(html, "議事録作成");
}

function send(form) {
  const OFFSET_ROW_INDEX = 5;

  const [person, remark] = form.remark.split(' ', 2);
  const doc = DocumentApp.getActiveDocument();
  const TABLETYPE = DocumentApp.ElementType.TABLE;
  const TABLECELLROW = DocumentApp.ElementType.TABLE_ROW;
  const body = doc.getBody();
  const cursor = doc.getCursor();
  const mainTable = body.findElement(TABLETYPE, null).getElement();
  let flag = false;
  if (cursor) {
    const cursorTableRow = cursor.getElement().getParent().getParent();
    if (cursorTableRow.getType() == TABLECELLROW) {
      const cursorTable = cursorTableRow.getParent();
      cursorTableRow.getCell(0).setText(person);
      cursorTableRow.getCell(1).setText(remark);
      const nextTableRow = cursorTable.insertTableRow(cursorTable.getChildIndex(cursorTableRow) + 1);
      nextTableRow.insertTableCell(0);
      doc.setCursor(doc.newPosition(nextTableRow.insertTableCell(1), 0));
      flag = true;
    }
  }
  if (flag == false) {
    const lastNewRow = mainTable.appendTableRow();
    const lastRowInd = mainTable.getChildIndex(lastNewRow) - 1;
    mainTable.getCell(lastRowInd - OFFSET_ROW_INDEX, 0).setText(person);
    mainTable.getCell(lastRowInd - OFFSET_ROW_INDEX, 1).setText(remark);
    lastNewRow.insertTableCell(0);
    doc.setCursor(doc.newPosition(lastNewRow.insertTableCell(1), 0));
  }
}