import { tryCatch } from "fp-ts/TaskEither"; // handling catch error
import { base_url } from "../../constant/uri"; // base url
import { key } from "../../constant/secret"; // secrete key of api

// recent image
const getrecent = async () => {
  const response = await fetch(
    base_url +
      "/?method=flickr.photos.getRecent&api_key=" +
      key +
      "&tags=nyc&per_page=12&page=1&format=json&nojsoncallback=1"
  );

  // throw error when response status is above 400
  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  // convert response in json
  const res = await response.json();
  return res;
};

// anoyomus function binding whole function in try catch checking response and error.
export default () =>
  tryCatch(
    () => getrecent(),
    (reason) => new Error(String(reason))
  )();
