import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAi() {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: "Extract expense information from: Starbucks Latte $5.50",
  });

  console.log(response.output_text);
}

testAi();
