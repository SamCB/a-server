import persistence from './persistence';

const p = persistence(process.env.REGION, process.env.IS_OFFLINE !== undefined);

function result(callback) {
  return (result, err) => {
    if (err) {
      callback(err);
    } else {
      let response;
      if (result.error) {
        response = {statusCode: 400, body: JSON.stringify({error: result.error})}
      } else {
        response = {statusCode: 200, body: JSON.stringify({file: result.file})}
      }
      callback(null, response);
    }
  }
}

function badInput(callback, message) {
  callback(null, {statusCode: 400, body: JSON.stringify({error: message})});
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

export function webapp(event, context, callback) {

}
