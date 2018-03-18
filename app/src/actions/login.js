import 'whatwg-fetch';

const ENDPOINT = process.env.REACT_APP_API;

export default async function login(password) {
  let response;
  try {
    response = await fetch(
      `${ENDPOINT}/note`, {
        method: 'GET',
        headers: { auth: password }
      }
    )
  } catch(e) {
    console.log("Error:");
    console.log(e);
    throw new Error(
      `Something went wrong fetching data:\n${JSON.stringify(e)}`
    );
  }

  if (response.status < 200 || response.status >= 300) {
    console.log("Error:");
    console.log(response);
    const body = await response.text();
    console.log(body);
    throw new Error(
      `The server returned an error:\n${body}`
    );
  } else {
    return response.text();
  }
}
