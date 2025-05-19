import client from './googleClient';

const location = 'us-central1'; // or your region
const model = 'textembedding-gecko@001';

export async function getEmbedding(text: string): Promise<number[]> {
  const request = {
    endpoint: `projects/rosy-proposal-420211/locations/${location}/publishers/google/models/${model}`,
    
    instances: [{ stringValue: text }],
  };

  interface PredictionResponse {
    predictions?: {
      embeddings?: {
        values?: number[];
      };
    }[];
  }

  const response = await client.predict(request) as PredictionResponse;
  const embeddings = response.predictions?.[0]?.embeddings?.values;

  if (!embeddings) throw new Error('Failed to retrieve embeddings');

  return embeddings;
}
