import Head from 'next/head'
import Hamburger from 'hamburger-react'
import styles from '../styles/Home.module.css'
import ContractForm from '../components/ContactForm'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Long Island Blockchain - Your trusted Blockchain builders</title>
        <meta name="description" content="Blockchain developers, consultants, and educators. " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Component */}
      <div className="navigation flex items-center bg-transparent px-10 py-2">
        <div className="navigation-wrap flex justify-between items-center grow shrink relative">
          <Link href="/" className="relative float-left no-underline">
            <img className="w-20 md:w-40" src="/libc-logo.png"/>
          </Link>
          <div className="hidden md:block absolute flex items-center justify-center inset-0 menu">
            <nav role="navigation" className="flex justify-center items-center uppercase">
              <a href="#about" className="relative no-underline p-9">About</a>
              <a href="#projects" className="relative no-underline p-9">Projects</a>
              <a href="#services" className="relative no-underline p-9">Services</a>
              <a href="https://www.youtube.com/c/LongIslandBlockchain" className="relative no-underline p-9">Learn</a>
            </nav>
          </div>
          <ContractForm className="invisible md:visible"></ContractForm>
        </div>
        <div className="md:invisible">
          <Hamburger size={20} />
        </div>
      </div>

      {/* Hero Component */}
      <div className="hero flex flex-col items-center justify-center h-auto bg-[url('/sky.jpg')] bg-cover mx-auto py-16">
        <div className="flex flex-col items-center justify-center w-1/2">
        <h1 className="text-4xl lg:text-6xl text-white text-center tracking-tight font-extrabold lg:m-5 md:m-2 sm:m-0 sm:pt-10">
          Your Web3 Development & Education Resource
        </h1>
        <h2 className="lg:text-xl md:text-md sm:text-md tracking-tight text-gray-400 text-center">
          Since 2016, Long Island Blockchain has been teaching and building the fundamentals of decentralized technology. Are you ready to bring your Web3 project to life?
        </h2>
        </div>
      </div>

      {/* Our projects component */ }
      <div className="projects flex flex-col text-center m-10">
        <h5 className="text-5xl tracking-tight">Our Projects</h5>
        <h6 className="text-gray-400 text-3xl font-light py-3">We enjoy collaborating, experimenting, and shipping products using blockchain technology. Below is a collecton of projects we have worked on. Do you have an idea that would like to see brought to life? Let`s chat!</h6>
        <div className="project-list flex flex-col md:flex-row justify-around w-full mt-10 text-left">
          <div className="project w-full p-3">
            <a href="https://niftyunderground.app" target="_blank" rel="noreferrer">
              <div className="relative overflow-hidden w-full card-wrapper">
                <img src="/nft.png" className="absolute w-full h-full inset-0 object-cover object-center"/>
              </div>
              <h4 className="text-4xl tracking-tight font-bold py-4">Nifty Underground</h4>
              <p>In collabroation with world renouned artists, we created an NFT minting platform for multiple networks. We are the first to bring a music NFT platform to the Matic platform</p>
            </a>
          </div>
          <div className="project w-full p-3">
            <a href="https://createcoin.surge.sh/" target="_blank" rel="noreferrer">
              <div className="relative overflow-hidden w-full card-wrapper">
                <img src="/coin.png" className="absolute w-full h-full inset-0 object-cover object-center"/>
              </div>
              <h4 className="text-4xl tracking-tight font-bold py-4">Create your own token</h4>
              <p>With a single click create your own ERC-20 token on Ethereum or BSC.</p>
            </a>
          </div>
          <div className="project w-full p-3">
            <a href="https://assetrouter.com" target="_blank" rel="noreferrer">
              <div className="relative overflow-hidden w-full card-wrapper">
                  <img src="/route.jpg" className="absolute w-full h-full inset-0 object-cover object-center"/>
                </div>
                <h4 className="text-4xl tracking-tight font-bold py-4">Asset Router</h4>
                <p>Providing simple to use smart contract wallets to facilate simple payment splitting between collaborators</p>
            </a>
          </div>
        </div>
      </div>

      {/* About us */ }
      <div className="p-5 m-10">
        <h5 className="text-5xl font-light py-5">About us</h5>
        <p>Started in 2016 as a meetup group on Long Island, Long Island Blockchain has grown to not only foster a growing community of passionate builders in our region but has had the opportunity to work with may great clients in the space. We focus primarily on educational resources and product development, getting your team up to speed with the ever changing Web3 space.</p>
      </div>

      {/* Our services component */ }
      <div className="projects flex flex-col text-center m-10">
        <h5 className="text-5xl tracking-tight">Services</h5>
        <h6 className="text-gray-400 text-3xl font-light py-3">Whether you are just starting to figure out what this Web3 thing is, or you have a clear plan that needs to be executed, we have you covered.</h6>
        <div className="project-list flex flex-col md:flex-row justify-around w-full mt-10 text-left">
          <div className="project w-full p-3">
            <a href="#" target="_blank">
              <div className="relative overflow-hidden w-full card-wrapper">
                <img src="/train.jpg" className="absolute w-full h-full inset-0 object-cover object-center"/>
              </div>
              <h4 className="text-4xl tracking-tight font-bold py-4">Training</h4>
              <p>Whether you need a top level overview of the landscape or low level knowledge for a specific challenge. Our training services will have you convered.</p>
            </a>
          </div>
          <div className="project w-full p-3">
            <a href="#" target="_blank">
              <div className="relative overflow-hidden w-full card-wrapper">
                <img src="/create.jpg" className="absolute w-full h-full inset-0 object-cover object-center"/>
              </div>
              <h4 className="text-4xl tracking-tight font-bold py-4">Development</h4>
              <p>Do you require a team of experienced developers to create and bring your ideas to life?</p>
            </a>
          </div>
          <div className="project w-full p-3">
            <a href="#" target="_blank">
              <div className="relative overflow-hidden w-full card-wrapper">
                  <img src="/consult.jpg" className="absolute w-full h-full inset-0 object-cover object-center"/>
                </div>
                <h4 className="text-4xl tracking-tight font-bold py-4">Consulting</h4>
                <p>Does your team require a knowledgeable resource to help strategize your product vision and guide you on best practices?</p>
            </a>
          </div>
        </div>
      </div>

      {/* Contact us */ }
      <div className="projects flex flex-col text-center m-10">
      <h5 className="text-5xl tracking-tight mb-10">Ready to connect?</h5>
        <ContractForm></ContractForm>
      </div>
     
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <img className="w-40" src="/libc-logo.png" alt="LIBC Logo"/>
          </span>
        </a>
      </footer>
    </>
  )
}
