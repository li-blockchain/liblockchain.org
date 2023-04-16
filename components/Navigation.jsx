import Hamburger from "hamburger-react";
import { useState } from "react";
import ContractForm from "./ContactForm";


export default function Navigation() {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
        {/* Navigation Component */}
        <div className="navigation flex items-center bg-transparent px-10 py-2">
        <div className="navigation-wrap flex justify-between items-center grow shrink relative">
        <a href="/" className="relative float-left no-underline">
            <img alt="Long Island Blockchain Logo" className="w-36 lg:w-40" src="/libc-logo.png"/>
        </a>
        <div className="hidden lg:block flex items-center justify-center inset-0 menu">
            <nav role="navigation" className="flex justify-center items-center uppercase">
            <a href="/#about" className="relative no-underline p-9">About</a>
            <a href="/#projects" className="relative no-underline p-9">Projects</a>
            <a href="/#services" className="relative no-underline p-9">Services</a>
            <a href="/eth-staking" className="relative no-underline p-9">Staking</a>
            <a href="https://www.youtube.com/c/LongIslandBlockchain" className="relative no-underline p-9">Learn</a>
            </nav>
        </div>
        <ContractForm additionalClasses="invisible lg:visible"></ContractForm>
        </div>
        <div className="lg:invisible">
        <Hamburger toggled={isOpen} toggle={setOpen} size={30} />
        </div>
    </div>

    {/* Mobile menu */}
    {isOpen && (        
        <>
        <div className="p-10">
                <nav role="navigation" className="flex flex-col justify-center items-center uppercase">
                <a href="/#about" className="relative no-underline p-9">About</a>
                <a href="/#projects" className="relative no-underline p-9">Projects</a>
                <a href="/#services" className="relative no-underline p-9">Services</a>
                <a href="/eth-staking" className="relative no-underline p-9">Staking</a>
                <a href="https://www.youtube.com/c/LongIslandBlockchain" className="relative no-underline p-9">Learn</a>
                </nav> 
        </div>
        </>
    )}
    </>
    )
}