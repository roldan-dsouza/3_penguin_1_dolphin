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

  if (message.type === "SIMPLIFY_PAGE") {
    const article = document.querySelector("article");
    const content = article ? article.innerText : document.body.innerText;
    console.log(content);

    fetch("http://localhost:8000/api/simplify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Replace entire page content
        document.body.innerHTML = `
      <div style="padding:40px; font-family: Arial;">
        <h2>Simplified Version</h2>
        <div>${data.simplified}</div>
      </div>
    `;
      });
  }
});
