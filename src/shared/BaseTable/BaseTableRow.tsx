/* eslint-disable react/jsx-props-no-spreading */

// THIS IS AN INTERNAL COMPONENT for BaseTable.tsx.
// You almost definitely should not use this directly.

// BaseTable uses selectable rows by default.
// The `useExpandedRows` prop instead pipes the data into Expandable rows, by providing an `expanded_data` property for each item in rowData.
// This component handles the smarts for conditionally rendering one row vs the other.

import React from "react";
import {
  OverflowMenu,
  OverflowMenuItem,
  TableExpandRow,
  TableExpandedRow,
  TableRow,
  TableSelectRow,
  TableCell,
} from "carbon-components-react";
import { prepareTableCell } from "../Table/helpers";
import { EditingState } from ".";

interface Props {
  useExpandedRows: boolean;
  headers: any[];

  getSelectionProps: Function;
  getRowProps: Function;
  rawRowData: any;
  rowData: any;
  row: any;
  index: number;

  disableAllControls: boolean;
  disableBatch: boolean;
  disableOverflow: boolean;
  disableOverflowEdit: boolean;
  disableOverflowDelete: boolean;
  updateFormState: Function;
  updateEditingMode: Function;
  openModal: Function;
  openDeleteModal: Function;
  deleteActionText: string;
}

const BaseTableRow: React.FC<Props> = ({
  useExpandedRows = false,
  headers,

  getSelectionProps,
  getRowProps,
  rawRowData, // the data in our api response
  rowData, // the metadata that we add to each carbonized row (e.g. opacity)
  row, // the Carbonized row data

  index,

  updateFormState,
  updateEditingMode,
  openModal,
  openDeleteModal,
  deleteActionText,

  disableAllControls,
  disableBatch,
  disableOverflow,
  disableOverflowEdit,
  disableOverflowDelete,
}: Props) => {
  // The bread and butter of this component: simply toggle the desired Row component based on "useExpandedRows"
  const Row = useExpandedRows ? TableExpandRow : TableRow;

  return (
    <>
      <Row
        style={{
          opacity: rowData[index] && rowData[index].lowOpacity === true ? 0.25 : 1,
        }}
        key={row.id}
        {...getRowProps({ row })}
      >
        {!disableAllControls && !disableBatch && <TableSelectRow {...getSelectionProps({ row })} />}
        {row.cells.map(cell => prepareTableCell(cell))}

        {!disableAllControls && !disableOverflow && (
          <TableCell key={`overflow-menu-${row.id}`}>
            <OverflowMenu
              flipped // the menu opens to the left
              ariaLabel={`More options for ${row.id}`}
            >
              {!disableOverflowEdit && (
                <OverflowMenuItem
                  itemText="Edit"
                  onClick={() => {
                    const currentRecord = rawRowData[index];

                    updateFormState({
                      ...currentRecord,
                      id: currentRecord.id,
                    });

                    updateEditingMode(EditingState.UPDATE);
                    openModal();
                  }}
                />
              )}
              {!disableOverflowDelete && (
                <OverflowMenuItem
                  hasDivider
                  isDelete
                  itemText={deleteActionText}
                  onClick={() => {
                    const currentRecord = rawRowData[index];

                    updateFormState({
                      ...currentRecord,
                      id: currentRecord.id,
                    });

                    openDeleteModal();
                  }}
                />
              )}
            </OverflowMenu>
          </TableCell>
        )}
      </Row>
      {useExpandedRows && (
        <TableExpandedRow colSpan={headers.length + 3}>
          <>
            {(rowData[index] && rowData[index].expanded_data) ||
              "No additional information to show"}
          </>
        </TableExpandedRow>
      )}
    </>
  );
};

export default BaseTableRow;
