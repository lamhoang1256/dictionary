import { STATUS } from "constants/status";
import words from "data/words.json";
import { NextApiRequest, NextApiResponse } from "next";
import { IWord } from "types";
import catchAsync from "utils/catch-async";
import { saveWords } from "utils/helperApi";
import { ApiError, responseError, responseSuccess } from "utils/response";

const wordApiWithId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = query;
  let cloneWords: any = [...words];
  switch (method) {
    case "GET": {
      const word = cloneWords.find((word: IWord) => word.id === id);
      if (!word) {
        const error = new ApiError(STATUS.NOT_FOUND, "Không tìm thấy từ vựng");
        responseError(error, res);
        return;
      }
      const response = {
        message: "Lấy chi tiết từ vựng thành công!",
        data: word,
      };
      responseSuccess(res, response);
      break;
    }

    case "POST": {
      cloneWords.push(req.body);
      saveWords(cloneWords);
      const response = {
        message: "Thêm từ vựng thành công!",
      };
      responseSuccess(res, response);
      break;
    }

    case "PUT": {
      const word = cloneWords.find((word: IWord) => word.id === id);
      if (!word) {
        const error = new ApiError(STATUS.NOT_FOUND, "Không tìm thấy từ vựng");
        responseError(error, res);
        return;
      }
      Object.assign(word, req.body);
      saveWords(cloneWords);
      const response = {
        message: "Cập nhật thông tin từ vựng thành công!",
      };
      responseSuccess(res, response);
      break;
    }

    case "DELETE": {
      cloneWords = cloneWords.filter((word: IWord) => word.id !== id);
      saveWords(cloneWords);
      const response = {
        message: "Xóa từ vựng thành công!",
      };
      responseSuccess(res, response);
      break;
    }

    default: {
      const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, `Method ${method} Not Allowed`);
      responseError(error, res);
    }
  }
};

export default catchAsync(wordApiWithId);
