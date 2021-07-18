import React from "react";
import styled from "styled-components";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy
} from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";

export const Styles = styled.div`
    padding: 2rem;
    margin: 2rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th td {
            margin: 0.3rem 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`;

// Define a default UI for filtering
export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{" "}
            <input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: "1.1rem",
                    border: "0"
                }}
            />
        </span>
    );
}

// Define a default UI for filtering
export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
}) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
}) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={(e) => {
                    setFilter(parseInt(e.target.value, 10));
                }}
            />
            <button onClick={() => setFilter(undefined)}>Off</button>
        </>
    );
}

export function DateRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
    const [min, max] = React.useMemo(() => {
        let min = new Date(preFilteredRows[0].values[id]);
        let max = new Date(preFilteredRows[0].values[id]);
        preFilteredRows.forEach((row) => {
            min =
                new Date(row.values[id]) <= min
                    ? new Date(row.values[id])
                    : min;
            max =
                new Date(row.values[id]) >= max
                    ? new Date(row.values[id])
                    : max;
        });
        return [min, max];
    }, [id, preFilteredRows]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <input
                value={filterValue[0] || ""}
                type="date"
                min={min.toISOString().slice(0, 10)}
                onChange={(e) => {
                    const val = e.target.value;
                    console.log(e.target.value);
                    setFilter((old = []) => [val ? val : undefined, old[1]]);
                }}
                style={{
                    width: "170px",
                    marginRight: "0.5rem"
                }}
            />
            to
            <input
                value={filterValue[1] || ""}
                type="date"
                max={max.toISOString().slice(0, 10)}
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [old[0], val ? val : undefined]);
                }}
                style={{
                    width: "170px",
                    marginLeft: "0.5rem"
                }}
            />
        </div>
    );
}

export function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
function dateBetweenFilterFn(rows, id, filterValues) {
    let sd = new Date(filterValues[0]);
    let ed = new Date(filterValues[1]);
    return rows.filter((r) => {
        var time = new Date(r.values[id]);
        if (filterValues.length === 0) return rows;
        return time >= sd && time <= ed;
    });
}

dateBetweenFilterFn.autoRemove = (val) => !val;
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export function Table({ columns, data, setForm }) {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            dateBetween: dateBetweenFilterFn /*<- LIKE THIS*/,

            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                              .toLowerCase()
                              .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy
    );

    // if (rows.length > 0) {
    //   let avgPass = rows
    //     .map((row) => row.values.madeDadeline)
    //     .reduce((a, b) => (b ? ++a : a), 0);
    //   if (avgPass > 0) {
    //     const scoreOfPass = rows
    //       .filter((row) => row.values.madeDadeline)
    //       .map((row) => row.values.score);
    //     const avgScore = scoreOfPass.reduce((a, b) => a + b) / scoreOfPass.length;
    //     avgPass = Math.floor((avgPass / rows.length) * 100);

    //     setForm({ avgPass, avgScore });
    //   } else {
    //     setForm({ avgPass, avgScore: 0 });
    //   }
    // } else {
    //   setForm({ avgPass: 0, avgScore: 0 });
    // }

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // <div
                                //     style={{
                                //         display: "flex",
                                //         flexDirection: "column"
                                //     }}
                                // >

                                <th>
                                    {column.render("Header")}
                                    <span
                                        className="row"
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : " 💹 "}
                                    </span>

                                    {/* Render the columns filter UI */}
                                    <div style={{ margin: "2px" }}>
                                        {column.canFilter
                                            ? column.render("Filter")
                                            : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: "left"
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.value}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <div></div>
        </>
    );
}

// Define a custom filter filter export function!
export function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

// This is an autoRemove method on the filter export function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";
