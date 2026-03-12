import dotenv from "dotenv";
import { extractReceiptData } from "./src/services/ai.service.js";

dotenv.config();

async function testAi() {
  const result = await extractReceiptData(
    "Starbucks Latte $5.50"
  )

  console.log(result)
}

testAi();
