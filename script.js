const express = require('express');
const { ethers } = require('ethers');
const { performance } = require('perf_hooks');

// Configuration
const CONFIG = {
    rpcEndpoint: 'http://127.0.0.1:9650/ext/bc/tTkxtG6jFgSTZw4aRzy5bNKQsF64hdqtJ7N1psDmM65rjCdEV/rpc',
    chainId: 123,
    batchSize: 30,           // Optimal batch size
    parallelBatches: 150,    // Maximum parallelization
    recipientAddress: '',
    privateKey: ''
};

let successfulTxs = 0;
let failedTxs = 0;
let startTime = null;
let isRunning = true;
let globalNonce = null;
const providerPool = [];
const walletPool = [];

// Pre-create all transactions
const createTxBatch = (startNonce, gasPrice) => {
    return Array.from({ length: CONFIG.batchSize }, (_, i) => ({
        to: CONFIG.recipientAddress,
        value: ethers.parseEther('0.0001'),
        nonce: startNonce + i,
        gasPrice,
        gasLimit: 21000n,
        chainId: CONFIG.chainId
    }));
};

async function sendBatch(startNonce, batchIndex) {
    try {
        const wallet = walletPool[batchIndex % walletPool.length];
        const provider = providerPool[batchIndex % providerPool.length];
        
        const gasPrice = await provider.getFeeData().then(data => data.gasPrice);
        const txs = createTxBatch(startNonce, gasPrice);
        
        await Promise.all(
            txs.map(tx => 
                wallet.sendTransaction(tx)
                    .then(() => { successfulTxs++; })
                    .catch(err => {
                        if (!err.message.includes('already known')) {
                            failedTxs++;
                        }
                    })
            )
        );
    } catch (error) {
        console.error('Batch error:', error.message);
    }
}

async function runLoadTest() {
    try {
        // Initialize provider and wallet pools
        console.log('Initializing provider and wallet pools...');
        for (let i = 0; i < 20; i++) {
            const provider = new ethers.JsonRpcProvider(CONFIG.rpcEndpoint);
            const wallet = new ethers.Wallet(CONFIG.privateKey, provider);
            providerPool.push(provider);
            walletPool.push(wallet);
        }

        const balance = await providerPool[0].getBalance(walletPool[0].address);
        console.log('Wallet balance:', ethers.formatEther(balance), 'AVAX');

        globalNonce = await providerPool[0].getTransactionCount(walletPool[0].address);
        startTime = performance.now();

        process.on('SIGINT', () => {
            isRunning = false;
            printStats(true);
        });

        while (isRunning) {
            const batchPromises = [];
            for (let i = 0; i < CONFIG.parallelBatches; i++) {
                const batchStartNonce = globalNonce + (i * CONFIG.batchSize);
                batchPromises.push(sendBatch(batchStartNonce, i));
            }

            await Promise.all(batchPromises);
            globalNonce += CONFIG.batchSize * CONFIG.parallelBatches;

            // Optional micro-delay to prevent overwhelming the node
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

function printStats(final = false) {
    const currentTime = performance.now();
    const totalTime = (currentTime - startTime) / 1000;
    const tps = successfulTxs / totalTime;

    if (final) {
        console.log('\nFinal Results');
        console.log('====================');
        console.log(`Total Running Time: ${(totalTime / 60).toFixed(2)} minutes`);
        console.log(`Total Successful Transactions: ${successfulTxs}`);
        console.log(`Total Failed Transactions: ${failedTxs}`);
        console.log(`Final TPS: ${tps.toFixed(2)}`);
        console.log(`Success Rate: ${((successfulTxs / (successfulTxs + failedTxs)) * 100).toFixed(2)}%`);
    }
}

const app = express();
app.use(express.json());

app.get('/transactions/successful', (req, res) => {
    res.json({ successfulTxs });
});

app.get('/transactions/failed', (req, res) => {
    res.json({ failedTxs });
});

app.get('/transactions/tps', (req, res) => {
    const currentTime = performance.now();
    const totalTime = (currentTime - startTime) / 1000;
    const tps = successfulTxs / totalTime;
    res.json({ averageTPS: tps.toFixed(2) });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('Maximum Performance Transaction Test');
    console.log('===================================');
    console.log('Configuration:');
    console.log(`- Batch Size: ${CONFIG.batchSize}`);
    console.log(`- Parallel Batches: ${CONFIG.parallelBatches}`);
    console.log(`- Total Tx per Iteration: ${CONFIG.batchSize * CONFIG.parallelBatches}`);
    console.log(`- Provider Pool Size: 20`);
    console.log('\nStarting test (run for exactly 3 minutes)...\n');
    runLoadTest().catch(console.error);
});