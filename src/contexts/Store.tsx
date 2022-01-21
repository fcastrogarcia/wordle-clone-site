import { createContext, useReducer } from "react";
import { Hit, Row } from "../types";

type Play = {
  activeRow: number;
  rows: Row[];
  words: string[];
  answer: "vejez";
};

type Reducer = (state: Play, action: any) => Play;

interface IContext {
  state: Play;
  dispatch: React.Dispatch<any>;
}

export const Context = createContext<IContext | null>(null);

const initialState: Play = {
  answer: "vejez",
  activeRow: 0,
  rows: [
    { value: "", hits: [] },
    { value: "", hits: [] },
    { value: "", hits: [] },
    { value: "", hits: [] },
    { value: "", hits: [] },
    { value: "", hits: [] },
  ],
  words: ["vejez", "crema", "tecla"],
};

const reducer: Reducer = (state, action) => {
  const { activeRow, answer, rows } = state;

  const word = rows[activeRow].value;

  switch (action.type) {
    case "BACKSPACE":
      return {
        ...state,
        rows: rows.map((row, index) => {
          if (index === activeRow) {
            return { value: row.value.slice(0, -1).trim(), hits: [] };
          }
          return row;
        }),
      };

    case "TYPE_CHAR":
      if (word.length === 5) return state;

      return {
        ...state,
        rows: rows.map((row, index) => {
          if (index === activeRow) {
            return { value: (row.value + action.payload).trim(), hits: [] };
          }
          return row;
        }),
      };

    case "EVAL_WORD":
      if (word.length < 5 || activeRow === 6) return state;

      let answerCopy: string = answer;

      let hits: Hit[] = [];

      word.split("").forEach((char, index) => {
        if (char === answer[index]) {
          answerCopy = answerCopy.replace(char, "");
          hits[index] = Hit.Hit;
        }
      });
      word.split("").forEach((char, index) => {
        if (char === answer[index]) return null;
        if (answerCopy.includes(char)) {
          answerCopy = answerCopy.replace(char, "");
          hits[index] = Hit.HasChar;
        } else {
          hits[index] = Hit.Miss;
        }
      });

      return {
        ...state,
        activeRow: activeRow + 1,
        rows: rows.map((row, index) => {
          if (index === activeRow) {
            return { ...row, hits };
          }
          return row;
        }),
      };

    default:
      return state;
  }
};

export const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};
