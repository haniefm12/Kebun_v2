import axios from "axios";
import { API_URLS, BASE_URLS, CLOUDINARY_URL } from "../../config/urls";
const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return BASE_URLS.PRODUCTION;
  }
  return BASE_URLS.DEVELOPMENT;
};

const api = axios.create({
  baseURL: getBaseUrl(), // your base URL
});

const cloudinaryApi = axios.create({
  baseURL: CLOUDINARY_URL.UPLOAD, // Cloudinary base URL
});
const getSignature = async () => {
  try {
    const response = await api.get(API_URLS.GET_SIGNATURE);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const uploadImageToCloudinary = async (data, onUploadProgress) => {
  try {
    const response = await cloudinaryApi.post("", data, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const doSomethingWithPhoto = async (photoData) => {
  try {
    const response = await api.post(API_URLS.PHOTO_DATA, photoData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { uploadImageToCloudinary, doSomethingWithPhoto, getSignature };
