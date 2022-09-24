import { STATUS } from "constants/status";
import words from "data/words.json";
import { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { saveWords } from "utils/helperApi";
import { ApiError, responseError, responseSuccess } from "utils/response";

const wordApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = query;
  switch (method) {
    case "GET": {
      const word = words.find((word) => word.id === id);
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
    }
    case "POST": {
      words.push(req.body);
      saveWords(words);
      const response = {
        message: "Thêm từ vựng thành công!",
      };
      responseSuccess(res, response);
    }
    case "PUT": {
      const word = words.find((x) => x.id === id);
      if (!word) {
        const error = new ApiError(STATUS.NOT_FOUND, "Không tìm thấy từ vựng");
        responseError(error, res);
        return;
      }
      Object.assign(word, req.body);
      saveWords(words);
      const response = {
        message: "Cập nhật thông tin từ vựng thành công!",
      };
      responseSuccess(res, response);
    }
    case "DELETE": {
      const newWords = words.filter((x) => x.id !== id);
      saveWords(newWords);
      const response = {
        message: "Xóa từ vựng thành công!",
      };
      responseSuccess(res, response);
    }
    default: {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method ${method} Not Allowed");
      responseError(error, res);
    }
  }
};

export default catchAsync(wordApi);
