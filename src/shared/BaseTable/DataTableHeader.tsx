/* DataTableHeader.tsx
 * This is an alternative to DataTable's "title" prop
 *   that uses less white-space
 *   It will not collide with the <BatchActions> menu.
 * When using directly (and not as part of BaseTable), the parent
 *   <div> MUST have `position: relative;` for correct styling.
 */
import React from "react";

interface Props {
  title: string;
  isCollapsed?: boolean; // opt boolean, if this table is collapsible
  collapseToggleFunc?: Function;
}

export const DataTableHeader: React.FC<Props> = ({
  title,
  isCollapsed = null,
  collapseToggleFunc,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          zIndex: 1,
          top: "8px",
          left: "8px",
        }}
      >
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            lineHeight: "36px",
            marginRight: "5px",
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};
export default DataTableHeader;
