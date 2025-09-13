import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className="bg-slate-950 text-white sm:py-8">
      <nav className=" flex items-center justify-between">
        <div className="w-1/5" />

        <h1 className="w-1/ flex-1 text-center text-lg font-medium text-white">
          Augusto Galego&apos;s projects
        </h1>

        <div className="w-1/5" />
        <div className="flex w-1/5 items-center justify-center space-x-5">
          <Link
            href="https://twitter.com/RealGalego"
            className="text-xl"
            target="_blank"
          >
            𝕏
          </Link>
        </div>
        <div className="w-1/5" />
      </nav>
    </div>
  )
}
