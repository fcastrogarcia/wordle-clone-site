import { useEffect, useState } from "react";
import styles from "./Grid.module.scss";
import { useContext } from "react";
import { Context } from "../../contexts/Store";
import { Row, Hit } from "../../types";
import Confetti from "../Confetti";

function getHitClass(hit: Hit) {
  switch (hit) {
    case Hit.Hit:
      return "hit";
    case Hit.HasChar:
      return "hasChar";
    case Hit.Miss:
      return "miss";
    default:
      return "";
  }
}

const RowComponent: React.FC<{ row: Row }> = ({ row }) => {
  const cells: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    cells.push(
      <div
        key={i.toString()}
        id={`wordle-cell-${i + 1}`}
        className={`${styles["wordle-cell"]} ${
          styles[`wordle-cell--${getHitClass(row.hits[i])}`]
        }`}
      >
        {(row.value[i] || "").toUpperCase()}
      </div>
    );
  }

  return <div className={styles["wordle-row"]}>{cells}</div>;
};

const Grid = () => {
  const [victory, setVictory] = useState(false);

  const ctx = useContext(Context);

  useEffect(() => {
    const justHitsNoMisses = ctx?.state.rows.some(row => {
      return row.hits.every(hit => hit === Hit.Hit);
    });

    if (justHitsNoMisses) setVictory(true);
  }, [ctx?.state.rows]);

  return (
    <div className={styles["wordle-grid"]}>
      {ctx?.state.rows.map((row, i) => (
        <RowComponent key={i.toString()} row={row} />
      ))}
      <Confetti />
    </div>
  );
};

export default Grid;
