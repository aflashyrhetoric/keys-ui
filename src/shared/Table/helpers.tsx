/* eslint-disable import/prefer-default-export */
import React from "react"
import { TableCell } from "carbon-components-react"
/*
 * If the value is:
 * - null, return "-"
 * - an object, return the object directly, allowing for super customized <td> cell
 * - otherwise, it's a value, so print the value wrapped in a <td>
 *
 * Optionally, also pass in a `style` object to be applied to the cell
 */
export const prepareTableCell = ({ value, id }, style = {}) => {
  // If null or undefined, print sentinel value of "-"
  // (CAUTION: 'typeof null' is equal to 'object' in JS, keep this if statement FIRST to ensure columns work properly)
  if (value === null || value === undefined)
    return <TableCell key={id}>-</TableCell>

  // If we're passing in a TableCell directly, just render it raw
  if (
    typeof value === "object" &&
    value.type &&
    value.type.displayName === "TableCell"
  ) {
    return value
  }

  // Otherwise, print the cell value as normal
  return (
    <TableCell title={value} key={id} style={style}>
      {value}
    </TableCell>
  )
}
