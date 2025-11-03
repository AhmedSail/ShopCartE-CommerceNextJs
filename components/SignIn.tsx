import { SignInButton } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <div>
      <SignInButton mode="modal">
        <button className="hidden md:block text-lightcolor font-bold hover:text-darkcolor text-sm hoverEffect cursor-pointer">
          Login
        </button>
      </SignInButton>
    </div>
  );
}
