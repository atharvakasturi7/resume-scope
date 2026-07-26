export const getErrorMessage = (err) => {

  if (!err.response) {
    return "🌐 No internet connection. Please try again.";
  }

  const status = err.response.status;

  if (status === 429) {
    const message = err.response?.data?.error || "";

    const match = message.match(/Please try again in (\d+)m([\d.]+)s/);
    if (match) {
      const minutes = match[1];

      return `Daily AI usage limit reached. Please try again in ${minutes} minutes.`;
    }

    return "Daily AI usage limit reached. Please try again later.";
  }

  if (status === 500) {
    return "🚫 Server error. Please try again later.";
  }

  return "Something went wrong. Please try again.";

};