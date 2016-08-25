
# move over files
for i in www/init/*; do mv $i .; done;

echo "*.DS_Store" >> .gitignore
echo "www/js/config.js" >> .gitignore
echo "www/lib/**" >> .gitignore

bower install --save crud lodash jquery moment ngCordova
npm install --save init
