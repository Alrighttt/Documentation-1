# Setup Komodo Notary Node

::: tip Disclaimer
This guide is here to give guidance and a general understanding on building a Komodo Notary Node server. It describes how to build the two required notary node servers: **Mainnet** and **Third Party(3P)**. It is possible that some instructions could be deprecated by the time you read it, please refer to [https://github.com/KomodoPlatform/dPoW/blob/master/doc](https://github.com/KomodoPlatform/dPoW/blob/master/doc) for more recent updates
:::

Note that, whenever the "Main Server" is referenced, it is referring to the server that is used to notarize Komodo and Smart Chains to Litecoin. Whenever "3rd Party server" is referenced, it is referring to the server that is used to notarize any 3rd party coin to Komodo.

::: tip Note
Check out [Webworker01's nnTools](https://github.com/webworker01/nntools#setup) for a simple hands off setup for your notary nodes.
:::

This guide will explain how to setup your Main Server, then go through the process of setting up the 3rd Party Server separately. After that there are instructions on how to create your Notary Node `pubkeys`, import them to your servers and then, create a basic start script for each server. Having a second server is now a requirement for Komodo Notary Nodes.

If you face problems, please join the `#notarynode` channel on the [Komodo Discord Server](https://komodoplatform.com/discord)

## NN Repo Quick Reference

::: tip Note

We recommend the Notary Node Operators to check the Table at [https://github.com/komodoplatform/dpow#dpow-asset-status](https://github.com/komodoplatform/dpow#dpow-asset-status) for latest information on the repositories and branches to run. If there is contradicting information in this document, treat the information at [https://github.com/komodoplatform/dpow#dpow-asset-status](https://github.com/komodoplatform/dpow#dpow-asset-status) as correct and inform the team through the [Komodo Discord Server](https://komodoplatform.com/discord) or by summbiting a Pull Request (PR). Using the **exact** repository and branch/tag recommended is very important for the security of the network.

:::

### Both Servers

- **KMD:** [https://github.com/KomodoPlatform/komodo/tree/d456be35acd1f8584e1e4f971aea27bd0644d5c5](https://github.com/KomodoPlatform/komodo/tree/d456be35acd1f8584e1e4f971aea27bd0644d5c5) Tree: `d456be35acd1f8584e1e4f971aea27bd0644d5c5`
- **Iguana (no autosplit):** [https://github.com/KomodoPlatform/dPoW](https://github.com/KomodoPlatform/dPoW) Branch: `master`

### Main Server

- **LTC:** [https://github.com/litecoin-project/litecoin](https://github.com/litecoin-project/litecoin) Branch: `0.16`

_To notarise KMD -> LTC, the `-notary=".litecoin/litecoin.conf"` flag is required when launching KMD._

::: tip Note
You should have at least 64GB RAM and 32 GB [swap space](https://www.digitalocean.com/community/tutorial_collections/how-to-add-swap-space) on your main server to avoid daemons crashing due to OOM.
:::

### 3rd Party Server (some of these are yet to update - check discord for status - operators can still build and sync the chains to present using the current versions before the actual update needed for S6 is available)

- **AYA:** [https://github.com/sillyghost/AYAv2.git](https://github.com/sillyghost/AYAv2.git) Tree: `94e6bc000c77401ac1b36f27a43d391984e81ac3`
- **CHIPS:** [https://github.com/chips-blockchain/chips.git](https://github.com/chips-blockchain/chips.git) Tree: `6e7560a69975d4419b3e36c817cdba6401bc8aed`
- **EMC2:** [https://github.com/emc2foundation/einsteinium.git](https://github.com/emc2foundation/einsteinium.git) Tree: `c329ae64397bea743054d06b779bb4cbfdcdd25f`
- **MCL:** [https://github.com/marmarachain/marmara.git](https://github.com/marmarachain/marmara.git) Tree: `a92d8344d3c545b2641a1e04479c90d19588abe7`
- **MIL:** [https://github.com/emc2foundation/mil.git](https://github.com/emc2foundation/mil.git) Tree: `578bed7f403c4d4a16561317d356202ca60c605f`
- **SFUSD:** [https://github.com/pbcllc/sfusd-core.git](https://github.com/pbcllc/sfusd-core.git) Tree: `4e79e1bbf9faa5305ed1091e863ef081c9272a8e`
- **TOKEL:** [https://github.com/TokelPlatform/tokel.git](https://github.com/TokelPlatform/tokel.git) Tree: `65d50d07fb5a3bf9cfa57033f1a1c25f4b37511e`
- **VRSC:** [https://github.com/VerusCoin/VerusCoin.git](https://github.com/VerusCoin/VerusCoin.git) Tag: `master`  (S6 updates not yet merged!)

## Requirements

### Hardware

#### Main Server

Komodo Notary Node currently only works on Linux. To setup Komodo Notary Node be sure you have a solid server with the following minimum requirements:

- OS: Debian/Ubuntu LTS x64 - minimal installation with Openssh server (recommended).
- CPU: A High-Performance CPU (e.g. Xeon, i7/i9, Ryzen, EPYC, etc.)
- RAM: 64 GB or more
- Disk: 1 TB SSD or greater
- Bandwidth: 100 Mbps or higher
- Location: The region where you were elected (refer to Komodo region documentation, but you should already know based on elections)

#### 3rd Party Server

At the moment the current minimum server specs are listed below, however, this may change as more 3rd party coins require notarizing.

- OS: Debian/Ubuntu LTS x64 - minimal installation with Openssh server (recommended).
- CPU: A High-Performance CPU (e.g. Xeon, i7/i9, Ryzen, EPYC, etc.)
- RAM: 32 GB or more
- Disk: 500 GB SSD or greater
- Bandwidth: 100 Mbps or higher
- Location: Within the same region as your main server (not required to be in the same datacenter)


### Security

_Before doing anything further, please ensure that your server is secure._

- Update the Operating System: `sudo apt-get update && sudo apt-get upgrade -y`

- Install [Fail2ban](https://linuxize.com/post/install-configure-fail2ban-on-ubuntu-20-04/).

- Perform Initial Setup for [creating new user, give it `sudo` permission](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04), [change SSH port](https://linuxhandbook.com/change-ssh-port/), [disable `root` login](https://www.howtogeek.com/howto/linux/security-tip-disable-root-ssh-login-on-linux/), [disable password authentication for login](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)

- Please run processes as an unprivileged user and use `sudo` where necessary

**Here is a repo with automated scripts to prepare your fresh Ubuntu server with initial setup [https://github.com/webworker01/freshubuntu](https://github.com/webworker01/freshubuntu)**

## Initial Server Setup

The instructions below are required.

### Install Required Dependencies

Main:

```bash
sudo apt-get install build-essential pkg-config bsdmainutils libtool libsodium-dev libc6-dev libssl-dev libcurl4-gnutls-dev ncurses-dev zlib1g-dev cmake clang m4 automake autoconf g++-multilib python python3 python3-zmq curl wget jq git unzip libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev -y
```

3rd Party:

```bash
sudo apt-get install libevent-dev libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev python3-zmq zlib1g-dev wget curl bsdmainutils automake cmake clang libsodium-dev libcurl4-gnutls-dev libssl-dev git unzip python jq htop -y
```

Note: If using Ubuntu-18.4, install `python-zmq` instead of `python3-zmq`

### Install `nanomsg`

Required by iguana

```bash
cd ~
git clone https://github.com/nanomsg/nanomsg
cd nanomsg
cmake . -DNN_TESTS=OFF -DNN_ENABLE_DOC=OFF
make -j2
sudo make install
sudo ldconfig
```

## Install Komodo by compiling it from source

### Clone the source, checkout `d456be35acd1f8584e1e4f971aea27bd0644d5c5` tree and compile

```bash
cd ~
git clone https://github.com/KomodoPlatform/komodo
cd komodo
git checkout d456be35acd1f8584e1e4f971aea27bd0644d5c5
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

::: tip Note

`-j$(nproc)` uses all the available processor threads while compiling. If you don't want to use all threads, you may specify the number directly like so: `-j8` will use only 8 threads; Alternatively, you may like to use `-j$(expr $(nproc) - 1)`, which will use all the available processors except one.

:::

### Symlink the compiled binaries

```bash
sudo ln -sf /home/$USER/komodo/src/komodo-cli /usr/local/bin/komodo-cli
sudo ln -sf /home/$USER/komodo/src/komodod /usr/local/bin/komodod
```

### Create the data dir, `komodo.conf` file and secure it

```bash
cd ~
mkdir .komodo
nano ~/.komodo/komodo.conf
```

Add the following lines to the `komodo.conf` file and save it (replace rpcuser and rpcpassword)

```bash
rpcuser=usernameChangeItToSomethingSecure
rpcpassword=passwordChangeItToSomethingSecure
txindex=1
server=1
daemon=1
rpcworkqueue=256
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
addnode=na.smk.dog
addnode=dev.smk.dog
addnode=na_3p.smk.dog
addnode=dev_3p.smk.dog
addnode=77.75.121.138
addnode=95.213.238.100
addnode=94.130.148.142
addnode=103.6.12.105
addnode=139.99.209.214
addnode=185.130.212.13
addnode=5.9.142.219
addnode=200.25.4.38
addnode=139.99.136.148
```

Restrict access to the `komodo.conf` file

```bash
chmod 600 ~/.komodo/komodo.conf
```

---

## Generate two `pubkey`, `address` & `WIF`'s

The mainnet notary node operators have to provide 2 seperate pubkeys, one for your Main Server and one for your 3rd Party Server. This means you will have to generate 2 seed phrases (i.e passphrases) individually which will generate the 2 pubkeys, set of addresses and private keys (WIF). You will need to create your Main pubkey on your Main Server & follow the same actions on your 3rd Party Server for your 3rd Party pubkey. These pubkeys need to be PR'd into your proposal on [https://github.com/KomodoPlatform/NotaryNodes](https://github.com/KomodoPlatform/NotaryNodes) soon after an election.

**DO NOT IMPORT YOUR MAIN PUBKEY INTO ANY 3RD PARTY DAEMON. For security, you should never enter your seed phrase or privatekey in any other node than your specific notary node server. If you ever expose a private key for any particular coin, it can be converted to all other coins easily.**

### Generating a pubkey

The mainnet notary node operators need to provide 2 sets of pubkey to Kolo when he asks for it (pubkey starts with `02` or `03`). Follow [this guide](./generate-privkeys-third-party-coins-from-passphrase.md) to generate all the required info in your own server. You will need the "Compressed Public Key", "Compressed WIF" and "Compressed Address" from the output generated by the script. Based on the default seed used in the `genkomodo.php` file, we get the following information:

```bash
Pubkey: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1

LTC Address: LfK5cYTTSDoSVSYtxkTVv8dGnqXYZRsn86
LTC WIF: 6vCN7rsS1bPFgs98G2PQgcHP2EArh39Un1QDh16YrPrJxCZTthq

KMD Address: RVNKRr2uxPMxJeDwFnTKjdtiLtcs7UzCZn
KMD WIF: UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh

EMC2 Address: EdF2quz8nWrJDwTbbTTieFYUMGfPsVB5dv
EMC2 WIF: T7trfubd9dBEWe3EnFYfj1r1pBueqqCaUUVKKEvLAfQvz3JFsNhs

AYA Address: AVjkMgFfmMZbpFvmTxCcxadnD6g1EdQue3
AYA WIF: T6oxgc9ZYJA1Uvsm31Gb8Mg31hHgLWue7RuqQMjEHUWZEi5TdskL
```

CHIPS, all Komodo Smart Chains and Komodo source forks like VRSC use the same address and WIF format as Komodo (KMD).

It is recommended that you write down the randomly generated seed (24 words) in a piece of paper and type directly into your server. Do not keep the seed saved in your local computer.

We will import these keys into our coin daemons and validate them later in this guide.

---

## Setup Iguana

On both servers:

### Clone the repository and build

```bash
cd ~
git clone https://github.com/KomodoPlatform/dPoW -b master
cd dPoW/iguana
./m_notary_build
```

### Create a `pubkey.txt` file

You will need to create a `pubkey.txt` file inside `~/dPoW/iguana` directory. This file will be used to start the dPoW process in the `dpowassets` script later on. `pubkey.txt` file should contain only the pubkey of the appropriate server. The file should contain only the information in the example below. Change `02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1` to the appropriate pubkey for the server the file is on.

```bash
pubkey=02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
```

### Main Server Iguana

The main server iguana will use the port 7776.

#### Create `wp_7776`

Create `wp_7776` file inside the `~/dPoW/iguana` directory with the same passphrase you used to generate your Main address/pubkey. The file should look as follows (replace `YOUR_VERY_SECURE_PASSPHRASE` with your own):

```bash
curl --url "http://127.0.0.1:7776" --data "{\"method\":\"walletpassphrase\",\"params\":[\"YOUR_VERY_SECURE_PASSPHRASE\", 9999999]}"
```

#### Make `wp_7776` file executable

```bash
chmod 700 wp_7776
```

### 3rd Party Server Iguana

The 3rd party server iguana will use the port 7779.

#### Create `wp_7779`

Create `wp_7779` file inside the `~/dPoW/iguana` directory with the same passphrase you used to generate your 3rd Party address/pubkey. The file should look as follows (replace `YOUR_VERY_SECURE_PASSPHRASE` with your own):

```bash
curl --url "http://127.0.0.1:7779" --data "{\"method\":\"walletpassphrase\",\"params\":[\"YOUR_VERY_SECURE_PASSPHRASE\", 9999999]}"
```

#### Make `wp_7779` file executable

```bash
chmod 700 wp_7779
```

---

## Main Server Setup

The instructions below are only required on your main server, which is the one that will be notarizing Komodo, all the Smart Chains and runtime forks to Litecoin. The instructions below are for Ubuntu 20.04. If running on Debian 11x, check the alternative instructions at the bottom of this document.

### Litecoin

#### Step 1: Clone Litecoin source-code and checkout version 16.x

```bash
cd ~
git clone https://github.com/litecoin-project/litecoin --branch 0.16 --single-branch
cd litecoin
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/litecoin` dir for easy compiling and add the contents below to the script. The script will also create symlinks for the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
# LTC build script for Ubuntu & Debian 9 v.3 (c) Decker (and webworker)
berkeleydb () {
    LTC_ROOT=$(pwd)
    LTC_PREFIX="${LTC_ROOT}/db4"
    mkdir -p $LTC_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    cat <<-EOL >atomic-builtin-test.cpp
        #include <stdint.h>
        #include "atomic.h"

        int main() {
        db_atomic_t *p; atomic_value_t oldval; atomic_value_t newval;
        __atomic_compare_exchange(p, oldval, newval);
        return 0;
        }
EOL
    if g++ atomic-builtin-test.cpp -I./db-4.8.30.NC/dbinc -DHAVE_ATOMIC_SUPPORT -DHAVE_ATOMIC_X86_GCC_ASSEMBLY -o atomic-builtin-test 2>/dev/null; then
        echo "No changes to bdb source are needed ..."
        rm atomic-builtin-test 2>/dev/null
    else
        echo "Updating atomic.h file ..."
        sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$LTC_PREFIX
    make install
    cd $LTC_ROOT
}
buildLTC () {
    git pull
    ./autogen.sh
    ./configure LDFLAGS="-L${LTC_PREFIX}/lib/" CPPFLAGS="-I${LTC_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared --with-incompatible-bdb
    make -j$(nproc)
}
berkeleydb
buildLTC
echo "Done building LTC!"
sudo ln -sf /home/$USER/litecoin/src/litecoin-cli /usr/local/bin/litecoin-cli
sudo ln -sf /home/$USER/litecoin/src/litecoind /usr/local/bin/litecoind
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create Litecoin data dir, `litecoin.conf` file and restrict access to it

```bash
cd ~
mkdir .litecoin
nano ~/.litecoin/litecoin.conf
```

Insert the following contents inside the `litecoin.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
txindex=1
rpcport=9332
rpcuser=litecoinrpcChangeThisToSomethingSecure
rpcpassword=passwordChangeThisToSomethingSecure
```

Restrict access to the `litecoin.conf` file

```bash
chmod 600 ~/.litecoin/litecoin.conf
```

### Start the daemons and sync all the chains

For the first time sync, we will run all the coin daemons normally. Make sure you have successfully compiled all the daemons from the above section. We will create a `start` script later in this guide to start the chains with `-pubkey` option for notarization.

### Start the coins

```bash
komodod &
litecoind &
```

### Start Komodo and all the Smart Chains

```bash
cd ~/komodo/src
./assetchains.old
```

Now wait for all the chains to finish syncing. This might take about 8-10 hours depending on your machine and internet connection. You can check check sync progress by using `tail -f` on the `debug.log` file in the respective coin data directories. Komodo Smart Chains have their own data directory inside the `~/.komodo` directory.

Commands to tail `debug.log`

```bash
# LTC
tail -f ~/.litecoin/debug.log
# KMD
tail -f ~/.komodo/debug.log
# SUPERNET
tail -f ~/.komodo/SUPERNET/debug.log
```

For any other Komodo Smart Chain, use the example of SUPERNET and change the path with the coin name that you are looking for accordingly. You can now wait for all the coins to finish syncing. Just double check the blocks you've downloaded with an explorer to verify.

### Import your main private key

Feel free to import these as the daemons are syncing.

- Follow the below example to import your main pubkey **only** into your coin daemons.

```bash
komodo-cli importprivkey <KMD PRIVATE KEY>
litecoin-cli importprivkey <LTC PRIVATE KEY>
```

- For all other Komodo Smart Chains, use the following command to import privkey

```bash
cd ~/komodo/src
./fiat-cli importprivkey <KMD PRIVATE KEY>
```

This command will import keys into all Smart Chains that are using the main Komodo daemon. This may take some time and will display the coin name and address after each import. You can tail the coin specific `debug.log` files to check the progress.

### Validate the addresses

After all the addresses are imported, using the respective `<COIN>-cli`, validate all addresses and make sure the response has `ismine:true`. If you have `ismine:false`, your address wasn't imported correctly and dPoW will not work for that coin. Sample command for that is below.

```bash
komodo-cli validateaddress RVNKRr2uxPMxJeDwFnTKjdtiLtcs7UzCZn
```

#### Copy the `pubkey.txt` file that we created from the `~/dPoW/iguana` dir

You will need to create a `pubkey.txt` file inside `~/komodo/src/`. This file will be used to start all of your daemons with the `-pubkey=` parameter in your `start` script that will be made later in this guide.

```bash
cp ~/dPoW/iguana/pubkey.txt ~/komodo/src/pubkey.txt
```

### Stop All the Coin Daemons Safely

Once you've completed syncing, imported and validated your keys in all your daemons, complete the following.

Never use `kill -9` to kill any Coin daemon if you don't like corrupt databases. Always shutdown wallet daemon and iguana gracefully with `pkill -15 iguana` or use the below RPC commands for wallets.

```bash
komodo-cli stop
litecoin-cli stop
```

For all other Komodo Smart Chains, use the following command to `stop` the daemons.

```bash
cd ~/komodo/src
./fiat-cli stop
```

### After all the chains' daemons were stopped gracefully, let's restrict access to all the Komodo Smart Chains' `.conf` files inside `~/.komodo` dir

```bash
find ~/.komodo -type f -iname "*.conf" -exec chmod 600 {} \;
```

To complete setting up your main server, go to the [Set 'ulimit' parameters on Ubuntu permanently](#set-ulimit-parameters-on-ubuntu-permanently) section.

---

## 3rd Party Server Setup (Pending third party updates)

The instructions below are only required on your 3rd party server, which is the one that will be notarizing 3rd party coins to Komodo.

### Aryacoin (AYA)

#### Step 1: Clone AYA source

```bash
cd ~
git clone https://github.com/KomodoPlatform/AYAv2
cd AYAv2
git checkout 94e6bc0
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/AYAv2` dir for easy compiling and add the contents below to the script. The script will also create symlinks for the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
# AYA build script for Ubuntu & Debian 9 v.3 (c) Decker (and webworker)
berkeleydb () {
    AYA_ROOT=$(pwd)
    AYA_PREFIX="${AYA_ROOT}/db4"
    mkdir -p $AYA_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    cat <<-EOL >atomic-builtin-test.cpp
        #include <stdint.h>
        #include "atomic.h"

        int main() {
        db_atomic_t *p; atomic_value_t oldval; atomic_value_t newval;
        __atomic_compare_exchange(p, oldval, newval);
        return 0;
        }
EOL
    if g++ atomic-builtin-test.cpp -I./db-4.8.30.NC/dbinc -DHAVE_ATOMIC_SUPPORT -DHAVE_ATOMIC_X86_GCC_ASSEMBLY -o atomic-builtin-test 2>/dev/null; then
        echo "No changes to bdb source are needed ..."
        rm atomic-builtin-test 2>/dev/null
    else
        echo "Updating atomic.h file ..."
        sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$AYA_PREFIX
    make install
    cd $AYA_ROOT
}
buildAYA () {
    git pull
    ./autogen.sh
    ./configure LDFLAGS="-L${AYA_PREFIX}/lib/" CPPFLAGS="-I${AYA_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared --with-incompatible-bdb
    make -j$(nproc)
}
berkeleydb
buildAYA
echo "Done building AYA!"
sudo ln -sf /home/$USER/AYAv2/src/aryacoin-cli /usr/local/bin/aryacoin-cli
sudo ln -sf /home/$USER/AYAv2/src/aryacoind /usr/local/bin/aryacoind
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create AYA data dir, `aryacoin.conf` file and restrict access to it

```bash
cd ~
mkdir .aryacoin
nano ~/.aryacoin/aryacoin.conf
```

Insert the following contents inside the `aryacoin.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
addnode=na_3p.smk.dog
addnode=dev_3p.smk.dog
```

Restrict access to the `aryacoin.conf` file

```bash
chmod 600 ~/.aryacoin/aryacoin.conf
```

### Chips

#### Step 1: Clone CHIPS source

```bash
cd ~
git clone https://github.com/chips-blockchain/chips -b master
cd chips
git checkout 6e7560a
```

#### Step 2: Build

##### Ubuntu 18.04

```bash
./build.sh
```

##### Debian 10 and Ubuntu 20.04

Replace the contents of the `build.sh` file with the following code

```bash
#!/bin/bash

berkeleydb() {
    CHIPS_ROOT=$(pwd)
    CHIPS_PREFIX="${CHIPS_ROOT}/db4"
    mkdir -p $CHIPS_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    cat <<-EOL >atomic-builtin-test.cpp
        #include <stdint.h>
        #include "atomic.h"

        int main() {
        db_atomic_t *p; atomic_value_t oldval; atomic_value_t newval;
        __atomic_compare_exchange(p, oldval, newval);
        return 0;
        }
EOL
    if g++ atomic-builtin-test.cpp -I./db-4.8.30.NC/dbinc -DHAVE_ATOMIC_SUPPORT -DHAVE_ATOMIC_X86_GCC_ASSEMBLY -o atomic-builtin-test 2>/dev/null; then
        echo "No changes to bdb source are needed ..."
        rm atomic-builtin-test 2>/dev/null
    else
        echo "Updating atomic.h file ..."
        sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$CHIPS_PREFIX
    make install
    cd $CHIPS_ROOT
}

buildCHIPS() {
    git pull
    ./autogen.sh
    ./configure LDFLAGS="-L${CHIPS_PREFIX}/lib/" CPPFLAGS="-I${CHIPS_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared
    make -j$(nproc)
}
berkeleydb
buildCHIPS
echo "Done building CHIPS!"
```

then, run the script

```bash
./build.sh
```

#### Step 3: Symlink the compiled binaries

```shell
sudo ln -sf /home/$USER/chips/src/chips-cli /usr/local/bin/chips-cli
sudo ln -sf /home/$USER/chips/src/chipsd /usr/local/bin/chipsd
```

#### Step 4: Create CHIPS data dir, `chips.conf` file and restrict access to it

```bash
cd ~
mkdir .chips
nano ~/.chips/chips.conf
```

Insert the following contents inside the `chips.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
addnode=na_3p.smk.dog
addnode=dev_3p.smk.dog
addnode=159.69.23.29
addnode=95.179.192.102
addnode=149.56.29.163
addnode=145.239.149.173
addnode=178.63.53.110
addnode=151.80.108.76
addnode=185.137.233.199
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `chips.conf` file

```bash
chmod 600 ~/.chips/chips.conf
```

### Einsteinium (EMC2)

#### Step 1: Clone EMC2 source

```bash
cd ~
git clone https://github.com/emc2foundation/einsteinium -b master
cd einsteinium
git checkout c329ae6
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/einsteinium` dir for easy compiling and add the contents below to the script. The script will also create symlinks for the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
berkeleydb () {
    EMC2_ROOT=$(pwd)
    EMC2_PREFIX="${EMC2_ROOT}/db4"
    mkdir -p $EMC2_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    cat <<-EOL >atomic-builtin-test.cpp
        #include <stdint.h>
        #include "atomic.h"

        int main() {
        db_atomic_t *p; atomic_value_t oldval; atomic_value_t newval;
        __atomic_compare_exchange(p, oldval, newval);
        return 0;
        }
EOL
    if g++ atomic-builtin-test.cpp -I./db-4.8.30.NC/dbinc -DHAVE_ATOMIC_SUPPORT -DHAVE_ATOMIC_X86_GCC_ASSEMBLY -o atomic-builtin-test 2>/dev/null; then
        echo "No changes to bdb source are needed ..."
        rm atomic-builtin-test 2>/dev/null
    else
        echo "Updating atomic.h file ..."
        sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$EMC2_PREFIX
    make install
    cd $EMC2_ROOT
}

buildEMC2 () {
    git pull
    make clean
    ./autogen.sh
    ./configure LDFLAGS="-L${EMC2_PREFIX}/lib/" CPPFLAGS="-I${EMC2_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared
    make -j$(nproc)
}

cd ~/einsteinium
berkeleydb
buildEMC2

sudo ln -sf /home/$USER/einsteinium/src/einsteinium-cli /usr/local/bin/einsteinium-cli
sudo ln -sf /home/$USER/einsteinium/src/einsteiniumd /usr/local/bin/einsteiniumd
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create EMC2 data dir, `einsteinium.conf` file and restrict access to it

```bash
cd ~
mkdir .einsteinium
nano ~/.einsteinium/einsteinium.conf
```

Insert the following contents inside the `einsteinium.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
addnode=na_3p.smk.dog
addnode=dev_3p.smk.dog
```

Restrict access to the `einsteinium.conf` file

```bash
chmod 600 ~/.einsteinium/einsteinium.conf
```

### MarmaraChain (MCL)

#### Step 1: Clone MCL source and compile

```bash
cd ~
git clone https://github.com/marmarachain/marmara -b master
cd marmara
git checkout a92d834
./zcutil/build.sh -j$(nproc)
```

### Milevium (MIL)

#### Step 1: Clone MIL source and compile

```bash
cd ~
git clone https://github.com/emc2foundation/mil -b master
cd mil
git checkout 578bed7
```

#### Step 2: Update the build script

Open the `build.sh` script inside the `~/mil` dir and replace the contents below to the script. The script will also create symlinks for the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
# MIL build script for Ubuntu & Debian 9 v.3 (c) Decker (and webworker)
berkeleydb () {
    MIL_ROOT=$(pwd)
    MIL_PREFIX="${MIL_ROOT}/db4"
    mkdir -p $MIL_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    cat <<-EOL >atomic-builtin-test.cpp
        #include <stdint.h>
        #include "atomic.h"

        int main() {
        db_atomic_t *p; atomic_value_t oldval; atomic_value_t newval;
        __atomic_compare_exchange(p, oldval, newval);
        return 0;
        }
EOL
    if g++ atomic-builtin-test.cpp -I./db-4.8.30.NC/dbinc -DHAVE_ATOMIC_SUPPORT -DHAVE_ATOMIC_X86_GCC_ASSEMBLY -o atomic-builtin-test 2>/dev/null; then
        echo "No changes to bdb source are needed ..."
        rm atomic-builtin-test 2>/dev/null
    else
        echo "Updating atomic.h file ..."
        sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$MIL_PREFIX
    make install
    cd $MIL_ROOT
}
buildMIL () {
    git pull
    ./autogen.sh
    ./configure LDFLAGS="-L${MIL_PREFIX}/lib/" CPPFLAGS="-I${MIL_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared --with-incompatible-bdb
    make -j$(nproc)
}
berkeleydb
buildMIL
echo "Done building MIL!"
sudo ln -sf /home/$USER/mil/src/mil-cli /usr/local/bin/mil-cli
sudo ln -sf /home/$USER/mil/src/mild /usr/local/bin/mild
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create MIL data dir, `mil.conf` file and restrict access to it

```bash
cd ~
mkdir .mil
nano ~/.mil/mil.conf
```

Insert the following contents inside the `mil.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
addnode=na_3p.smk.dog
addnode=dev_3p.smk.dog
```

Restrict access to the `mil.conf` file

```bash
chmod 600 ~/.mil/mil.conf
```

### SFUSD

#### Step 1: Clone sfusd-core source

```bash
cd ~
git clone https://github.com/pbcllc/sfusd-core
cd ~/sfusd-core
git checkout 4e79e1b
```

#### Build

- Create a file named `build.sh` in the `~/sfusd-core` directory and copy the contents of the following code block into it

```bash
#!/bin/bash
# SFUSD build script for Ubuntu & Debian 9 v.3 (c) Decker (and webworker)
berkeleydb () {
    SFUSD_ROOT=$(pwd)
    SFUSD_PREFIX="${SFUSD_ROOT}/db4"
    mkdir -p $SFUSD_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    cat <<-EOL >atomic-builtin-test.cpp
        #include <stdint.h>
        #include "atomic.h"

        int main() {
        db_atomic_t *p; atomic_value_t oldval; atomic_value_t newval;
        __atomic_compare_exchange(p, oldval, newval);
        return 0;
        }
EOL
    if g++ atomic-builtin-test.cpp -I./db-4.8.30.NC/dbinc -DHAVE_ATOMIC_SUPPORT -DHAVE_ATOMIC_X86_GCC_ASSEMBLY -o atomic-builtin-test 2>/dev/null; then
        echo "No changes to bdb source are needed ..."
        rm atomic-builtin-test 2>/dev/null
    else
        echo "Updating atomic.h file ..."
        sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$SFUSD_PREFIX
    make install
    cd $SFUSD_ROOT
}
buildSFUSD () {
    git pull
    ./autogen.sh
    ./configure LDFLAGS="-L${SFUSD_PREFIX}/lib/" CPPFLAGS="-I${SFUSD_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared --with-incompatible-bdb
    make -j$(nproc)
}
berkeleydb
buildSFUSD
echo "Done building SFUSD!"
sudo ln -sf /home/$USER/sfusd-core/src/smartusd-cli /usr/local/bin/smartusd-cli
sudo ln -sf /home/$USER/sfusd-core/src/smartusdd /usr/local/bin/smartusdd
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

- Supply your `sudo` password when asked, so that the daemon and cli can be symlinked to your `/usr/local/bin` directory

#### Step 4: Create SFUSD data dir, smartusd.conf file and restrict access to it

```bash
cd ~
mkdir .smartusd
nano ~/.smartusd/smartusd.conf
```

Insert the following contents inside the smartusd.conf file and save it. (change the rpcuser and rpcpassword values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
addnode=na_3p.smk.dog
addnode=dev_3p.smk.dog
```

Restrict access to the smartusd.conf file

```bash
chmod 600 ~/.smartusd/smartusd.conf
```

::: tip Note

SFUSD's address and wif format are the same as KMD. You can import your 3p KMD node's wif into the SFUSD daemon directly.

SFUSD's rpc calls are similar to BTC's after version `v0.16`. So instead of `getinfo`, use other rpc like `getblockchaininfo`, `getnetworkinfo`, `getwalletinfo`, `getmininginfo` for the appropriate fields.

:::

### Tokel (TKL)

#### Step 1: Clone TKL source and compile

```bash
cd ~
git clone https://github.com/TokelPlatform/tokel -b tokel
cd tokel
git checkout 65d50d0
./zcutil/build.sh -j$(nproc)
```
Symlink the compiled binaries

```bash
sudo ln -sf /home/$USER/tokel/src/tokeld /usr/local/bin/tokeld
sudo ln -sf /home/$USER/tokel/src/tokel-cli /usr/local/bin/tokel-cli
```


### VerusCoin (VRSC)

#### Step 1: Clone VRSC source and compile

```bash
cd ~
git clone https://github.com/VerusCoin/VerusCoin -b master
cd VerusCoin
# git checkout (TBA: final commit in review)
./zcutil/build.sh -j$(nproc)
```

Symlink the compiled binaries

```bash
sudo ln -sf /home/$USER/VerusCoin/src/verusd /usr/local/bin/verusd
sudo ln -sf /home/$USER/VerusCoin/src/verus /usr/local/bin/verus
```

### Start the daemons and sync all the chains

For the first time sync, we will run all the coin daemons normally. Make sure you have successfully compiled all the daemons from the above section. We will create a `start` script later in this guide to start the chains with `-pubkey` option for notarization.

### Start the coins


```bash
komodod &
aryacoind &
chipsd &
einsteiniumd &
~/marmara/src/komodod -ac_name=MCL -ac_supply=2000000 -ac_cc=2 -addnode=5.189.149.242 -addnode=161.97.146.150 -addnode=149.202.158.145 -addressindex=1 -spentindex=1 -ac_marmara=1 -ac_staked=75 -ac_reward=3000000000 &
mild &
smartusdd &
tokeld &
verusd &
```

Now wait for all the chains to finish syncing. This might take about 8-10 hours depending on your machine and internet connection. You can check check sync progress by using `tail -f` on the `debug.log` file in the respective coin data directories.

Commands to tail `debug.log`

```bash
# KMD
tail -f ~/.komodo/debug.log
# AYA
tail -f ~/.aryacoin/debug.log
# CHIPS
tail -f ~/.chips/debug.log
# EMC2
tail -f ~/.einsteinium/debug.log
# MCL
tail -f ~/.komodo/MCL/debug.log
# MIL
tail -f ~/.mil/debug.log
# SFUSD
tail -f ~/.smartusd/debug.log
# TOKEL
tail -f ~/.komodo/TOKEL/debug.log
# VRSC
tail -f ~/.komodo/VRSC/debug.log
```

You can now wait for all the coins to finish syncing. Just double check the block you've downloaded with an explorer to verify.

### Import 3rd party private key

Feel free to import your addresses whilst your daemons are syncing.

- Follow the example below to import your 3rd party pubkey **only** into your coin daemons.

```bash
komodo-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
aryacoin-cli importprivkey T6oxgc9ZYJA1Uvsm31Gb8Mg31hHgLWue7RuqQMjEHUWZEi5TdskL
chips-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
einsteinium-cli importprivkey T7trfubd9dBEWe3EnFYfj1r1pBueqqCaUUVKKEvLAfQvz3JFsNhs
komodo-cli -ac_name=MCL importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
mil-cli importprivkey cSXsCzbmiZUyMCZyPqjYMhLxBxcFBP6tQSLrCpTpfYkvjJEMthcW
smartusd-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
tokel-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
verus importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
```

This may take some time and will display the coin name and address after each import. You can tail the coin specific `debug.log` files to check the progress.

### Validate the addresses

After all the addresses are imported, using the respective `<COIN>-cli`, validate all addresses and make sure the response has `ismine:true`. If you have `ismine:false`, your address hasn't imported correctly and dPoW will not work for that coin. Sample command for that is below.

```bash
komodo-cli validateaddress RVNKRr2uxPMxJeDwFnTKjdtiLtcs7UzCZn
```

#### Copy the `pubkey.txt` file that we created from the `~/dPoW/iguana` dir

You will need to create a `pubkey.txt` file inside `~/komodo/src/`. This file will be used to start all of your daemons with the `-pubkey=` parameter in your `start` script that will be made later in this guide.

```bash
cp ~/dPoW/iguana/pubkey.txt ~/komodo/src/pubkey.txt
```

### Stop All the Coin Daemons Safely

Once your daemons have completed syncing, you've imported and validated all your keys, complete the following.

Never use `kill -9` to kill any Coin daemon if you don't like corrupt databases. Always shutdown wallet daemon and iguana gracefully with `pkill -15 iguana` or use the below RPC commands for wallets.

```bash
komodo-cli stop
aryacoin-cli stop
chips-cli stop
einsteinium-cli stop
komodo-cli -ac_name=MCL stop
mil-cli stop
tokel-cli stop
smartusd-cli stop
verus stop
```

---

## Set `ulimit` parameters on Ubuntu permanently

By default, the number of open files per user in Ubuntu is 1024. In our case this number is too small so we will increase it.

This is done with the `ulimit` command:

```bash
$ulimit -a   # see all the kernel parameters
$ulimit -n   # see the number of open files
$ulimit -n 1000000  #  set the number open files to 1000000
```

The problem with this way is that the `ulimit` parameter is only set currently for this command terminal and user. This means that after a reboot you’ll need to set the parameter again. Do the following to set it permanently:

### Edit the `/etc/security/limits.conf` file

```bash
sudo nano /etc/security/limits.conf
```

add these lines:

```bash
* soft nofile 1000000
* hard nofile 1000000
```

Save and close file

### Edit the `/etc/pam.d/common-session` file

```bash
sudo nano /etc/pam.d/common-session
```

add this line:

```bash
session required pam_limits.so
```

Save and close the file.

We are done. Now let's stop all our wallet daemons safely with RPC commands and reboot the server using `sudo reboot` or `sudo shutdown -r` command.

### Check the values now

```bash
ulimit -n
```

---

## Create a `start` Script

We need a `start` script in the home dir to start Komodo, Smart Chains and all 3rd party coin daemons with the `-pubkey` option. `-pubkey` is not required for LTC daemon. All other coins need it.

Here is an example of a Main Server start script that will start Notary easy mining on Komodo as well:

```bash
#!/bin/bash
source ~/komodo/src/pubkey.txt
litecoind &
sleep 60
cd komodo/src
./komodod -gen -genproclimit=1 -pubkey=$pubkey -minrelaytxfee=0.000035 -opretmintxfee=0.004 -notary=".litecoin/litecoin.conf" &
sleep 600
./assetchains
```

Here is an example of a 3rd Party Server start script :

```bash
#!/bin/bash
source ~/komodo/src/pubkey.txt
aryacoind -pubkey=$pubkey &
chipsd -pubkey=$pubkey &
einsteiniumd -pubkey=$pubkey &
mild -pubkey=$pubkey &
~/marmara/src/komodod -ac_name=MCL -pubkey=$pubkey -ac_supply=2000000 -ac_cc=2 -addnode=5.189.149.242 -addnode=161.97.146.150 -addnode=149.202.158.145 -addressindex=1 -spentindex=1 -ac_marmara=1 -ac_staked=75 -ac_reward=3000000000 &
smartusdd -pubkey=$pubkey &
~/tokel/src/tokeld -pubkey=$pubkey &
~/komodo/src/komodod -notary -pubkey=$pubkey &
~/VerusCoin/src/verusd -pubkey=$pubkey &
```

Make the file executable:

```bash
chmod +x start
```

### Execute the script

This may take upto 20-30 minutes maximum depending on your system spec.

```bash
cd ~
./start
```

**Make sure all daemons started properly before starting iguana in the next step.**

## Start `iguana` and dPoW process

Once all required daemons are running, we have funds on all coins(DM @kolo with your addresses if you need coins), we can go ahead and start `iguana`.

### Main Server

```bash
cd ~/dPoW/iguana
./m_notary_main
```

You can use the `m_notary` script if you wish, but this will issue a `git pull` command to update the repo, remove old iguana, compile fresh and start the whole process. This can take about 10 minutes maximum to finish. You will see `INIT with 64 notaries` once the process finishes.

### 3rd Party Server

```bash
cd ~/dPoW/iguana
./m_notary_3rdparty
```

## Address whitelisting

If you are using a whitelist for incoming transactions (recommended to avoid dust attacks!) funding top ups will come from `RDragoNHdwovvsDLSLMiAEzEArAD3kq6FN` for your Main node, and `RHound8PpyhVLfi56dC7MK3ZvvkAmB3bvQ` for your 3P node, so add these addresses to your respective whitelists.

## Firewall and Ports

Enable `ufw` and close all routes except `ssh`. Then allow p2p ports of all the coins in their respective servers. Allow iguana's p2p ports: `13347` in main server and `13344` in the 3p server.

## NN Scripts

There are many open sourced scripts for managing your Komodo Notary Node servers. If you're having trouble with something, you can have a look at [these tools](https://github.com/KomodoPlatform/komodotools), or ask the other NN's, who will show you the scripts they use to overcome issues. With that being said, if you find a way to make a job easier or find a way to better the ecosystem, please let the rest of the NN OPs know, we would love to hear it.

## MM2 Seed node setup

Simple scripts to setup and configure MM2 as a seednode on your 3P server are available at - [https://github.com/smk762/nn_mm2_seed](https://github.com/smk762/nn_mm2_seed). The mm2 seed node will also need ports `38890` and `38900` opened on the 3p server.


# Setup for Debian 11

Install the following dependancies:
```
sudo apt-get install -y tmux dc bc dnsutils speedtest-cli build-essential git libsodium-dev libssl-dev pkg-config autoconf automake bsdmainutils cmake curl g++-multilib htop libboost-all-dev libc6-dev libgtest-dev libtool m4 software-properties-common unzip wget zlib1g-dev binutils-dev clang jq libcurl4-openssl-dev libdb++-dev libevent-dev libexpat1-dev libgnutls28-dev libldns-dev liblzma-dev libnanomsg-dev libncurses-dev libprotobuf-dev libqrencode-dev libreadline-dev libunwind-dev ncurses-dev ntp ntpdate protobuf-compiler python3-pip
```

Use the template below to create build scripts for coins as needed:

```bash
# AnyCoin compile script (q) Decker, 2021-2022
make -C ${PWD}/depends v=1 NO_PROTON=1 NO_QT=1 HOST=$(depends/config.guess) -j$(nproc --all)

./autogen.sh

CXXFLAGS="-g0 -O2" \
CONFIG_SITE="$PWD/depends/$(depends/config.guess)/share/config.site" ./configure --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --with-gui=no --disable-bip70

make V=1 -j$(nproc --all)
```