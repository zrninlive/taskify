import Link from "next/link";
import Image from "next/image"

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-x-2">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image 
                    src="/logo.svg" 
                    alt="Logo" 
                    width={30} 
                    height={30} 
                />
                <p className="text-lg tex-neutral-700 pb-1">
                    Taskify
                </p>
            </div>
        </Link>
    );
};