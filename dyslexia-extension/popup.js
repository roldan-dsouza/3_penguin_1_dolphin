document.getElementById("apply").addEventListener("click", async () => {
  const fontFamily = document.getElementById("fontFamily").value;
  const fontSize = document.getElementById("fontSize").value;
  const lineHeight = document.getElementById("lineHeight").value;
  const wordSpacing = document.getElementById("wordSpacing").value;
  const background = document.getElementById("background").value;

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  // Inject content script (safe if already injected)
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  chrome.tabs.sendMessage(tab.id, {
    type: "APPLY_STYLES",
    payload: {
      fontFamily,
      fontSize,
      lineHeight,
      wordSpacing,
      background,
    },
  });

  document.getElementById("simplify").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Inject content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });

    chrome.tabs.sendMessage(tab.id, {
      type: "SIMPLIFY_PAGE",
    });
  });
});
