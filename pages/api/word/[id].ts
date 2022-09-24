import { STATUS } from "constants/status";
import { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { wordsApi } from "utils/wordApi";

const wordApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = query;
  switch (method) {
    case "GET": {
      const word = await wordsApi.getById(id as string);
      if (!word) {
        const error = new ApiError(STATUS.NOT_FOUND, "Không tìm thấy từ vựng");
        responseError(error, res);
      }
      const response = {
        message: "Lấy chi tiết từ vựng thành công!",
        data: word,
      };
      responseSuccess(res, response);
    }
    case "PUT": {
      await wordsApi.updateWord(id as string, req.body);
      const response = {
        message: "Cập nhật thông tin từ vựng thành công!",
      };
      responseSuccess(res, response);
    }
    case "DELETE": {
      await wordsApi.deleteWord(id as string);
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
