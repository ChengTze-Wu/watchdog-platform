import { SignedIn, UserButton } from "@clerk/nextjs";

export default function PlatformNavbar() {
  return (
    <nav className="flex items-center justify-end h-8">
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
