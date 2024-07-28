export const BASE_URLS = {
  DEVELOPMENT: "http://localhost:3500",
  PRODUCTION: "https://your-production-url.com",
};

export const API_URLS = {
  LOGIN: "/auth",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  GET_SIGNATURE: "/get-signature",
  PHOTO_DATA: "/do-something-with-photo",
  FINANCE: "/finances",
  INVENTORY: "/inventorys",
  NOTE: "/notes",
  USER: "/user",
  GARDEN: "/garden",

  // Add other API URLs here
};

export const CLOUDINARY_URL = {
  UPLOAD: `https://api.cloudinary.com/v1_1/kebunv2/auto/upload`,
  KEY: "989773282234796",
};
export const DEFAULT_IMAGE = {
  KEBUN: `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png`,
};
