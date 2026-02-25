import { simplifyFullHtml } from "../service/simplify.service.mjs";

export const simplifyContent = async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ message: "HTML required" });
    }

    const simplifiedHtml = await simplifyFullHtml(html);

    res.json({ simplifiedHtml });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// NOT INCLUDED FOR NOW
