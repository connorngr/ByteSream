import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateSummary(prompt: string) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    
    const Prompt = `Process this article and return in the following JSON format:
    {
        "description": "concise summary for a description",
        "summary": "long summary while maintaining key information and context",
        "translation": "Vietnamese translation of the summary",
        "tags": ["3 relevant one-word hashtags"]
    }
    
    Article: ${prompt}`;

    
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            const result = await model.generateContent(Prompt);
            const resultText = await result.response.text();
            const cleanedText = resultText.replace(/```json\n?|\n?```/g, '').trim();
            const parsedResult = JSON.parse(cleanedText);

            return {
                summary: parsedResult.summary,
                description: parsedResult.description,
                translation: parsedResult.translation,
                tags: parsedResult.tags
            };
        } catch (error: string | any) {
            attempts++;
            if (attempts === maxAttempts) {
                throw new Error(`Failed to generate summary after ${maxAttempts} attempts because ${error.message}`);
            }
            // Wait for a short time before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

export default generateSummary;