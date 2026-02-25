chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "APPLY_STYLES") {
    const {
      fontFamily,
      fontSize,
      lineHeight,
      wordSpacing,
      background,
      fontColor,
    } = message.payload;

    // Remove old injected styles if any
    const oldStyle = document.getElementById("dyslexia-style");
    if (oldStyle) oldStyle.remove();
    const fontUrl = chrome.runtime.getURL("OpenDyslexic-Regular.otf");

    // Create new style tag
    const style = document.createElement("style");
    style.id = "dyslexia-style";
    console.log(fontColor);

    style.innerHTML = `
   @font-face {
    font-family: 'OpenDyslexic';
    src: url('${fontUrl}') format('opentype');
  }

  body, p, span, div, article, section, main, li, td, th {
    /* Use the font-family variable or the hardcoded string correctly */
    font-family: 'OpenDyslexic', sans-serif !important;
        font-size: ${fontSize}px !important;
        line-height: ${lineHeight} !important;
        word-spacing: ${wordSpacing}em !important;
        background-color: ${background} !important;
        color: ${fontColor} !important;
        
      }
    `;

    document.head.appendChild(style);
  }

  if (message.type === "SIMPLIFY_PAGE") {
    const article = document.querySelector("article");
    let content = article ? article.innerHTML : document.body.innerHTML;
    content = `${content}`;

    try {
      const response = await fetch("http://localhost:8000/api/word/enhanced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent: content }),
      });

      console.log("Status:", response.status);

      const data = await response.json();
      if (response.ok) {
        document.body.innerHTML = data.simplifiedHtml;
      }

      console.log("Parsed JSON:", data);
    } catch (error) {
      console.error("Simplification failed:", error);
    }
  }
});
