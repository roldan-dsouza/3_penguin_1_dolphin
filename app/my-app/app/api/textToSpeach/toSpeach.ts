export interface SpeakOptions {
  voiceName?: string;
  rate?: number;
  pitch?: number;
}

/**
 * A pure function to trigger Text-to-Speech
 * @param text - The string to be spoken
 * @param options - Object containing voiceName, rate, and pitch
 */
export const speakText = async (text: string, options: SpeakOptions = {}) => {
  const { voiceName, rate = 1, pitch = 1 } = options;

  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.error("Speech Synthesis not supported in this environment.");
    return;
  }

  // Helper to get voices via Promise (since they load after page load)
  const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    });
  };

  const voices = await getVoices();

  // Stop any current speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Find the voice by name from the array, or default to the first GB voice
  const selectedVoice =
    voices.find((v) => v.name === voiceName) ||
    voices.find((v) => v.lang === "en-GB");

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = rate;
  utterance.pitch = pitch;

  window.speechSynthesis.speak(utterance);
};

//const messages = ["Hello world", "How are you today?", "System online"];

/*   speakText(messages[1], {
                  voiceName: "Google UK English Male", // Matches the name in the system array
                  rate: 1.2,
                  pitch: 1.0,
                });*/
