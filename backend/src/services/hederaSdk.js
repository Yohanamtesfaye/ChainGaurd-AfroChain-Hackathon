import { Client, AccountBalanceQuery, AccountId, PrivateKey } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

const { HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY } = process.env;

let client = null;

if (HEDERA_ACCOUNT_ID && HEDERA_PRIVATE_KEY) {
  try {
    let operatorKey;
    const cleanedKey = HEDERA_PRIVATE_KEY.replace(/^0x/, '').toLowerCase();

    if (/^[0-9a-f]{64}$/.test(cleanedKey)) {
      // 64-byte hex string → treat as raw ECDSA private key
      operatorKey = PrivateKey.fromStringECDSA(cleanedKey);
    } else if (/^30/.test(cleanedKey)) {
      // Likely DER hex string
      operatorKey = PrivateKey.fromStringDer(cleanedKey);
    } else {
      // Fallback to generic parser (handles mnemonic or other encodings)
      operatorKey = PrivateKey.fromString(HEDERA_PRIVATE_KEY);
    }

    client = Client.forTestnet().setOperator(AccountId.fromString(HEDERA_ACCOUNT_ID), operatorKey);
  } catch (err) {
    console.error('❌ Failed to parse Hedera private key:', err.message);
  }
}

export { client };

// Simple function to prove SDK connectivity, optional call at startup
export async function verifySdkConnection() {
  if (!client) {
    console.warn('⚠️  Hedera SDK not configured (missing account ID or private key)');
    return;
  }
  try {
    const balance = await new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(HEDERA_ACCOUNT_ID))
      .execute(client);
    console.log(
      `✅ Hedera SDK connected. Account ${HEDERA_ACCOUNT_ID} balance: ${balance.hbars.toString()}`
    );
  } catch (err) {
    console.error('❌ Hedera SDK connection failed:', err.message);
  }
}
