// lib/googleClient.ts
import * as vertex from '@google-cloud/aiplatform';
import path from 'path';

// Point to your service account key file
const keyFilePath = path.join(process.cwd(), 'keys', 'vertex-key.json');

const { PredictionServiceClient } = vertex.v1;

const client = new PredictionServiceClient({
  keyFilename: keyFilePath,
  projectId: 'rosy-proposal-420211',
});

export default client;
