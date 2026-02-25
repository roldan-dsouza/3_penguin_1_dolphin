chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "DO_SIMPLIFY_FETCH") {
    // Start the fetch process in the background context
    fetch("http://localhost:8000/api/simplify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: request.content }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Server error: " + response.status);
        return response.json();
      })
      .then((data) => {
        sendResponse({ success: true, data: data });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });

    // CRITICAL: Tells Chrome to keep the message port open for the fetch response
    return true;
  }
});
