import OpenAI from "openai";
import { EXPENSE_CATEGORIES } from "../constants/expense.constants.js";

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function cleanAIOutput(output) {
  return output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

function validateAIOutput(data) {
  if (!data) {
    throw new Error("AI returned empty response");
  }

  if (!data.merchant) {
    throw new Error("AI failed to extract merchant");
  }

  if (!data.amount) {
    throw new Error("AI failed to extract amount");
  }

  if (!EXPENSE_CATEGORIES.includes(data.category)) {
    data.category = "others";
  }

  return data;
}

/**
 * Main AI extraction function
 */
export async function extractReceiptData(receiptText) {
  const client = getClient();

  const prompt = `
    You are a financial data extraction assistant.

    Extract expense information from the receipt text below.

    Receipt:
    ${receiptText}

    Return ONLY valid JSON with this schema:

    {
      "merchant": string,
      "amount": number,
      "category": "food | transport | shopping | bills | others",
      "date": "YYYY-MM-DD or null"
    }

    Rules:
    - Do NOT include explanations
    - Do NOT include markdown
    - Do NOT include text outside JSON
    - If date is missing return null
    - Category must be one of the allowed values
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const rawOutput = response.output_text;

  if (!rawOutput) {
    throw new Error("AI returned empty output");
  }

  const cleaned = cleanAIOutput(rawOutput);

  let parsed;

  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    console.error("AI RAW OUTPUT:", rawOutput);
    throw new Error("AI returned invalid JSON");
  }

  return validateAIOutput(parsed);
}
