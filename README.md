# protocol [![Build Status](https://travis-ci.org/tronprotocol/protocol.svg?branch=master)](https://travis-ci.org/tronprotocol/protocol)

# **This fork is for ledger clear signing.**

# The protocol of Tron including api and message.

The protocol is an independent project. You can use it for building other application.

java-tron, wallet-cli and grpc-gateway

git subtree pull --prefix src/main/protos/ protocol master

## Run the included \*.sh files to initialize the dependencies

```shell
sh install-protobuf.sh
```

## Generate js file

1. generate js file

```shell
protoc --js_out=import_style=commonjs,binary:./src ./core/Tron.proto ./core/contract/smart_contract.proto
```

2. update `Tron_pb.js`

```diff
- var jspb = require('google-protobuf');
+ import jspb from '../index';

  var goog = jspb;
  var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

- var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
+ import google_protobuf_any_pb from '../any_pb';
```

Add `export default` in the end:

```js
export default proto.protocol;
```

3. update `smart_contract_pb.js`

```diff
- var jspb = require('google-protobuf');
+ import jspb from '../../index';
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

- var core_Tron_pb = require('../../core/Tron_pb.js');
+ import core_Tron_pb from '../Tron_pb';
```

Add `export default` in the end:

```js
export default proto.protocol;
```

4. build with vite

```shell
npm run build
```

5.
