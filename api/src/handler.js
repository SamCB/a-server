import persistence from './persistence';

const p = persistence(process.env.REGION, process.env.IS_OFFLINE !== undefined);

function formatResponse(statusCode, body, headers = {}) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "auth",
      ...headers
    }
  };
}

function result(callback) {
  return (result, err) => {
    if (err) {
      callback(err);
    } else {
      let response;
      if (result.error) {
        response = formatRespose(400, {error: result.error});
      } else {
        response = formatResponse(200, {file: result.file});
      }
      callback(null, response);
    }
  }
}

function badInput(callback, message) {
  callback(null, formatResponse(400, {error: message}));
}

export function getNote(event, context, callback) {
  const password = event.headers.auth;
  if (password === undefined) {
    badInput(callback, 'No auth header found');
  } else {
    p.get(password).then(result(callback));
  }

}

export function saveNote(event, context, callback) {
  const password = event.headers.auth;
  if (password === undefined) {
    badInput(callback, 'No Auth header found');
    return;
  }

  const body = JSON.parse(event.body);
  if (body.file === undefined) {
    badInput(callback, 'No file in body');
    return;
  }

  p.save(password, body.file).then(result(callback));
}

