import axios from 'axios';

const API_KEY = 'cpd-apikey-FaMSjvFsCQ-7326f71f-96b8-48d9-b2fe-c1ff17594729-2024-10-27T04:52:58Z';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`,
};

export const sendMessageToWatson = async (message) => {
  try {
    const response = await axios.post(
      `${SERVICE_URL}/v2/assistants/${ASSISTANT_ID}/sessions`,
      { input: { text: message } },
      { headers }
    );
    return response.data.output.generic[0].text;  // Adjust based on your response format
  } catch (error) {
    console.error("Error communicating with Watson Assistant:", error);
    return 'An error occurred. Please try again.';
  }
};
