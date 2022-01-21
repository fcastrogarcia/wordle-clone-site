import { useEffect, useContext } from "react";
import { Context } from "../contexts/Store";

const useHandleKeys = () => {
  const ctx = useContext(Context);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Backspace") {
      ctx?.dispatch({ type: "BACKSPACE" });
    }

    if (e.key === "Enter") {
      ctx?.dispatch({ type: "EVAL_WORD" });
    }

    const isAlphabeticChar = e.code.includes("Key");

    if (isAlphabeticChar) {
      ctx?.dispatch({ type: "TYPE_CHAR", payload: e.key.toLowerCase() });
    }

    return null;
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
};

export default useHandleKeys;
