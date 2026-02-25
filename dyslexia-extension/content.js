chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "APPLY_STYLES") {
    const { fontFamily, fontSize, lineHeight, wordSpacing, background } =
      message.payload;

    // Remove old injected styles if any
    const oldStyle = document.getElementById("dyslexia-style");
    if (oldStyle) oldStyle.remove();

    // Create new style tag
    const style = document.createElement("style");
    style.id = "dyslexia-style";

    style.innerHTML = `
      body, 
      p, 
      span, 
      div, 
      article, 
      section, 
      main, 
      li, 
      td, 
      th {
        font-family: ${fontFamily} !important;
        font-size: ${fontSize}px !important;
        line-height: ${lineHeight} !important;
        word-spacing: ${wordSpacing}em !important;
        background-color: ${background} !important;
      }
    `;

    document.head.appendChild(style);
  }

  if (message.type === "SIMPLIFY_PAGE") {
    const article = document.querySelector("article");
    let content = article ? article.innerHTML : document.body.innerHTML;
    content = `${content}`;

    console.log("Original content:", content);

    await fetch("http://localhost:8000/api/word/enhanced", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
      .then((res) => console.log("Raw response:", res) || res.json())
      .then((data) => {
        renderSimplifiedView(data.simplified);
      })
      .catch((err) => {
        console.error("Simplification failed:", err);
      });
  }
});
