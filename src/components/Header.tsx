import Link from "next/link";
import { SignInButton } from "./SignInButton";
import { Pirata_One } from "next/font/google";
import { Unbounded } from "next/font/google";
import { SignOutButton } from "./SignOutButton";

interface HeaderProps {
  loggedIn: boolean;
  displayName: string | null;
}

const pirata = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

const Header = ({ loggedIn, displayName }: HeaderProps) => {
  const renderButton = () => {
    if (loggedIn) {
      return <SignOutButton displayName={displayName} />;
    } else {
      return <SignInButton />;
    }
  };

  return (
    <div className="p-2 bg-navBarPurple flex justify-between items-center md:p-6">
      <h2
        className={`${pirata.className} text-black text-4xl md:mx-8 md:text-6xl`}
      >
        PBSpotify
      </h2>
      {renderButton()}
      <Link
        className={`${unbounded.className} hover:underline text-sm md:mr-20 md:text-base`}
        href={"/about"}
      >
        About
      </Link>
    </div>
  );
};
export default Header;
