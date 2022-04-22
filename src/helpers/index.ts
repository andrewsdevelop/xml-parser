export const getTabsList = (xmlDom: Document): string[] => {
  const tabNames: string[] = [];
  const tabs = xmlDom.getElementsByTagName("tab");

  for (const key in tabs) {
    if (Object.prototype.hasOwnProperty.call(tabs, key)) {
      const tab = tabs[key];
      const id = tab.getAttribute("id");
      if (id) {
        tabNames.push(id);
      }
    }
  }

  return tabNames;
};

export const getColumnNames = (xmlDom: Document, tabName: string) => {
  const rows: Record<string, string>[] = [];

  // eslint-disable-next-line
  const xmlRows = xmlDom
    .getElementById(tabName)!
    .getElementsByTagName("table")[0]!
    .getElementsByTagName("columns")!;

  for (const xmlRowIndex in xmlRows) {
    if (isNaN(parseInt(xmlRowIndex, 10))) {
      continue;
    }
    const xmlRow = xmlRows[xmlRowIndex];
    const tds = xmlRow.getElementsByTagName("column");
    const item: Record<string, string> = {};

    for (const tdIndex in tds) {
      const td = tds[tdIndex];
      if (isNaN(parseInt(tdIndex, 10))) {
        continue;
      }
      const id = td.getAttribute("id");

      if (id) {
        item[id] = td.innerHTML.trim();
      }
    }
    rows.push(item);
  }
  return rows;
};

export const mainHeaders = (colNames: string[]) => {
  const newValues: Record<string, string | number>[] = [];

  colNames.forEach((oldValue) => {
    if (!oldValue.match(/old|actual/gi)) {
      newValues.push({
        name: mainHeaderTitles(oldValue),
        length: 1,
      });
    } else {
      const index =
        newValues.findIndex(
          ({ name }) => name === mainHeaderTitles(oldValue)
        ) !== -1;
      if (index) {
        return;
      }
      newValues.push({
        name: mainHeaderTitles(oldValue),
        length: 2,
      });
    }
  });

  return newValues;
};

export const mainHeaderTitles = (value: string) => {
  switch (value) {
    case "new-data":
      return "Новые заявки";
    case "old-primary":
    case "actual-primary":
      return "Предварительные";

    case "actual-periodic":
    case "old-periodic":
      return "Периодические";

    case "vaccination-data":
      return "Вакцинация";

    case "closed-data":
      return "Завершенные";

    default:
      return "";
  }
};
