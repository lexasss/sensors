rem abort on errors
set -e

rem build
call npm run build

rem navigate into the build output directory
cd dist

rem if you are deploying to a custom domain
rem echo 'www.example.com' > CNAME

call git init
call git add -A
call git commit -m 'deploy'
call git remote add origin https://github.com/lexasss/sensors

rem if you are deploying to https://<USERNAME>.github.io
rem git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

rem if you are deploying to https://<USERNAME>.github.io/<REPO>
call git push -f origin master:gh-pages

cd ..