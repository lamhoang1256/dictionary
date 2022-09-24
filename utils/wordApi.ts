import fs from "fs";
import words from "data/words.json";
import { IWord } from "types";

const addNewWord = (word: IWord) => {
  words.push(word);
  saveData(words);
};

const updateWord = (id: string, payload: Partial<IWord>) => {
  const word = words.find((x) => x.id === id);
  if (!word) return;
  Object.assign(word, payload);
  saveData(words);
};

const deleteWord = (id: string) => {
  const newWords = words.filter((x) => x.id !== id);
  saveData(newWords);
};

const saveData = (newWords: IWord[]) => {
  fs.writeFileSync("data/words.json", JSON.stringify(newWords, null, 4));
};

export const wordsApi = {
  getAll: () => words,
  getById: (id: string) => words.find((word) => word.id === id),
  addNewWord,
  deleteWord,
  updateWord,
};
