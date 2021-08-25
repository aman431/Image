import { tryCatch } from "fp-ts/TaskEither"; // handling catch error
import { base_url } from "../../constant/uri"; // base url
import { key } from "../../constant/secret"; // secrete key of api

// type of payload
type Details = {
  searchItem: string;
};

// search image
const search = async (payload: Details) => {
  const response = await fetch(
    base_url +
      "?method=flickr.photos.search&api_key=" +
      key +
      "&tags=" +
      payload.searchItem +
      "&per_page=10&page=1&format=json&nojsoncallback=1"
  );

  // throw error when response status is above 400
  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  // convert response in json
  const res = await response.json();
  return res;
};

// This is a anoyomus function binding whole api function in try catch checking response and error.
export default (payload: Details) =>
  tryCatch(
    () => search(payload),
    (reason) => new Error(String(reason))
  )();
