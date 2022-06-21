import React, { useState, useEffect } from 'react';
import '../css/navbar copy.css';
import logo from '../assets/images/holycity.png';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { providers, ethers } from 'ethers';
import { Link } from 'react-router-dom';
import About from './About';
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
		network: 'mainnet', // optional
		cacheProvider: true, // optional
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

const Navbar = ({ change, web3m, provider1 }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [acc, setacc] = useState();

	const [account, setAccount] = useState();
	useEffect(async () => {
		if (acc) {
			provider = await web3Modal.connect();
			console.log(provider, ' --> provider');
			const web3 = new Web3(provider);
			const accounts = await web3.eth.getAccounts();
			console.log('dddd', accounts);
			console.log(web3);
			web3m(web3);
			provider1(provider);

			setAccount(accounts[0]);
		}
	}, [acc]);

	useEffect(() => {
		init();
		change(false);
		if (web3Modal.cachedProvider) {
			console.log('accaa', web3Modal.cachedProvider);
			console.log('connected');
			setacc(true);
			change(true);
		}
	}, []);
	return (
		<div className='Navbar'>
			<span className='nav-logo'>
				<img className='logo-img' src={logo} />
			</span>

			<div className={`nav-items content ${isOpen && 'open'}`}>
				<a href='/Stake'>Stake</a>
				<a href='/'>Home</a>
				<a href='/'>About</a>
				<a href='/contact'>Contact</a>
			</div>
			<div>
				{acc ? (
					<button className='loginButton mx-5' onClick={disconnet}>
						Disconnect Wallet
					</button>
				) : (
					<button className='loginButton mx-5' onClick={onConnect}>
						<span>Connect Wallet</span>
					</button>
				)}
			</div>
			<div
				className={`nav-toggle ${isOpen && 'open'}`}
				onClick={() => setIsOpen(!isOpen)}>
				<div className='bar'></div>
			</div>
		</div>
	);
};

export default Navbar;
