import React from "react";
import { connect } from "react-redux";

import { Styles, Table, DateRangeColumnFilter } from "./TableHelper";

interface StateProps {
    tableData: any;
}
//the setForm it's to calculate the average. the logic where it's calculate in TableHelper line 276
interface OwnProps {
    setForm: any;
    tableData: any;
}
type Props = StateProps & OwnProps;
const TableInfo: React.FC<Props> = (props) => {
    const columns = React.useMemo(
        () => [
            {
                Header: "Person Info",
                columns: [
                    {
                        Header: "Name",
                        accessor: "name"
                    }
                ]
            },
            {
                Header: "Details",
                columns: [
                    {
                        Header: "method",
                        accessor: "method"
                    },
                    {
                        Header: "amount",
                        accessor: "amount"
                    },
                    {
                        Header: "date",
                        accessor: "date",
                        Filter: DateRangeColumnFilter,
                        filter: "dateBetween"
                    },
                    {
                        Header: "remark",
                        accessor: "remark"
                    }
                ]
            }
        ],
        []
    );

    return (
        <Styles>
            <Table
                columns={columns}
                data={props.tableData}
                setForm={props.setForm}
            />
        </Styles>
    );
};
// const mapStateToProps = (state: any) => ({
//   tableData: getTableData(state),
// });

// export default connect<StateProps>(mapStateToProps)(TableInfo);
export default TableInfo;
