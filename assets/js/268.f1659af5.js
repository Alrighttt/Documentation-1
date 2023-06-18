(window.webpackJsonp=window.webpackJsonp||[]).push([[268],{561:function(e,a,t){"use strict";t.r(a);var s=t(10),r=Object(s.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"encrypt-komodo-s-wallet-dat-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#encrypt-komodo-s-wallet-dat-file"}},[e._v("#")]),e._v(" Encrypt Komodo's "),a("strong",[e._v("wallet.dat")]),e._v(" File")]),e._v(" "),a("h2",{attrs:{id:"how-to-encrypt-komodo-wallet-dat-with-password-to-make-it-more-secure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-to-encrypt-komodo-wallet-dat-with-password-to-make-it-more-secure"}},[e._v("#")]),e._v(" How to Encrypt Komodo "),a("strong",[e._v("wallet.dat")]),e._v(" with password to make it more secure?")]),e._v(" "),a("p",[e._v("Komodo supports "),a("code",[e._v("encryptwallet")]),e._v(" RPC to secure your "),a("strong",[e._v("wallet.dat")]),e._v(" file. After encrypting your wallet, you need to unlock it before making any transaction or dumping privkey of an address. This prevents unauthorized access to the coins stored in your wallet.")]),e._v(" "),a("h3",{attrs:{id:"requirements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requirements"}},[e._v("#")]),e._v(" Requirements:")]),e._v(" "),a("ul",[a("li",[e._v("Native wallet daemon for KMD and/or any "),a("code",[e._v("-ac_public")]),e._v(" chains. (This feature is not applicable to SPV or Lite mode)")])]),e._v(" "),a("h3",{attrs:{id:"precautions-best-practices"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#precautions-best-practices"}},[e._v("#")]),e._v(" Precautions / Best Practices:")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Don't encrypt any wallet with private addresses ("),a("code",[e._v("z-addresses")]),e._v("). Transfer your funds from a private z address to transparent R address first.")])]),e._v(" "),a("li",[a("p",[e._v("Don't forget your password. If you do, you will lose access to your funds.")])]),e._v(" "),a("li",[a("p",[e._v("Use a strong password containing letters (UPPERCASE, lowercase), numbers, special characters.")])]),e._v(" "),a("li",[a("p",[e._v("Always keep a backup or write down your password, passphrase and private keys in a safe place.")])]),e._v(" "),a("li",[a("p",[e._v("Always back up your "),a("strong",[e._v("wallet.dat")]),e._v(" in a safe place. It is recommended to do it after every send transaction.")])]),e._v(" "),a("li",[a("p",[e._v("You are responsible for your funds, not the developers. Always "),a("a",{attrs:{href:"https://komodoplatform.com/discord",target:"_blank",rel:"noopener noreferrer"}},[e._v("ask"),a("OutboundLink")],1),e._v(" when in doubt.")])])]),e._v(" "),a("h2",{attrs:{id:"encrypt-your-wallet-with-a-password"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#encrypt-your-wallet-with-a-password"}},[e._v("#")]),e._v(" Encrypt your Wallet with a Password")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("encryptwallet")]),e._v(" command will encrypt your "),a("strong",[e._v("wallet.dat")]),e._v(" with a password that you provide. "),a("strong",[e._v("Usage:")]),e._v(" "),a("code",[e._v('encryptwallet "password"')])]),e._v(" "),a("p",[e._v("Example:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli encryptwallet Y0urSecureP@"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$$")]),e._v("phras3\n")])])]),a("p",[e._v("Issuing this command will return you the following output and shut down the daemon.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("wallet encrypted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" Komodo server stopping, restart to run with encrypted wallet. The keypool has been flushed, you need to "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v(" a new backup.\n")])])]),a("p",[e._v("Now, start your native coin wallet again. Your "),a("strong",[e._v("wallet.dat")]),e._v(" is already encrypted. Most of the wallet features will now require you to unlock the wallet first before performing those actions. You will get output like below:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("error code: "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-13")]),e._v("\nerror message:\nError: Please enter the wallet passphrase with walletpassphrase first.\n")])])]),a("p",[e._v("That means, without unlocking your wallet, you can't send funds or dump private key of any address that the wallet holds. Follow the next step for commands to unlock your wallet.")]),e._v(" "),a("h2",{attrs:{id:"unlock-wallet"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#unlock-wallet"}},[e._v("#")]),e._v(" Unlock Wallet")]),e._v(" "),a("p",[e._v("You need to use "),a("code",[e._v("walletpassphrase")]),e._v(" command with your password and timeout time to unlock your wallet for sending funds or some other actions. Use the "),a("code",[e._v("timeout")]),e._v(" option to set a timer for how many seconds the wallet will be unlocked before locking automatically. "),a("strong",[e._v("Usage:")]),e._v(" "),a("code",[e._v('walletpassphrase "passphrase" timeout')])]),e._v(" "),a("p",[e._v("Example:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli walletpassphrase Y0urSecureP@"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$$")]),e._v("phras3 "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("60")]),e._v("\n")])])]),a("p",[e._v("This above command will unlock your wallet for 60 seconds and will "),a("strong",[e._v("NOT")]),e._v(" return any output in your console. You can perform any actions with your wallet without any restrictions in the next 60 seconds. Change the timeout numbers to your liking.")]),e._v(" "),a("h2",{attrs:{id:"lock-wallet"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lock-wallet"}},[e._v("#")]),e._v(" Lock Wallet")]),e._v(" "),a("p",[e._v("If you want to lock the wallet before the "),a("code",[e._v("timeout")]),e._v(" specified is reached, use the command "),a("code",[e._v("walletlock")])]),e._v(" "),a("p",[e._v("Example:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli walletlock\n")])])]),a("h2",{attrs:{id:"how-to-change-password"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-to-change-password"}},[e._v("#")]),e._v(" How to change password?")]),e._v(" "),a("p",[a("strong",[e._v("Usage:")]),e._v(" "),a("code",[e._v('walletpassphrasechange "oldpassphrase" "newpassphrase"')])]),e._v(" "),a("p",[e._v("Example:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli walletpassphrasechange Y0urSecureP@"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$$")]),e._v("phras3 YourNewSecur3Pa"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$$")]),e._v("phr@se\n")])])]),a("p",[e._v("After issuing this command, there will be no output in your teminal console. But, "),a("code",[e._v("debug.log")]),e._v(" will print a similar line:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2018")]),e._v("-12-05 "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("15")]),e._v(":39:38 Wallet passphrase changed to an nDeriveIterations of "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("299405")]),e._v("\n")])])]),a("p",[e._v("This means your password has been changed successfully. Use the new password for unlocking your wallet from this time onward until you change it again.")])])}),[],!1,null,null,null);a.default=r.exports}}]);