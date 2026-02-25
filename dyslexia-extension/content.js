chrome.runtime.onMessage.addListener((message) => {
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
});
