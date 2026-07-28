export const getErrorMessage = (err) => {

  if (!err.response) {
    return "🌐 No internet connection. Please try again.";
  }

  const status = err.response.status;
  const message = err.response.data?.message;

  // Groq Rate Limit
  if (status === 429) {
    const match = message?.match(/Please try again in (\d+)m([\d.]+)s/);

    if (match) {
      return `Daily AI usage limit reached. Please try again in ${match[1]} minutes.`;
    }

    return "Daily AI usage limit reached. Please try again later.";
  }

  if (status >= 400 && status < 500 && message) {
    return message;
  }

  // Show backend validation messages
  if (status >= 400 && status < 500 && message) {
    if (message === "Only PDF files are allowed") {
      return "📄 Only PDF files are supported. Please upload a PDF resume.";
    }

    return message;
  }

  // Server Error
  if (status >= 500) {
    return "🚫 Server error. Please try again later.";
  }

  return "Something went wrong. Please try again.";

};

