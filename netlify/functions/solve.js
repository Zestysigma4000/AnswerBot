exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Handle GET requests (for testing)
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'AnswerAI5000 API is working!',
        timestamp: new Date().toISOString()
      })
    };
  }

  // Handle POST requests
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { question, platform } = body;

      // Simple AI response simulation
      const answer = simulateAIResponse(question, platform);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          answer: answer,
          message: 'Processed by AnswerAI5000',
          timestamp: new Date().toISOString()
        })
      };
      
    } catch (error) {
      return {
        statusCode: 200, // Still return 200 but with error flag
        headers,
        body: JSON.stringify({
          success: false,
          error: error.message,
          answer: '42' // Fallback answer
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

function simulateAIResponse(question, platform) {
  // Simple simulation - in production, this would call real AI
  if (question && question.includes('scale factor')) return '2';
  if (question && question.includes('area')) return '25';
  if (question && question.includes('perimeter')) return '20';
  return '42'; // Default answer
}
