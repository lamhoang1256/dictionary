import { STATUS } from "constants/status";
import words from "data/words.json";
import { NextApiRequest, NextApiResponse } from "next";
import { IWord } from "types";
import catchAsync from "utils/catch-async";
import { saveWords } from "utils/helperApi";
import { ApiError, responseError, responseSuccess } from "utils/response";

const wordApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const search = query.search as string;
  let cloneWords: any = [...words];
  switch (method) {
    case "GET": {
      if (search) {
        cloneWords = cloneWords.filter((obj: IWord) => obj.word?.includes(search.toLowerCase()));
      }
      const response = {
        message: "Lấy danh sách từ vựng thành công!",
        data: cloneWords,
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

    default: {
      const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, `Method ${method} Not Allowed`);
      responseError(error, res);
    }
  }
};

export default catchAsync(wordApi);
