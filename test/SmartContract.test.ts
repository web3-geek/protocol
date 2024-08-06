/**
 * @jest-environment jsdom
 */
import bs58 from "bs58check"; 
import { TriggerSmartContract } from "../dist/smart_contract_pb";
import { Transaction } from "../dist/Tron_pb";
import { describe, test, expect } from 'vitest'

function deserializeContractInfoFromHex(rawTx: string) {
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

describe("parseTransactionFromHex", () => {
  test('TriggerSmartContract case-0', () => {
    const rawDataHex = '0a0241102208bca62ed0108d4fd040d8b5d5e287325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541573708726db88a32c1b9c828fef508577cfb84831215410e1bce983f78f8913002c3f7e52daf78de6da2cb2244a9059cbb000000000000000000000000573708726db88a32c1b9c828fef508577cfb8483000000000000000000000000000000000000000000000000000000000000000a70d9fbd1e28732900180ade204';
    const transactionInfo = deserializeContractInfoFromHex(rawDataHex);
    expect(transactionInfo).not.toBeNull();
    const { contractAddress, selector } = transactionInfo as TriggerSmartContractInfo;
    expect(contractAddress).toEqual('TBFomoujFqse6megmarBS3FYAw4chnJbVu');
    expect(selector).toEqual('0xa9059cbb');
  });

  test('TransferContract case', () => {
    const rawDataHex = '0a0240f72208eaf4e880211050dc40e0ebd0e287325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541573708726db88a32c1b9c828fef508577cfb84831215410e1bce983f78f8913002c3f7e52daf78de6da2cb2244a9059cbb000000000000000000000000573708726db88a32c1b9c828fef508577cfb8483000000000000000000000000000000000000000000000000000000000000000a70f39ccde28732900180ade204';
    const transactionInfo = deserializeContractInfoFromHex(rawDataHex);
    expect(transactionInfo).not.toBeUndefined();
  })
});
