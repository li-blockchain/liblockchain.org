import Head from 'next/head'
import Hamburger from 'hamburger-react'
import styles from '../styles/Home.module.css'
import ContractForm from '../components/ContactForm'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/Navigation'

export default function Home() {
  // Mobile menu state.
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Long Island Blockchain - Your trusted Blockchain builders</title>
        <meta name="description" content="Blockchain developers, consultants, and educators. #BUIDL" />
      </Head>

      <Navigation></Navigation>

      {/* Hero Component */}
      <div className="hero flex flex-col items-center justify-center h-auto bg-[url('/sky.jpg')] bg-cover mx-auto py-16">
        <div className="flex flex-col items-center justify-center w-1/2">
        <h1 className="text-4xl lg:text-6xl text-white text-center tracking-tight font-extrabold lg:m-5 lg:m-2 sm:m-0 sm:pt-10">
          Your Web3 Development & Education Resource
        </h1>
        <h2 className="lg:text-xl lg:text-md sm:text-md tracking-tight text-gray-300 text-center">
          Since 2016, Long Island Blockchain has been teaching and building the fundamentals of decentralized technology. Are you ready to bring your Web3 project to life?
        </h2>
        <ContractForm additionalClasses="block lg:hidden p-9"></ContractForm>
        </div>
      </div>

      {/* Our projects component */ }
      <div className="flex flex-col items-center justify-center text-center">
        <div id="projects" className="projects flex flex-col text-center m-10 max-w-7xl">
          <h5 className="text-5xl tracking-tight">Our Projects</h5>
          <h6 className="text-gray-400 text-3xl font-light py-3">We enjoy collaborating, experimenting, and shipping products using blockchain technology. Below is a collecton of projects we have worked on. Do you have an idea that would like to see brought to life? Let`s chat!</h6>
          <div className="project-list flex flex-col lg:flex-row justify-around w-full mt-10 text-left">
            <div className="project w-full p-3 mb-20">
              <a href="https://niftyunderground.app" target="_blank" rel="noreferrer">
                <div className="relative overflow-hidden w-full card-wrapper">
                  <img src="/nft.png" alt="NFT Platforms" className="absolute w-full h-full inset-0 object-cover object-center"/>
                </div>
                <h4 className="text-4xl tracking-tight font-bold py-4">Nifty Underground</h4>
                <p>In collaboration with world renowned artists, we created an NFT minting platform for multiple networks. We are the first to bring a music NFT platform to the Polygon platform</p>
              </a>
            </div>
            <div className="project w-full p-3 mb-20">
              <a href="https://createcoin.surge.sh/" target="_blank" rel="noreferrer">
                <div className="relative overflow-hidden w-full card-wrapper">
                  <img src="/coin.png" alt="Create your own token" className="absolute w-full h-full inset-0 object-cover object-center"/>
                </div>
                <h4 className="text-4xl tracking-tight font-bold py-4">Create your own token</h4>
                <p>With a single click create your own ERC-20 token on Ethereum or BSC.</p>
              </a>
            </div>
            <div className="project w-full p-3 mb-20">
              <a href="https://assetrouter.com" target="_blank" rel="noreferrer">
                <div className="relative overflow-hidden w-full card-wrapper">
                    <img src="/route.jpg" alt="Route funds between collaborators" className="absolute w-full h-full inset-0 object-cover object-center"/>
                  </div>
                  <h4 className="text-4xl tracking-tight font-bold py-4">Asset Router</h4>
                  <p>Providing simple to use smart contract wallets to facilitate simple payment splitting between collaborators</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About us */ }
      <div className="flex flex-col items-center justify-center text-center">
        <div id="about" className="p-5 m-10 max-w-7xl">
          <h5 className="text-5xl font-light py-5">About us</h5>
          <p>Started in 2016 as a meetup group on Long Island, Long Island Blockchain has grown to not only foster a growing community of passionate builders in our region but has had the opportunity to work with may great clients in the space. We focus primarily on educational resources and product development, getting your team up to speed with the ever changing Web3 space.</p>
        </div>
      </div>

      {/* Our services component */ }
      <div className="flex flex-col items-center justify-center text-center">
      <div id="services" className="projects flex flex-col text-center m-10 max-w-7xl">
        <h5 className="text-5xl tracking-tight">Services</h5>
        <h6 className="text-gray-400 text-3xl font-light py-3">Whether you are just starting to figure out what this Web3 thing is, or you have a clear plan that needs to be executed, we have you covered.</h6>
        <div className="project-list flex flex-col lg:flex-row justify-around w-full mt-10 text-left">
          <div className="project w-full p-3 mb-20">
            <a href="#" target="_blank">
              <div className="relative overflow-hidden w-full card-wrapper">
                <img src="/train.jpg" alt="Blockchain training services" className="absolute w-full h-full inset-0 object-cover object-center"/>
              </div>
              <h4 className="text-4xl tracking-tight font-bold py-4">Training</h4>
              <p>Whether you need a top level overview of the landscape or low level knowledge for a specific challenge. Our training services will have you covered.</p>
            </a>
          </div>
          <div className="project w-full p-3 mb-20">
            <a href="#" target="_blank">
              <div className="relative overflow-hidden w-full card-wrapper">
                <img src="/create.jpg" alt="Blockchain development services" className="absolute w-full h-full inset-0 object-cover object-center"/>
              </div>
              <h4 className="text-4xl tracking-tight font-bold py-4">Development</h4>
              <p>Do you require a team of experienced developers to create and bring your ideas to life?</p>
            </a>
          </div>
          <div className="project w-full p-3 mb-20">
            <a href="#" target="_blank">
              <div className="relative overflow-hidden w-full card-wrapper">
                  <img src="/consult.jpg" alt="Blockchain consulting services" className="absolute w-full h-full inset-0 object-cover object-center"/>
                </div>
                <h4 className="text-4xl tracking-tight font-bold py-4">Consulting</h4>
                <p>Does your team require a knowledgeable resource to help strategize your product vision and guide you on best practices?</p>
            </a>
          </div>
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
            <img className="w-40" alt="Long Island Blockchain Logo" src="/libc-logo.png"/>
          </span>
        </a>
      </footer>
    </>
  )
}
