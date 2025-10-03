function makeTable(data, columns) {
  if (!columns || columns.length === 0) return "";

  const normalize = (val) =>
    val === null || val === undefined ? "-" : String(val);

  const rows = [];
  const colWidths = Array(columns.length).fill(0);

  for (let row of data) {
    const rowVals = [];
    for (let i = 0; i < columns.length; i++) {
      const str = normalize(row[columns[i]]);
      rowVals.push(str);
      if (str.length > colWidths[i]) colWidths[i] = str.length;
    }
    rows.push(rowVals);
  }

  for (let i = 0; i < columns.length; i++) {
    if (columns[i].length > colWidths[i]) {
      colWidths[i] = columns[i].length;
    }
  }

  const makeSeparator = () =>
    "#" + colWidths.map((w) => "=".repeat(w)).join("#") + "#";

  const makeRow = (values) =>
    "|" + values.map((val, i) => val.padEnd(colWidths[i], " ")).join("|") + "|";

  const output = [];
  output.push(makeSeparator());
  output.push(makeRow(columns));
  output.push(makeSeparator());

  for (let row of rows) {
    output.push(makeRow(row));
    output.push(makeSeparator());
  }

  return output.join("\n");
}

module.exports = makeTable;
