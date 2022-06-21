import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import Landing from './Routes/Home.jsx';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/navbar copy';
import Stake from './components/Stake.jsx';
import Release from './components/Release';
import fromExponential from 'from-exponential';
import { Modal } from 'react-bootstrap';
function App() {
	const [theme, setTheme] = useState('dark');
	const changeTheme = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};
	//<Navbar changeTheme={changeTheme} currentTheme={theme} />
	const [accountid, setaccountid] = useState();
	const [accountid1, setaccountid1] = useState();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const [chainid, setchainid] = useState();
	const [acc, setacc] = useState(false);
	const [web3main, setweb3main] = useState();
	const [prov, setprov] = useState();
	const change = (v) => {
		setacc(v);
	};
	const provider1 = (v) => {
		setprov(v);
	};
	const web3m = (v) => {
		setweb3main(v);
	};
	console.log('acuccc', acc);
	//	console.log('expo', fromExponential(parseFloat(0.0321) * Math.pow(10, 18)));
	useEffect(() => {
		if (accountid != accountid1) {
			window.location.reload();
			// history.push('/')
		}
	}, [accountid]);
	useEffect(async () => {
		if (acc && prov) {
			const chainId = await prov.request({ method: 'eth_chainId' });
			console.log('chain', chainid);

			setchainid(chainId);

			const accountsa = await prov.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
			});
			console.log('switch', accountsa);
			await prov.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			});
		}
	}, [acc, prov]);
	useEffect(() => {
		if (accountid != accountid1) {
			window.location.reload();
			// history.push('/')
		}
	}, [accountid]);
	useEffect(async () => {
		if (acc && web3main) {
			// const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
			// setaccountid(accounts1)
			if (window.ethereum) {
				async function getAccount() {
					const accounts = await window.ethereum.enable();
					const account = accounts[0];
					// do something with new account here
					// alert('accont changed')
					// alert('hello')
					// history.push('/')
					// window.location.reload()
				}

				window.ethereum.on('accountsChanged', function (accounts) {
					console.log('account', accounts);
					getAccount();
				});
			}
		}
	}, []);
	useEffect(() => {
		if (chainid && acc) {
			console.log('ckli', chainid);
			chainid == 0x80001 ? setShow(false) : setShow(true);
		}
	}, [accountid1, chainid, acc]);

	return (
		// <div data-theme={theme} className='app-container'>
		// 	<Navbar />
		// 	<Home />
		// 	<Release />
		// 	<Footer />
		// </div>
		<div data-theme={theme} className='app-container'>
			<Router>
				<Navbar change={change} web3m={web3m} provider1={provider1} />
				<Switch>
					<Route exact path='/'>
						<Landing />
					</Route>
					<Route exact path='/Stake'>
						<Stake acc={acc} web3main={web3main} prov={prov} />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
