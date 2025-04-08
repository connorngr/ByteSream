import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="flex-shrink-0 flex items-center">
        <img className="h-8 w-8" src="/ByteStream.png"/>
        <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 font-extrabold text-xl tracking-tight hover:tracking-wide transition-all duration-300 drop-shadow-sm hover:drop-shadow">
        Byte
        <span className="relative inline-block animate-pulse text-gray-600">
          Stream
          <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-400 blur-sm"></span>
        </span>
      </span>
      </div>
    </Link>
  );
};

export default Logo;
