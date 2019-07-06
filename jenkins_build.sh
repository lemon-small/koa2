rm -rf node_modules
cnpm install
npm run client:prodefault
npm run server:prod
cp  ./package.json ./dist