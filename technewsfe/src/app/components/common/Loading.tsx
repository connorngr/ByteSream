export default function Loading() {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="relative">
          {/* Pulsing circle backdrop */}
          <div className="absolute inset-0 rounded-full bg-primary animate-pulse"></div>
          
          {/* Spinner */}
          <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute w-full h-full border-4 border-primary rounded-full"></div>
            <div className="absolute w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            
            {/* ByteStream logo or icon */}
            <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M19 14.5L12 7.5L5 14.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M5 9.5L12 16.5L19 9.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        {/* Loading text with animated dots */}
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium text-lg">Loading Content</p>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    );
  }