import Head from 'next/head'
import Hamburger from 'hamburger-react'
import styles from '../styles/Home.module.css'
import ContractForm from '../components/ContactForm'
import Link from 'next/link'
import { useState } from 'react'
import StakingFeature from '../components/StakingFeature'
import Navigation from '../components/Navigation'

export default function Home() {
  // Mobile menu state.
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Long Island Blockchain - Non-Custodial Ethereum Staking Services</title>
        <meta name="description" content="Ethereum Staking and Rocketpool node operator services." />
        <link
          rel="canonical"
          href="https://liblockchain.xyz/eth-staking"
          key="canonical"
        />
      </Head>

      <Navigation></Navigation>

      {/* Hero Component */}
      <div className="hero flex flex-col items-center justify-center h-auto bg-staking-hero bg-cover">
        <div className="flex flex-col items-center justify-center w-1/2">
        <h1 className="text-4xl drop-shadow-md lg:text-6xl text-white text-center tracking-tight font-extrabold lg:m-5 lg:m-2 sm:m-0 sm:pt-10">
          Non-Custodial Ethereum Staking Services
        </h1>
        <h2 className="lg:text-xl drop-shadow-md lg:text-md sm:text-md tracking-tight text-gray-300 text-center">
          With extensive experience helping folks take advantage of the Ethereum proof-of-stake protocol, we can help you get started and starting earning rewards!
        </h2>
        <ContractForm additionalClasses="block p-10" cta></ContractForm>
        </div>
      </div>

     
      {/* Our projects component */ }
      {/* <div class="flex flex-col items-center justify-center text-center">
        <div id="projects" className="projects flex flex-col text-center m-10 max-w-7xl">
          <h6 className="text-gray-400 text-3xl font-light py-3">We can help you stake your ETH while minimizing trust and keeping you in control of your crypto. Self staking is how it is meant to be, we are here to support!</h6> 
        </div>
      </div> */}

      {/* A flex component with an image on the left and content on the right */}
      <StakingFeature></StakingFeature>

      {/* Contact us */ }
      <div className="projects flex flex-col text-center m-10">
      <h5 className="text-5xl tracking-tight mb-10">Let&apos;s connect</h5>
        <ContractForm></ContractForm>
      </div>
     
      <footer className={styles.footer}>
        <a
          href="https://liblockchain.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <img className="w-40" alt="Long Island Blockchain Logo" src="/libc-logo.png"/>
          </span>
        </a>
      </footer>
    </>
  )
}
