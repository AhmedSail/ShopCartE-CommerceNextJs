import Logo from "@/components/Logo";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="bg-white flex flex-col items-center justify-center px-4 mt-40">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo />

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Looking for something?
          </h2>
          <p className="text-gray-500">
            we&apos;re sorry. The web address you entered is not a functioning
            page on our site
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Link
              href={"/"}
              className="w-full flex items-center justify-center px-4 py-2 bg-shop_btn_dark_green/75 rounded-md text-white font-bold   hover:text-black hoverEffect "
            >
              Go to Shopcart&apos;s home page
            </Link>
            <Link
              href={"/help"}
              className="w-full flex items-center justify-center px-4 py-2 border rounded-md font-bold hover:bg-black hover:text-white hoverEffect"
            >
              Help
            </Link>
          </div>
          <div className="mt-8 text-center font-bold">
            <p className="text-sm text-gray-600">
              Need help? Visit the{" "}
              <Link
                href={"/help"}
                className="font-medium text-amazon-blue hover:text-amazon-blue-dark hoverEffect"
              >
                Help Section
              </Link>{" "}
              or{" "}
              <Link
                href={"/contact"}
                className="font-medium text-amazon-blue hover:text-amazon-blue-dark hoverEffect"
              >
                Contact
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
