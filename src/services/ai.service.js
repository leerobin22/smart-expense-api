import OpenAI from "openai";
import { EXPENSE_CATEGORIES } from "../constants/expense.constants.js";

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function extractReceiptData(receiptText) {
  const client = getClient();

  const prompt = `
    Extract expense information from this receipt text.

    Receipt:
    ${receiptText}

    Return ONLY valid json in this format:
    {
      "merchant": "",
      "amount": number,
      "category: ${EXPENSE_CATEGORIES.join(" | ")}
    }
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const output = response.output_text;

  const cleaned = output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error("AI returned invalid JSON");
  }
}
