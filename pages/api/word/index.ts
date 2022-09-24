import { NextApiRequest, NextApiResponse } from "next";
import { ApiError, responseError, responseSuccess } from "utils/response";
import fs from "fs";
import words from "data/words.json";
import { IWord } from "types";
import { STATUS } from "constants/status";
import catchAsync from "utils/catch-async";

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

const wordApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const response = {
    message: "Lấy danh sách từ vựng thành công!",
    data: words,
  };
  responseSuccess(res, response);
};

export default catchAsync(wordApi);
