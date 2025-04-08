import { FC, useState } from "react";
import { Article } from "@/types";

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: FC<ArticleContentProps> = ({ article }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'translation'>('summary');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleTTS = (): void => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    const textToRead = activeTab === 'summary' ? article.summary : article.translation;
    
    if (textToRead && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="my-5">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'summary' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('translation')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'translation' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Translation
          </button>
        </div>
        
        <button 
          onClick={handleTTS}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          {isSpeaking ? 'Stop' : 'Listen'}
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {activeTab === 'summary' ? (
          article.summary ? (
            <p className="text-lg text-gray-700 leading-relaxed">{article.summary}</p>
          ) : (
            <p className="text-gray-500 italic">No summary available</p>
          )
        ) : (
          article.translation ? (
            <p className="text-lg text-gray-700 leading-relaxed">{article.translation}</p>
          ) : (
            <p className="text-gray-500 italic">No translation available</p>
          )
        )}
      </div>
    </div>
  );
};

export default ArticleContent;
