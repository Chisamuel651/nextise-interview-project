import Link from "next/link";
import { Button } from "./ui/button";

interface HeaderProps {
  user: string;
  onSignOut: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSignOut = () => {
  console.log('signed out')
};

const Header: React.FC<HeaderProps> = ({ user, onSignOut }) => {
  
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center capitalize">
      <Link href="/" className="flex items-center">
        <h1 className="text-xl font-bold">Kodschul Management Hub</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Welcome, {user}</span>
        <Button className="bg-red-600 hover:bg-red-900" onClick={onSignOut}>Sign Out</Button>
      </div>
    </header>
  );
};

export default Header;
