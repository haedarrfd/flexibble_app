import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="navbar flex_between">
      <div className="flex-1 flex_start gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="Flexibble Logo" width={115} height={45} />
        </Link>

        {/* For Desktop Devices */}
        <ul className="hidden xl:flex text_small gap-8">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex_center gap-5">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title="Share Work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
