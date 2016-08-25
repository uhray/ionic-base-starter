Ionic Mobile App
==================

Get started:

```shell
npm install -g ionic
npm install 
bower install 
ionic state restore --plugins  ## This loads all cordova plugins
ionic io init


# From one terminal:
gulp watch

# From another terminal
ionic serve  # loads in browser
ionic emulate # loads in emulator
ionic upload  # Uploads to Ionic View
```


### Configurations

By default your local configurations will be used. The are located in [config/local.js](config/local.js).

If you wish to test with others, you run `gulp watch --env otherfile` where other file is at `config/otherfile.js`.

Also, you can override any of those values by editing your environment. For example: `apiURL=127.0.0.1:5000 gulp config` will allow you to connect to a locally running version of the API.


### Adding Cordova plugis

Say you want to add the plugin `cordova-plugin-console`, you need to run: `ionic plugin add cordova-plugin-console`. IMPORTANT: Do not run `cordova plugin add`.

Next, you need to save your ionic plugins for the next person. Run `ionic state save`. This will place them in the [package.json](package.json).
