import OpenAI from "openai";

let client: OpenAI | null = null;
function getOpenAI() {
  if (!client) {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY missing");
    client = new OpenAI({ apiKey: key });
  }
  return client;
}

export async function transcribe(file: Buffer, filename: string, language?: "en" | "ar"): Promise<string> {
  const openai = getOpenAI();
  const ab = new ArrayBuffer(file.byteLength);
  new Uint8Array(ab).set(file);
  const blob = new File([ab], filename);
  const params: any = { file: blob, model: "whisper-1" };
  if (language) params.language = language;
  try {
    const resp = await openai.audio.transcriptions.create(params);
    return resp.text;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown transcription error";
    throw new Error(`Transcription failed: ${message}`);
  }
}
