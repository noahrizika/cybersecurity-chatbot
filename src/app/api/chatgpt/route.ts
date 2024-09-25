import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const apiKey: string | undefined = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty."
  );
}

const client = new OpenAI({
  apiKey: apiKey,
});

export async function POST(req: NextRequest): Promise<
  | NextResponse<{
      content: string;
    }>
  | NextResponse<{
      error: Error;
    }>
> {
  try {
    const { userInput } = await req.json();

    const chatBotPrompt = `You are a cybersecurity expert capable of programming in all programming languages.
    Provide only the requested code.`;

    const completion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: chatBotPrompt,
          },
          {
            role: "user",
            content: userInput,
          },
          //   {...pastConversation}
        ],
      });

    const response = completion.choices[0]
      .message as OpenAI.Chat.Completions.ChatCompletionMessage;

    if (!response.content) {
      throw new Error("Received null or undefined content from the API");
    }

    return NextResponse.json({ content: response.content });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error }, { status: 500 });
    } else {
      return NextResponse.json(
        {
          error: new Error("An unknown error occurred in chatgpt POST request"),
        },
        { status: 500 }
      );
    }
  }
}
