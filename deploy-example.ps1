##
## Simple example PS script to show deployment steps
## App will be deployed to $outdir sub-folder
##
$outdir = "appdeploy"

rmdir -fo -r $outdir | Out-Null
mkdir $outdir
cp server-api/server.js $outdir
cp server-api/package.json $outdir

npm run build-prod
cp -r -fo dist appdeploy/public
cd $outdir
npm install --production

$env:NODE_ENV = "production"
$env:APPSETTING_STORAGE_ACCOUNT = "mystoreaccount"
$env:APPSETTING_STORAGE_KEY = "1234567890987654321"