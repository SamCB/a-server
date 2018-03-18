import 'whatwg-fetch';

const ENDPOINT = process.env.REACT_APP_API;

export default async function submit(password, text) {
  let response;
  try {
    response = await fetch(
      `${ENDPOINT}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: password
        },
        body: JSON.stringify({file: text})
      }
    )
  } catch(e) {
    console.log("Error:");
    console.log(e);
    throw new Error(
      `Something went wrong sending data:\n${JSON.stringify(e)}`
    );
  }

  if (response.status < 200 || response.status >= 300) {
    console.log("Error:");
    console.log(response);
    const body = await response.texxt();
    console.log(body);
    throw new Error(
      `The server returned an error:\n${body}`
    );
  } else {
    const result = await response.json();
    return result.file;
  }
}
