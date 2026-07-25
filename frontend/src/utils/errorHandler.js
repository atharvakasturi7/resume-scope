export const getErrorMessage = (err) => {

  if (!err.response) {
    return "🌐 No internet connection. Please try again.";
  }

  if (err.response.status === 429) {
    return "⚠️ Daily AI quota exceeded. Please try again tomorrow.";
  }

  if (err.response.status === 500) {
    return "🚫 Server error. Please try again later.";
  }

  return "Something went wrong. Please try again.";

};