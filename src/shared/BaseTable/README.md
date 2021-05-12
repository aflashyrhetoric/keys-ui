# BaseTable

## What is BaseTable?

BaseTable is a "wrapper component" around Carbon's own table components, with some added features:

- assisting in handling CRUD operations (namely, triggering Modal visibility in the consuming component and updating a parent's form state so we can update/delete records)
- abstraction for injecting custom `<td>` cells, for when we need inline inputs or special animations instead of simply displaying values
- customizing column-specific styling and row height
- collapsing and uncollapsing the table
- "feature flag" props that allow fairly fine-tuned control over which parts of the table's UI renders (allowing for gradual feature roll-out)
- some CSS customization/overrides to maximize screen real estate

## When do I use this?

- Need a simple, tabular view of a SINGLE RECORD only?
  - Check out: `LabeledObject.tsx`.
- Need a simple, tabular view of around ~25 RECORDS that doesn't provide any interactivity?
  - Check out: `LabeledStructuredList.tsx`.

If those don't fit your use-case, you're probably in the right place.

## Use-cases & Examples

In the interest of brevity, only some key usecases will be explained below.

### How do I simply show some data?

By default, BaseTable only _needs_ 3 props:

- `title`
- `headerData`
- `rowData`

#### Example:

```tsx
<BaseTable
  title="Information about fruits"
  headerData={[
    {
      header: "Fruit Name",
      key: "fruit_name",
    },
    {
      header: "Color",
      key: "color",
    },
  ]}
  rowData={[
    {
      fruit_name: "Blueberry",
      color: "blue",
    },
    {
      fruit_name: "Cherry",
      color: "dark red",
    },
  ]}
/>
```

### How do I use BaseTable to do some CRUD operations?

NOTE: Useful reference examples of the updated CRUD flow are available on the EmploymentHurdle and HistoryHurdle.

The gist of the approach:

1. In the parent, create various `<Modal>`s to house the forms and inputs
2. In the parent, create React hooks to control the visibility of those `<Modal>`s
3. Pass the update functions for the hooks created in Step #2 into BaseTable using the following props:
   - `openModal` for primary data entry
   - `openDeleteModal` for deletion confirmation
   - `openBatchEditModal` for batch editing
4. Pass the parent's `formState` and `updateFormState` hooks into BaseTable.
5. BaseTable has certain UI components hooked up to trigger those update functions on click.

#### Example

BaseTable contains an overflow menu with items `Edit` and `Delete.`

When `Edit` is clicked for some row, BaseTable will call the `updateFormState` function (that was passed in as a prop) with that row's data.
Then, BaseTable will call `openModal(true)` to open the corresponding modal (containing the form) in the parent.
Since the `formState` was updated, the controlled inputs on the form should be populated, and the user can make whatever updates they want.

### How do I use the expandable rows function?

BaseTable offers you to tuck additional data (for a single row) in an expandable section.

#### Steps

1. Add the `useExpandedRows` flag into BaseTable: `<BaseTable useExpandedRows />`
2. In the `rowData`, set property `expanded_data` to whatever you want.

#### Example

Suppose we have a table about fruits. Each row is a single fruit.

For each fruit, we want to show information about `health benefits` in an expandable section (but NOT in the "main" table).

```tsx
// FoodInformationHurdle.tsx
const fruitData = someAPIResponse();

<BaseTable
  title="Information about fruits"
  useExpandedRows // <-- Add this prop!!!
  headerData={[
    {
      header: "Fruit Name",
      key: "fruit_name",
    },
    {
      header: "Color",
      key: "color",
    },
  ]}
  rowData={fruitData.map(fruit => {
    const { fruit_name, color, health_benefits } = fruit;
    return {
      fruit_name,
      color,
      // BaseTable will automatically put this in the expanded row section
      expanded_data: <p>{health_benefits}</p>,
    };
  })}
/>;
```

### How do I customize table headings? (e.g. widths)?

Trying to allow word-wrapping to condense a wide table?

- Use `allowHeaderTextWrapping= {false}`

For more specific customization, provide a `style` object as part of the `headerData` prop.

#### Example

```tsx
<BaseTable
  headerData={[
    {
      header: "Narrow heading",
      key: "is_archived", // booleans are usually stringified as short strings e.g. "yes"
      style: { minWidth: "50px" },
    },
    {
      header: "Wide heading",
      key: "address",
      style: { minWidth: "180px" },
    },
    {
      header: "Critical heading",
      key: "is_critical",
      style: { color: "red" },
    },
  ]}
/>
```
