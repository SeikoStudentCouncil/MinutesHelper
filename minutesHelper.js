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
  const [person, ...tmp] = form.remark.split(/[\s]/),
    remark = tmp.join('');
  function setPersonAndRemark(row) {
    if (row.getCell(1).getText()) {
      row = insertNewTableRowBelow(mainTable, row);
      for (i = 0; i < 2; i++) row.insertTableCell(i);
    }
    row.getCell(0).setText(person);
    row.getCell(1).setText(remark);
    return row;
  }

  const doc = DocumentApp.getActiveDocument();
  function setCursorToNext(nextTableRow) {
    nextTableRow.insertTableCell(0);
    doc.setCursor(doc.newPosition(nextTableRow.insertTableCell(1), 0));
  }

  const TABLETYPE = DocumentApp.ElementType.TABLE;
  const TABLECELLROW = DocumentApp.ElementType.TABLE_ROW;
  const cursor = doc.getCursor();
  const mainTable = doc.getBody().findElement(TABLETYPE, null).getElement();
  clearNullTableRows(mainTable);
  let flag = false;
  if (cursor) {
    let cursorTableRow = cursor.getElement().getParent().getParent();
    if (cursorTableRow.getType() == TABLECELLROW) {
      const cursorTable = cursorTableRow.getParent();
      currentTableRow = setPersonAndRemark(cursorTableRow);
      setCursorToNext(insertNewTableRowBelow(cursorTable, currentTableRow));
      flag = true;
    }
  }
  if (flag == false) {
    const lastNewRow = mainTable.appendTableRow();
    let lastRow = mainTable.getRow(mainTable.getNumRows() - 2);
    insertNewTableRowBelow(mainTable, lastRow);
    setPersonAndRemark(lastRow);
    setCursorToNext(lastNewRow);
  }
}

function insertNewTableRowBelow(table, currentTableRow) {
  return table.insertTableRow(table.getChildIndex(currentTableRow) + 1);
}

function clearNullTableRows(table) {
  const rowsNum = table.getNumRows();
  for (let r = rowsNum - 1; r >= 0; r--) {
    if (table.getRow(r).getNumCells() < 2) table.removeRow(r);
  }
}

function debug() {
  send({
    remark: "person remark"
  });
}