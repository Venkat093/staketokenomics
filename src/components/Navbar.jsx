import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { ImSun } from 'react-icons/im';
import { BsFillMoonFill } from 'react-icons/bs';
import logo from '../assets/images/holycity.png';
import '../css/Navbar.css';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { providers, ethers } from 'ethers';
let web3Modal;
let provider;
let selectedAccount;
function init() {
	const providerOptions = {
		walletconnect: {
			package: WalletConnectProvider,
			options: {
				// Mikko's test key - don't copy as your mileage may vary
				// infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
				rpc: {
					80001: 'https://rpc-mumbai.matic.today',
				},
				chainId: 80001,
			},
		},
	};

	web3Modal = new Web3Modal({
		// network: 'mainnet', // optional
		// cacheProvider: true, // optional
		providerOptions, // required
	});

	window.w3m = web3Modal;
}

async function fetchAccountData() {
	const web3Provider = new ethers.providers.Web3Provider(provider);
	const signer = web3Provider.getSigner();
	selectedAccount = await signer.getAddress();
	console.log(selectedAccount);

	return selectedAccount;
}

async function refreshAccountData() {
	await fetchAccountData(provider);
}

async function onConnect() {
	console.log('Opening a dialog', web3Modal);
	try {
		provider = await web3Modal.connect({ cacheProvider: true });
	} catch (e) {
		console.log('Could not get a wallet connection', e);
		return;
	}

	provider.on('accountsChanged', (accounts) => {
		console.log('chainchan', accounts);
		fetchAccountData();
		// window.location.reload()
	});

	provider.on('chainChanged', (chainId) => {
		fetchAccountData();
		window.location.reload();
	});

	provider.on('networkChanged', (networkId) => {
		fetchAccountData();
	});
	window.location.reload();

	await refreshAccountData();
}

async function disconnet() {
	console.log('Opening a dialog', web3Modal);
	try {
		// provider = await web3Modal.connect();

		await web3Modal.clearCachedProvider();
		// await window.ethereum.disable()
		window.location.reload();
	} catch (e) {
		console.log('Could not get a wallet connection', e);
		return;
	}
}
export default function Navbar({ changeTheme, currentTheme }) {
	const [navState, setNavState] = useState(false);
	const [acc, setacc] = useState();
	const [webm3, setweb3m] = useState();
	const [provider1, setprovider1] = useState();
	const [account, setAccount] = useState();
	useEffect(async () => {
		if (acc) {
			provider = await web3Modal?.connect();
			console.log(provider, ' --> provider');
			const web3 = new Web3(provider);
			const accounts = await web3.eth.getAccounts();
			console.log('dddd', accounts);
			console.log(web3);
			setweb3m(web3);
			setprovider1(provider);
			setAccount(accounts[0]);
		}
	}, [acc]);

	useEffect(() => {
		init();

		if (web3Modal.cachedProvider) {
			console.log('accaa', web3Modal.cachedProvider);
			console.log('connected');
			setacc(true);
		}
	}, []);
	return (
		<nav>
			<div className='brand-container'>
				<div className='brand'>
					<img src={logo} alt='logo' />
				</div>

				<div className='toggle-container'>
					<div className='toggle'>
						{navState ? (
							<MdClose onClick={() => setNavState(false)} />
						) : (
							<GiHamburgerMenu onClick={() => setNavState(true)} />
						)}
					</div>
					<div className='mode' onClick={changeTheme}>
						{currentTheme === 'dark' ? (
							<ImSun className='light' />
						) : (
							<BsFillMoonFill className='dark' />
						)}
					</div>
				</div>
			</div>
			<div className={`links-container ${navState ? 'nav-visible' : ''}`}>
				<ul className='links'>
					<li>
						<a href='#features'>Features</a>
					</li>
					<li>
						<a href='#about'>About</a>
					</li>
					<li>
						<a href='#launch'>Launch</a>
					</li>
					<li>
						<a href='#signup'>Sign Up</a>
					</li>
					<li>
						{acc ? (
							<button onClick={disconnet}>Disconnect Wallet</button>
						) : (
							<button onClick={onConnect}>
								<span>Connect Wallet</span>
							</button>
						)}
					</li>
					<li onClick={changeTheme}>
						{currentTheme === 'dark' ? (
							<ImSun className='light' />
						) : (
							<BsFillMoonFill className='dark' />
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
}
