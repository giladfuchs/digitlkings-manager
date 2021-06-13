const client = require("smartsheet");
const smartsheet = client.createClient({
    accessToken: "HCQm1K4WnGs0HL2QaGPOIEtKloi7ZbQNanNvA",
    logLevel: "info"
});
// var options = {
//     id: 607164378179460 // Id of Sheet
// };
const editJson = () => {
    const j = require("./aa.json");
    const columns = j.columns
        .map((column) => {
            delete column.id;
            delete column.index;
            delete column.version;
            delete column.validation;
            delete column.locked;
            delete column.lockedForUser;
            if (column.options && column.options.length == 1)
                delete column.options;
            return column;
        })
        .filter((cell) => Object.keys(cell).length > 0);
    const rows = j.rows
        .map((row) => {
            // console.log(typeof row.cells);
            const rowNew = row.cells
                .map((cell) => {
                    delete cell.columnId;
                    return cell;
                })
                .filter((cell) => Object.keys(cell).length > 0);
            return rowNew;
        })
        .slice(0, 4);
    console.log(columns);
    var options = {
        body: {
            name: "newstryy",
            columns: columns
            // rows: rows
        }
    };
    return options;
    // console.log(Object.keys(columns), Object.keys(rows));
};
var sheet = {
    name: "newsheet",
    columns: [
        {
            title: "Favorite",
            type: "CHECKBOX",
            symbol: "STAR"
        },
        {
            title: "Primary Column",
            primary: true,
            type: "TEXT_NUMBER"
        }
    ]
};

// Create sheet in "Sheets" folder
const create = (options) => {
    smartsheet.sheets
        .createSheet(options)
        .then(function (newSheet) {
            console.log(newSheet);
        })
        .catch(function (error) {
            console.log(error);
        });
};

options = editJson();
create(options);
// // Get sheet
// smartsheet.sheets
//     .getSheet(options)
//     .then(function (sheetInfo) {
//         const j = JSON.stringify(sheetInfo);
//         console.log(j);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
