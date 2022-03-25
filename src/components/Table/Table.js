import cls from "./Table.module.css";
const testHeaders = ["Label", "Value", "% Total", "% Change"];

const testRows = [
  [1, 2, "40%", 30],
  [3, 4, "40%", 30],
  [5, 6, "40%", 30],
  [1, 2, "40%", 30],
];
const Table = (props) => {
  const { headers = testHeaders, rows = testRows, className } = props;
  return (
    <table className={[cls.table, className].join(" ")}>
      <tbody>
        <tr className={cls.headersWrapper}>
          {headers.map((header) => {
            return <th key={`header_${header}`}>{header}</th>;
          })}
        </tr>
        < >
          {rows.map((row, i) => {
            return (
              <tr className={cls.row} key={`row_${i}`}>
                {row.map((value, j) => {
                  return <td key={`row_${i}_item_${j}`}>{value}</td>;
                })}
              </tr>
            );
          })}
        </>
      </tbody>
    </table>
  );
};
export default Table;
