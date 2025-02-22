"use client"
import Image from "next/image";
// import logo from '../../../public/Logo/logo-trans.png'
// import Button from "@/components/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
const navLinks = [
    { label: "Founder", href: "#" },
    { label: "Cofounder", href: "#intro" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <section className="py-4 lg:py-8 fixed w-full top-0 z-50 mx-auto">
            <div className="container max-w-5xl mx-auto">
                <div className="border border-black rounded-[27px] md:rounded-[20px]  bg-gradient-to-l from-slate-50 to-indigo-300/10  text-white backdrop-blur">
                    <div className="grid grid-cols-2 lg:grid-cols-3  p-2 px-4 md:pr-2   items-center">
                        <div>
                            <a href="#">
                            {/* <Image src=" " alt="ArthaShastra" width={1000} height={1000} className=" h-16  w-auto" /> */}
                            <p className="text-black font-bold text-2xl">ArthaShastra</p>
                            </a>
                        </div>
                        <div className="lg:flex justify-center items-center hidden">
                            <nav className="flex gap-6 font-medium">

                                {
                                    navLinks.map((link) => (
                                        <a key={link.label} href={link.href} className="text-white font-medium hover:text-indigo-300">{link.label}</a>
                                    ))
                                }
                            </nav>

                        </div>
                        <div className="flex justify-end gap-4 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu md:hidden"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <line x1="3" y1="12" x2="21" y2="12" className={twMerge("transition", isOpen && "opacity-0")}></line>
                                <line x1="3" y1="6" x2="21" y2="6" className={twMerge("origin-left transition", isOpen && "rotate-45 -translate-y-1")}></line>
                                <line x1="3" y1="18" x2="21" y2="18" className={twMerge("origin-left transition", isOpen && "-rotate-45 translate-y-1")}></line>
                            </svg>
                            <a href="/sign-in">

                            <button className="hidden md:inline-flex items-center border border-indigo-600 rounded-xl px-3 py-2">Log In</button>
                            </a>
                            <a href="/sign-up">

                            <button className="hidden md:inline-flex items-center bg-indigo-600 text-neutral-100 rounded-xl px-3 py-2" >Sign Up</button>
                            </a>

                        </div>

                    </div>
                    <AnimatePresence>
                        {isOpen &&
                            <motion.div
                            initial={{height:0}} 
                            animate={{height:"auto"}}
                            exit={{height:0}}
                            className="overflow-hidden">
                                <div className="flex flex-col items-center gap-4 py-4 ">
                                {navLinks.map((link) => (
                                    <a key={link.label} href={link.href} className="">{link.label}</a>
                                ))}
                                 <a href="/Dashboard">
                                <button className="text-black" >Log In</button>
                                </a>
                                <a href="/Dashboard">
                                <button >Sign Up</button>
                                </a>
                                </div>
                            </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
        </section>
        <div className="pb-[86px] md:pb-[98px] lg:px-[130px]"></div>
    </>;
}
