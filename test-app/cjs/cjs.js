import bs58 from "bs58check"; 
import * as SmartContractPb from "../../src/core/contract/smart_contract_pb";
import * as TronPb from "../../src/core/Tron_pb";

console.log(SmartContractPb, TronPb);

const TriggerSmartContract = SmartContractPb.TriggerSmartContract;
const Transaction = TronPb.Transaction;

export function deserializeContractInfoFromHex(rawTx) {
  try {
    const transaction = Transaction.raw.deserializeBinary(Uint8Array.from(Buffer.from(rawTx, 'hex')));
    const contract = transaction.getContractList()?.[0];
    if (!contract) { return; }
    const type = contract.getType();
    if (type !== 31) { return; }

    const value = contract.getParameter().getValue();
    const smartContract = TriggerSmartContract.deserializeBinary(value);
    const contractAddress = bs58.encode(smartContract.getContractAddress());
    const data = Buffer.from(smartContract.getData()).toString('hex');
    const selector = '0x' + data.slice(0, 8).toLowerCase();
    return { contractAddress, selector };
  } catch (e) {
    console.error(`[hw-app-trx]: failed to deserialize transaction from hex: ${String(e)}`);
  }
}

const rawDataHex = '0a0241102208bca62ed0108d4fd040d8b5d5e287325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541573708726db88a32c1b9c828fef508577cfb84831215410e1bce983f78f8913002c3f7e52daf78de6da2cb2244a9059cbb000000000000000000000000573708726db88a32c1b9c828fef508577cfb8483000000000000000000000000000000000000000000000000000000000000000a70d9fbd1e28732900180ade204';
const transactionInfo = deserializeContractInfoFromHex(rawDataHex);
const { contractAddress, selector } = transactionInfo;
console.log(contractAddress, 'TBFomoujFqse6megmarBS3FYAw4chnJbVu' == contractAddress);
console.log(selector, '0xa9059cbb' == selector);

