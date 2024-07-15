
function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
window.addEventListener(
	'load',
	async function() {
		console.log("waitin for 3 secs..");
		$("cw_m").innerHTML = "Connecting.. Please wait."
		setTimeout(async () => { await basetrip(); }, 3000);
	},
	false
);


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    //window.location = "#"+tabName;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName('tablinks')[0].click();
});


async function basetrip()
{
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.Web3Provider(window.ethereum);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		signer = provider.getSigner()
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		window.location.reload()
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>0){n_=(_n).toFixed(8)+""}
	return(n_);
}


function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
	console.log(c)
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const timeFormat = (timestamp) => {const seconds = Math.floor((Date.now() - timestamp) / 1000);const prefix = seconds < 0 ? "For the next " : "Expired ";const absSeconds = Math.abs(seconds);return prefix + (absSeconds < 60 ? absSeconds + " seconds" : absSeconds < 3600 ? Math.floor(absSeconds / 60) + " minutes" : absSeconds < 86400 ? Math.floor(absSeconds / 3600) + " hours" : absSeconds < 2592000 ? Math.floor(absSeconds / 86400) + " days" : absSeconds < 31536000 ? Math.floor(absSeconds / 2592000) + " months" : Math.floor(absSeconds / 31536000) + " years") + (seconds < 0 ? "" : " ago");};

LPABI = ["function balanceOf(address) public view returns(uint)","function metadata() public view returns(uint,uint,uint,uint,bool,address,address)","function getAssetPrice(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function earned(address,address) public view returns(uint)","function earnings(address,address) public view returns(uint)","function name() public view returns(string)","function symbol() public view returns(string)","function tvl() public view returns(uint)","function apr() public view returns(uint)","function totalSupply() public view returns(uint)","function deposit(uint)","function withdraw(uint)"]

XABI = [{"inputs": [{"internalType": "address","name": "_account","type": "address"}],"name": "ELITEBalance","outputs": [{"internalType": "uint256","name": "eliteAmount_","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_eliteAmount","type": "uint256"}],"name": "ELITEForxELITE","outputs": [{"internalType": "uint256","name": "xELITEAmount_","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "enter","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "fc","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "fpm","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_share","type": "uint256"}],"name": "leave","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_xELITEAmount","type": "uint256"}],"name": "xELITEForELITE","outputs": [{"internalType": "uint256","name": "eliteAmount_","type": "uint256"}],"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getReserves","outputs": [{"internalType": "uint112","name": "_reserve0","type": "uint112"},{"internalType": "uint112","name": "_reserve1","type": "uint112"},{"internalType": "uint32","name": "_blockTimestampLast","type": "uint32"}],"payable": false,"stateMutability": "view","type": "function"}];

async function dexstats() {
	_ELITE = new ethers.Contract(ELITE, LPABI, provider);
	_XELITE = new ethers.Contract(XELITE, XABI, provider);

	_dsd = await Promise.all([
		_XELITE.totalSupply(),
		_XELITE.ELITEForxELITE(BigInt(1e18)),
	])


	let roi = ((133_700_000e18/Number(_dsd[1])-1));
	let te = Date.now() - 1636323561000;
	let apr = (roi/te * 86400*365000);

	$("topstat-total").innerHTML = (Number(_dsd[0])/1e18).toLocaleString(undefined,{maximumFractionDigits:0});
	$("topstat-ratio").innerHTML = (Number(_dsd[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:0});
	$("topstat-roiapr").innerHTML = (roi*100).toFixed(4) + "% / " + (apr*100).toFixed(4) + "%";

	return;
}

async function gubs() {
	_ELITE = new ethers.Contract(ELITE, LPABI, provider);
	_XELITE = new ethers.Contract(XELITE, XABI, provider);

	_ubs = await Promise.all([
		_ELITE.balanceOf(window.ethereum.selectedAddress),
		_XELITE.balanceOf(window.ethereum.selectedAddress)
	]);

	$("mint-bal").innerHTML = (Math.floor(Number(_ubs[0])/1e6)/1e12);
	$("redeem-bal").innerHTML = (Math.floor(Number(_ubs[1])/1e18));

	return;
}

async function mint() {

	_oamt = $("mint-amt").value;
	if(!isFinite(_oamt) || _oamt<1/1e18){notice(`Invalid LP amount!`); return;}
	_oamt = BigInt(Math.floor(_oamt * 1e18));

	/// Business end
	_ELITE = new ethers.Contract(ELITE, LPABI, signer);
	_XELITE = new ethers.Contract(XELITE, XABI, signer);

	al = await Promise.all([
		_ELITE.allowance(window.ethereum.selectedAddress, XELITE),
		_ELITE.balanceOf(window.ethereum.selectedAddress)
	]);

	if(Number(_oamt)>Number(al[1])) {
		notice(`
			<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
			<h2>Insufficient ELITE Balance!</h2>
			<h3>Desired Amount:</h3>${(Number(_oamt)/1e18).toFixed(18)}<br>
			<h3>Actual Balance:</h3>${(al[1]/1e18).toFixed(18)}<br><br>
			<b>Please reduce the amount and retry again, or accumulate some more ELITE.</b>
		`);
		return;
	}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
			<h3>Approval required</h3>
			Please grant ELITE allowance.<br><br>
			<h3>Current Allowance:</h3>${(al[0]/1e18).toFixed(18)}<br><br>
			<h3>Desired Allowance:</h3>${(Number(_oamt)/1e18).toFixed(18)}<br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _ELITE.approve(XELITE, _oamt);
		console.log(_tr);
		notice(`
			<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ELITE granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
		await sleep(1000);
	}

	notice(`
		<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
		<h3>Minting xELITE</h3>

		ELITE to Deposit: <b>${(Number(_oamt)/1e18).toFixed(18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _XELITE.enter(_oamt);
	console.log(_tr);
	notice(`
		<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
		<h3>Order Submitted!</h3>
		<br><h4>Depositing ELITE to mint XELITE</h4>
		ELITE Deposited: <b>${(Number(_oamt)/1e18).toFixed(18)}</b><br>
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
		<h3>Minted xELITE to your Wallet</h3>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}

async function redeem() {

	_oamt = $("redeem-amt").value;
	if(!isFinite(_oamt) || _oamt<1/1e18){notice(`Invalid LP amount!`); return;}
	_oamt = BigInt(Math.floor(_oamt * 1e18));

	/// Business end
	_ELITE = new ethers.Contract(ELITE, LPABI, signer);
	_XELITE = new ethers.Contract(XELITE, XABI, signer);

	al = await Promise.all([
		_XELITE.balanceOf(window.ethereum.selectedAddress)
	]);

	if(Number(_oamt)>Number(al[1])) {
		notice(`
			<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
			<h2>Insufficient xELITE Balance!</h2>
			<h3>Desired Amount:</h3>${(Number(_oamt)/1e18).toFixed(18)}<br>
			<h3>Actual Balance:</h3>${(al[1]/1e18).toFixed(18)}<br><br>
			<b>Please reduce the amount and retry again, or accumulate some more xELITE.</b>
		`);
		return;
	}

	notice(`
		<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
		<h3>Unlocking ELITE</h3>

		xELITE to Redeem: <b>${(Number(_oamt)/1e18).toFixed(18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _XELITE.leave(_oamt);
	console.log(_tr);
	notice(`
		<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
		<h3>Order Submitted!</h3>
		<h4>Withdrawing ELITE by burning XELITE</h4>
		xELITE Redeemed: <b>${(Number(_oamt)/1e18).toFixed(18)}</b><br>
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<img style='height:32px;position:relative;top:4px' src="${LOGOS + ELITE.toLowerCase()}.png">
		<h3>ELITE sent to your Wallet!</h3>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}


