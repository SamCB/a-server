import AWS from 'aws-sdk';

import crypto from 'crypto';

const DEFAULT_BUCKET = process.env.STORAGE_BUCKET;
const PASSWORD_FILE = '__passwords';
const UNAUTH_RESPONSE = {
    file: null,
    error: 'Unable to authenticate'
};

function getEndpoint(region, local) {
  if (local) {
    return new AWS.S3({
      endpoint: typeof local === 'string' ? local : 'http://localhost:4572',
      region: region
    });
  } else {
    return new AWS.S3({
      region: region
    });
  }
}

async function validateBucket(s3) {
  // Try to create a new bucket, just in case.
  try {
    await s3.createBucket({Bucket: DEFAULT_BUCKET}).promise();
  } catch(e) {
  }
  // Create and populate the password file if it doesn't exist
  try {
    const response = await s3.getObject({Bucket: DEFAULT_BUCKET, Key: PASSWORD_FILE}).promise();
    return JSON.parse(response.Body.toString());
  } catch(e) {
    // Not multi-process safe but if I wanted to be smart I wouldn't be using s3
    const passwords = {
      [process.env.NAME]: {salt: process.env.SALT, hash: process.env.PASSWORD}
    };
    await s3.putObject({
      Bucket: DEFAULT_BUCKET,
      Key: PASSWORD_FILE,
      Body: JSON.stringify(passwords)
    }).promise();
    return passwords;
  }
}

function hashSecret(salt, secret) {
  const hash = crypto.createHash('sha256');
  hash.update(salt);
  hash.update(secret);
  return hash.digest('hex');
}

function authenticate(passwords, secret) {
  const hashedSecret = hashSecret(passwords[process.env.NAME].salt, secret);
  // Should right now only be one name:
  const retval = passwords[process.env.NAME].hash === hashedSecret;
  return retval
}

function getFilename() {
  return `${process.env.name}.txt`;
}

export default function getPersistence(region, local) {
  const s3 = getEndpoint(region, local);
  const bucketValidation = validateBucket(s3);

  return {
    get: async (password) => {
      const passwords = await bucketValidation;
      if (authenticate(passwords, password)) {
        const name = getFilename();
        try {
          const response = await s3.getObject({
            Bucket: DEFAULT_BUCKET, Key: name
          }).promise();
          return {file: response.Body.toString()}
        } catch(e) {
          // The file doesn't exist right now
          return {file: ''}
        }
      } else {
        return UNAUTH_RESPONSE;
      }
    },
    save: async (password, text) => {
      const passwords = await bucketValidation;
      if (authenticate(passwords, password)) {
        const name = getFilename();
        const response = await s3.putObject({
          Bucket: DEFAULT_BUCKET, Key: name, Body: text
        }).promise();
        return {file: text};
      } else {
        return UNAUTH_RESPONSE;
      }
    }
  }
}
