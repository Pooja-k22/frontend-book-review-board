import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register api
export const registerApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/register`, reqBody);
};

// login
export const loginApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/login`, reqBody);
};

// book post api
export const PostBookApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/add-book`, reqBody, reqHeader);
};

// book get All api
export const getbookApi = async () => {
  return await commonApi("GET", `${serverUrl}/get-book`);
};



// job get book details api
export const getBookDetailsApi = async (id) => {
  return await commonApi("GET", `${serverUrl}/book-detail/${id}`);
};

// review post api
export const addReviewApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/add-review`, reqBody, reqHeader);
};

// job get reviews
export const getReviewApi = async (id) => {
  return await commonApi("GET", `${serverUrl}/get-review/${id}`);
};

// get home job
export const getHomeJob = async () => {
  return await commonApi("GET", `${serverUrl}/latest-jobs`);
};

