import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} className="cursor-pointer text-gray-600 hover:text-black transition-colors duration-300 text-sm">
        {children}
    </Link>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Logo & Sosmed Section */}
            <div className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/images/companyicon.png" alt="Shirt Logo" width={32} height={32} />
                    <span className="text-2xl font-bold">Shirt</span>
                </Link>
                <p className="text-gray-600 max-w-sm text-sm">
                    Explore a realm of style with our fashion e-commerce platform, where shopping is effortless. Experience a smooth journey with an extensive selection of trendy apparel, all delivered directly to your home.
                </p>
                <h4 className="font-bold text-lg mt-2">Follow on Social Media</h4>
                
                {/* Social Media Icons (menggunakan Link dan ikon Lucide-React) */}
                <div className="flex gap-3">
                    <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Facebook className="w-5 h-5 text-gray-700" /></a>
                    <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Instagram className="w-5 h-5 text-gray-700" /></a>
                    <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Twitter className="w-5 h-5 text-gray-700" /></a>
                    <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Linkedin className="w-5 h-5 text-gray-700" /></a>
                </div>
            </div>

            {/* E-Commerce Links */}
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <span className="font-bold text-lg mb-2">E-Commerce</span>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/terms">Terms & Condition</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
            </div>

            {/* Support Links */}
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <span className="font-bold text-lg mb-2">Help</span>
                <FooterLink href="/help/transact">How to Transact</FooterLink>
                <FooterLink href="/help/payment">Payment Method</FooterLink>
                <FooterLink href="/help/register">How to Register</FooterLink>
            </div>
        </div>
    </footer>
  );
}