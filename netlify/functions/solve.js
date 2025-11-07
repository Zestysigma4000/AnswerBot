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
        version: '1.0',
        timestamp: new Date().toISOString()
      })
    };
  }

  // Handle POST requests
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { question, platform } = body;

      // Simple response - you can enhance this later
      const answer = generateSimpleAnswer(question);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          answer: answer,
          message: `Processed question about ${platform}`,
          timestamp: new Date().toISOString()
        })
      };
      
    } catch (error) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Simple error: ' + error.message,
          answer: '42' // Fallback
        })
      };
    }
  }

  // Method not allowed
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

function generateSimpleAnswer(question) {
  // Very simple answer generator for testing
  if (question && question.includes('scale factor')) return '2';
  if (question && question.includes('dilation')) return '2';
  if (question && question.includes('area')) return '25';
  if (question && question.includes('perimeter')) return '20';
  if (question && question.includes('triangle')) return '180';
  return '42'; // Default answer
}
