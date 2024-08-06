protoc \
--js_out=import_style=commonjs,binary:./src \
./core/Tron.proto ./core/contract/*.proto
