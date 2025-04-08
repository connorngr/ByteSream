import Link from "next/link";

interface AuthButtonsProps {
  isMobile?: boolean;
  menuOpen: (value: boolean) => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false, menuOpen }) => {
  if (isMobile) {
    return (
      <div className="flex flex-col w-full space-y-3">
        <Link onClick={() => menuOpen(false)} href="/auth/login" className="w-full">
          <button className="w-full text-gray-700 font-medium hover:text-primary px-3 py-3 border border-gray-200 rounded-md text-center">
            Login
          </button>
        </Link>
        <Link onClick={() => menuOpen(false)} href="/auth/register" className="w-full">
          <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-md px-4 py-3 transition duration-150 ease-in-out">
            Register
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <Link href="/auth/login">
        <button className="text-gray-700 font-medium hover:text-primary px-3 py-2">
          Login
        </button>
      </Link>
      <Link href="/auth/register">
        <button className="bg-primary hover:bg-primary-dark text-white font-medium rounded-md px-4 py-2 transition duration-150 ease-in-out">
          Register
        </button>
      </Link>
    </div>
  );
};

export default AuthButtons;