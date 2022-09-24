import fs from "fs";
import { IWord } from "types";
import { PATH } from "constants/path";

export const saveWords = (newWords: IWord[]) => {
  fs.writeFileSync(PATH.wordsJson, JSON.stringify(newWords, null, 4));
};
