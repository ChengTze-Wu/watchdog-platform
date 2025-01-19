import { SignedIn, UserButton } from "@clerk/nextjs";

export default function PlatformNavbar() {
  return (
    <nav className="flex items-center justify-end">
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
