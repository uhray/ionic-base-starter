
# move over files
for i in www/init/*; do mv $i .; done;
mv www/ionic.app.scss scss/

echo "*.DS_Store" >> .gitignore
echo "www/js/config.js" >> .gitignore
echo "www/lib/**" >> .gitignore

bower install --save crud jquery moment ngCordova lodash ionic-platform-web-client
npm install --save gulp-replace-task yargs semantic-ui
gulp
gulp semantic
rm www/init.sh
rm -rf www/init
ionic setup sass
ionic io init
