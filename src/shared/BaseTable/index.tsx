/* eslint-disable react/jsx-props-no-spreading */
/*
 * This table uses Carbon's DataTable to make certain operations easier:
 *   batch select, edit/delete interactions w/ success notifications, column visibility, etc
 * Some features are still WIP.
 * If you're JUST trying to display data, look at the standard <DataTable> component
 */
import React, { useState, useEffect } from "react"
import {
  DataTable,
  TableContainer,
  TableCell,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableHead,
  TableHeader,
  TableExpandHeader,
  TableRow,
  TableSelectAll,
  TableBody,
  Table,
  Button,
} from "carbon-components-react"
import { Edit32, TrashCan32 } from "@carbon/icons-react"
import DataTableHeader from "./DataTableHeader"
import { TableHeaderDataShape, TableRowShape } from "./types"
import BaseTableRow from "./BaseTableRow"

interface Props {
  title?: string
  description?: string
  style?: object
  useZebraStyles?: boolean

  headerData: TableHeaderDataShape[] // presentational header data
  rowData: any // presentational row data; should be a .map() on the array passed in for rawRowData
  rawRowData?: any[] // raw data

  useExpandedRows?: boolean // see ./README.md for more info

  rowHeight?: string // DataTable Row Height

  allowHeaderTextWrapping?: boolean // allows for table headers to wrap text, useful for shrinking wide tables

  collapseOverride?: boolean // BaseTable internally tracks collapsed state (on toggle), but this will override

  openModal?: Function // func for cond'ly rendering a <Modal> in the parent (based on parent's state)
  openDeleteModal?: Function // func for cond'ly rendering a deletion <Modal> in the parent (based on parent's state)
  openBatchEditModal?: Function
  updateFormState?: Function
  initializeFormState?: Function // for "add new", we may want to pre-fill some fields
  updateEditingMode?: Function
  onBatchDelete?: Function

  deleteActionText?: string

  // A series of switches to disable key parts of UI
  disableAllControls?: boolean
  disableAddNew?: boolean
  disableBatch?: boolean // controls visibility of batch selection checkboxes
  disableBatchEdit?: boolean // controls visibility of batch edit icon button in the action bar
  disableBatchDelete?: boolean
  disableOverflow?: boolean
  disableOverflowEdit?: boolean
  disableOverflowDelete?: boolean
}

export enum EditingState {
  INACTIVE,
  CREATE,
  UPDATE,
  BATCHUPDATE,
}

export const getSelectedRawRowsData = (
  selectedRows: any[],
  rowData: any[],
  rawRowData: any[],
) => {
  // selectedRows and rowData match on id,
  // and rowData and rawRowData match on index position.

  const selectedRowIndexes = selectedRows.map(sr =>
    rowData.findIndex(rd => sr.id === rd.id),
  )

  return selectedRowIndexes.map(i => rawRowData[i])
}

export const BaseTable: React.FC<Props> = ({
  title,
  description,
  style,
  useZebraStyles = false,
  rowData,

  headerData,
  rawRowData,
  rowHeight = "tall",

  useExpandedRows = false,

  collapseOverride = false,

  allowHeaderTextWrapping = false,

  updateEditingMode,
  updateFormState,
  initializeFormState = null,

  openModal,
  openDeleteModal,
  openBatchEditModal,

  onBatchDelete,

  deleteActionText = "Delete",

  disableAllControls = false,
  disableBatch = false,
  disableBatchEdit = false,
  disableBatchDelete = false,
  disableAddNew = false,
  disableOverflow = false,
  disableOverflowEdit = false,
  disableOverflowDelete = false,
}) => {
  const [isCollapsed, updateIsCollapsed] = useState(collapseOverride)

  // BaseTable's collapsed state will always yield to the parent
  useEffect(() => {
    updateIsCollapsed(collapseOverride)
  }, [collapseOverride])

  const toggleCollapse = () => {
    updateIsCollapsed(!isCollapsed)
  }

  return (
    <div style={{ ...style, position: "relative" }}>
      <DataTableHeader
        title={title}
        isCollapsed={isCollapsed}
        collapseToggleFunc={toggleCollapse}
      />

      {
        <>
          <DataTable
            rows={rowData}
            rawRowData={rawRowData}
            headers={headerData}
            render={({
              rows,
              headers,
              getExpandHeaderProps,
              getHeaderProps,
              getRowProps,
              getSelectionProps,
              getBatchActionProps,
              selectedRows,
            }) => {
              return (
                <TableContainer
                  description={description}
                  style={{ marginBottom: "1rem", overflowX: "visible" }}
                >
                  <TableToolbar>
                    {!disableAllControls && !disableBatch && (
                      <TableBatchActions
                        {...getBatchActionProps()}
                        style={{ zIndex: 1 }}
                      >
                        {!disableBatchDelete && (
                          <TableBatchAction
                            tabIndex={
                              getBatchActionProps().shouldShowBatchActions
                                ? 0
                                : -1
                            }
                            renderIcon={TrashCan32}
                            onClick={() => {
                              const selectedRawRowsData =
                                getSelectedRawRowsData(
                                  selectedRows,
                                  rowData,
                                  rawRowData,
                                )

                              onBatchDelete(selectedRawRowsData)
                            }}
                          >
                            Delete
                          </TableBatchAction>
                        )}

                        {!disableBatchEdit && (
                          <TableBatchAction
                            tabIndex={
                              getBatchActionProps().shouldShowBatchActions
                                ? 0
                                : -1
                            }
                            renderIcon={Edit32}
                            onClick={() => {
                              updateEditingMode(EditingState.BATCHUPDATE)

                              const selectedRawRowsData =
                                getSelectedRawRowsData(
                                  selectedRows,
                                  rowData,
                                  rawRowData,
                                )

                              updateFormState({
                                selectedRawRowsData,
                              })

                              openBatchEditModal()
                            }}
                          >
                            Edit
                          </TableBatchAction>
                        )}
                      </TableBatchActions>
                    )}
                    <TableToolbarContent>
                      {!disableAllControls && !disableAddNew && (
                        <Button
                          tabIndex={
                            getBatchActionProps().shouldShowBatchActions
                              ? -1
                              : 0
                          }
                          onClick={() => {
                            updateEditingMode(EditingState.CREATE)

                            // Update the form with current row values.
                            //   If preset values are desired, call that function instead
                            if (
                              typeof initializeFormState !== "undefined" &&
                              initializeFormState !== null
                            ) {
                              initializeFormState()
                            }
                            openModal()
                          }}
                          size="small"
                          kind="primary"
                        >
                          Add new
                        </Button>
                      )}
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table size={rowHeight} useZebraStyles={useZebraStyles}>
                    {rows.length !== 0 && (
                      <TableHead>
                        <TableRow>
                          {/* Batch Selection <th> */}
                          {!disableAllControls && !disableBatch && (
                            <TableSelectAll {...getSelectionProps()} />
                          )}
                          {useExpandedRows && (
                            <TableExpandHeader
                              style={{ minWidth: "50px" }}
                              {...getExpandHeaderProps()}
                            />
                          )}
                          {headers.map((header: TableHeaderDataShape) => {
                            return (
                              <TableHeader
                                key={header.key}
                                style={
                                  allowHeaderTextWrapping
                                    ? header.style
                                    : {
                                        ...{ whiteSpace: "nowrap" },
                                        ...header.style,
                                      } || null
                                }
                                {...getHeaderProps({ header })}
                              >
                                {header.header}
                              </TableHeader>
                            )
                          })}

                          {/* Empty TableHeader for the OverflowMenu */}
                          {!disableAllControls && !disableOverflow && (
                            <TableHeader style={{ width: "50px" }} />
                          )}
                        </TableRow>
                      </TableHead>
                    )}
                    <TableBody>
                      {rows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={headerData.length + 1} />
                        </TableRow>
                      )}
                      {rows.map((row: TableRowShape, index) => (
                        <BaseTableRow
                          key={row.id}
                          useExpandedRows={useExpandedRows}
                          headers={headers}
                          getSelectionProps={getSelectionProps}
                          getRowProps={getRowProps}
                          rawRowData={rawRowData}
                          rowData={rowData}
                          row={row}
                          index={index}
                          disableAllControls={disableAllControls}
                          disableBatch={disableBatch}
                          disableOverflow={disableOverflow}
                          disableOverflowEdit={disableOverflowEdit}
                          disableOverflowDelete={disableOverflowDelete}
                          updateFormState={updateFormState}
                          updateEditingMode={updateEditingMode}
                          openModal={openModal}
                          openDeleteModal={openDeleteModal}
                          deleteActionText={deleteActionText}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            }}
          />
        </>
      }
    </div>
  )
}

export default BaseTable
