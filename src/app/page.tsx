import "@/lib/env";

import { fetchConversationHistory } from "@/lib/supabase/chats";

import ChatBot from "@/components/ChatBot/index";
import Header from "@/components/Header";

interface HomePageProps {
  searchParams: { groupID?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const groupID = searchParams.groupID || "";
  const conversation = await fetchConversationHistory(groupID);

  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bubbles.jpeg')",
      }}
    >
      <div className="bg-white bg-opacity-50 backdrop-blur-md">
        <Header />
        <main className="h-full flex items-center justify-center flex-col text-center">
          <div className="mt-16 mb-8 max-w-2xl">
            <h2 className="text-gray-700">
              Generate a Cybersecurity Payload in Seconds
            </h2>
            <h5 className="text-gray-600 mt-4">
              With finely-tuned prompt engineering, this chatbot can streamline
              cybersecurity tasks via code generation
            </h5>
          </div>
          <div className="w-full max-w-4xl">
            <ChatBot groupID={groupID} conversation={conversation} />
          </div>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center mt-8">
          <p>&copy; 2024 Payload Generator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
