export enum Hit {
  Miss = 0,
  HasChar = 1,
  Hit = 2,
}

export type Row = {
  value: string;
  hits: Hit[];
};
