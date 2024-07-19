# protocol [![Build Status](https://travis-ci.org/tronprotocol/protocol.svg?branch=master)](https://travis-ci.org/tronprotocol/protocol)

# **This fork is for ledger clear signing.**

# The protocol of Tron including api and message.

The protocol is an independent project. You can use it for building other application.

java-tron, wallet-cli and grpc-gateway

git subtree pull --prefix src/main/protos/ protocol master

## 1. Run the included \*.sh files to initialize the dependencies

```shell
sh install-protobuf.sh
```

## 2. Install dependency and build

```shell
pnpm i
npm run build
```

## 3. Copy file to ledger-live repo

```shell
cp build/smart_contract_pb.ts ledger-live/libs/ledgerjs/packages/hw-app-trx/src/protobuf/
```
