import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="bg-neutral-100  text-neutral-900 sm:py-8">
      <nav className="flex items-center justify-between">
        <div className="w-1/4" />

        <h1 className="w-1/4 text-center text-lg font-medium">
          Augusto Galego&apos;s blog
        </h1>

        <div className="flex w-1/4 items-center justify-center space-x-5">
          <Link
            href="https://twitter.com/RealGalego"
            className="text-xl"
            target="_blank"
          >
            𝕏
          </Link>
          <Link
            href="https://github.com/gutogalego"
            className=""
            target="_blank"
          >
            <Image
              src={"/github-dark.svg"}
              alt="Github"
              className="h-5 w-5"
              width={0}
              height={0}
            />
          </Link>
        </div>
        <div className="w-1/4" />
      </nav>
    </div>
  );
};
