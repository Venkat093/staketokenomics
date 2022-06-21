import React, { useState, useEffect } from 'react';
import '../css/stake.css';
import Web3 from 'web3';
import Stakee from '../abi/Stakee.json';
import fromExponential from 'from-exponential';
import { Modal } from 'bootstrap';
import ERC20 from '../abi/ERC20.json';
const Stake = ({ auc, acc, web3main }) => {
	const [stake, setStake] = useState(true);
	const [accountid, setaccountid] = useState();
	const [rewards, setRewards] = useState();
	const [_amount, setAmout] = useState();
	const [staketokenBalance, setStakeTokentBalance] = useState();
	useEffect(async () => {
		if (acc && web3main) {
			// const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const accounts1 = await web3main.eth.getAccounts();
			setaccountid(accounts1[0]);
			// const chainId = await window.ethereum.request({ method: 'eth_chainId' });

			// setchainid(chainId)
		}
	}, [acc, web3main]);
	const approveToken = async () => {
		if (window.ethereum) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			// window.web3 = new Web3(window.ethereum);
			let token = new web3main.eth.Contract(
				ERC20,
				'0xadc22D2bF20d69243c039306bF2c301Ea2c49F14'
			);

			const stakingCOntract = '0x360FeB2380aEF1b09263E32d0967C991f4770e5C';

			let approveAMount = web3main.utils.toBN(
				fromExponential(parseFloat(_amount) * Math.pow(10, 25))
			);

			token.methods
				.approve(stakingCOntract, approveAMount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					stakeAmount();
				})
				.catch();
		}
	};

	const StakeToken = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let token = new web3main.eth.Contract(
				ERC20,
				'0xadc22D2bF20d69243c039306bF2c301Ea2c49F14'
			);

			const stakingCOntract = '0x360FeB2380aEF1b09263E32d0967C991f4770e5C';

			let amount = web3main.utils.toBN(
				fromExponential(parseFloat(_amount) * Math.pow(10, 18))
			);

			token.methods
				.allowance(userwalletaddresss, stakingCOntract)
				.call({ from: userwalletaddresss })
				.then((result) => {
					if (result >= amount) {
						stakeAmount(); // stake amount function call
					} else {
						approveToken(); // approve token  function call
					}
				})
				.catch();
		}
	};

	const stakeAmount = async () => {
		console.log('calling');
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];
			console.log('ack', accounts);
			// window.web3 = new Web3(window.ethereum);
			console.log('ccc', userwalletaddresss);
			let staking = new web3main.eth.Contract(
				Stakee,
				'0x360FeB2380aEF1b09263E32d0967C991f4770e5C'
			);

			let amount = web3main.utils.toBN(
				fromExponential(parseFloat(_amount) * Math.pow(10, 18))
			);

			staking.methods
				.stake(amount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
					setStake(false);
				})
				.catch();
		}
	};
	const withdrawAmount = async () => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				Stakee,
				'0x360FeB2380aEF1b09263E32d0967C991f4770e5C'
			);

			let amount = web3main.utils.toBN(
				fromExponential(parseFloat(_amount) * Math.pow(10, 18))
			);
			console.log(amount);
			staking.methods
				.withdraw(amount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
				})
				.catch();
		}
	};

	useEffect(() => {
		console.log('earned rewards');
		if (acc && web3main) {
			earnedRewards();
			stakeTokenBalance();
		}
	});
	const earnedRewards = async () => {
		if (acc && web3main) {
			console.log('data');
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				Stakee,
				'0x360FeB2380aEF1b09263E32d0967C991f4770e5C'
			);

			staking.methods
				.earned(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((length) => {
					let value = Math.round(length / 10 ** 18);
					console.log('data - >', length);
					console.log(Math.exp(length / 10 ** 18).toFixed(2));
					length === '0'
						? setRewards()
						: setRewards(Math.exp(length / 10 ** 18).toFixed(2));
				})
				.catch();
		}
	};
	const stakeTokenBalance = async () => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];
			let staking = new web3main.eth.Contract(
				Stakee,
				'0x360FeB2380aEF1b09263E32d0967C991f4770e5C'
			);
			staking.methods
				.stakeBalanceOfUser(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((length) => {
					setStakeTokentBalance(length / 10 ** 18);
				})
				.catch();
		}
	};
	const claimRewards = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				Stakee,
				'0x360FeB2380aEF1b09263E32d0967C991f4770e5C'
			);

			staking.methods
				.getReward()
				.send({ from: userwalletaddresss })
				.then((result) => {
					console.log(result);
				})
				.catch();
		}
	};
	return (
		<div className='signup'>
			<div className='container'>
				<div className='content'>
					<p className='sub-title'>Socity Coin</p>
					<h1 className='title'>Staking</h1>
					<p className='description mb-5'>
						Staking gives you the power to earn rewards on your Socity Coin
						Holdings. Start ataking in just couple of kicks and automatically
						earn rewards twice a week. Instantly unstake at any time with no
						penalties
					</p>
				</div>
				<div className='py-5 Stake '>
					<div className='px-3 py-5 gap-4 text-center card stake-card text-light'>
						<div>
							<span>
								<b>Socity Coin</b>
							</span>
						</div>
						<div>
							<span>
								Stake Token Balance {staketokenBalance ? staketokenBalance : ''}
							</span>
						</div>
						<div className='stake-fun'>
							<div className=' stake1 rewards '>
								<span>Rewards Earned {rewards ? rewards : ''}</span>
							</div>
							<div className=' stake2 claim-btn'>
								<button
									onClick={() => {
										claimRewards();
									}}>
									Claim rewards
								</button>
							</div>
						</div>

						<div className='stake-fun'>
							<div className=' stake1'>
								<input
									type='text'
									placeholder='Amount'
									className='inp '
									value={_amount}
									name='amaount'
									onChange={(e) => {
										setAmout(e.target.value);
									}}
								/>
							</div>
							<div className=' stake2 mb-2'>
								<button
									onClick={() => {
										StakeToken();
									}}>
									Stake
								</button>
							</div>
							<div className='stake3 px-1'>
								<button
									onClick={() => {
										withdrawAmount();
									}}>
									Unstake
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default Stake;
