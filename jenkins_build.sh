rm -rf node_modules
cnpm install
echo 123
npm run client:prodefault
npm run server:prod
cp  ./package.json ./dist