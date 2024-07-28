export const REGEX = {
  ITEM: /^[\p{L}\p{N}\p{P}\p{S}\p{Z}]{3,50}$/u,
  SUPPLIER: /^[\p{L}\p{N}\p{P}\p{S}\p{Z}]{3,50}$/u,
  GARDEN: /^[a-zA-Z0-9\s]{3,50}$/,
  ADDRESS: /^[a-zA-Z0-9\s,.]{3,100}$/,
  DESCRIPTION: /^[a-zA-Z0-9\s,.]{3,500}$/,
  AREA: /^\d+(\.\d+)?$/,
  TITLE: /^[\s\p{L}\p{N}\p{P}\p{S}\p{Z}]{3,50}$/u,
  TEXT: /^[\s\p{L}\p{N}\p{P}\p{S}\p{Z}]{3,1000}$/u,
  USER: /^[a-zA-Z0-9]{3,20}$/,
  PWD: /^[A-z0-9!@#$%^&*()_+=-{};:'<>,./?]{4,12}$/,
  NAME: /^[A-z\s]{3,36}$/,
};
