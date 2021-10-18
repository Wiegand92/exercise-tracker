# React with TailwindCSS Boilerplate

## About

This is a barebones boilerplate for react with TailwindCSS. It will help you with a quick setup to make a site.

## Using this Repo

### **Initial Setup**

Tailwind can be a bit tricky to make work with your linter. To that end this project includes StyleLint, and you should install the stylelint plugin if you are using VSCode. The extension can be found [here](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

### **Other Quirks**

Tailwind can produce a very large CSS file if you don't set the purge options. That is enabled in this boilerplate but if you add styles anywhere other than the styles folder please add it to the purge array in tailwind.config.js.

Closing out the development server will require you to hit ctrl-c TWO times since the nodemon server and webpack are running concurrently in the terminal window.

### **Actual Setup**

1. Clone the repo

   `git clone https://github.com/Wiegand92/react-tw`

2. Change directories

   `cd react-tw`

3. Remove git history

   `rm -rf .git`

4. Start the development server

   `npm run dev`

The start script will start both the nodemon server, and webpack-dev-server, which proxies the nodemon server. This way we have live-reloading on both the front and back-end!

5. Have fun!

## Tech Included

**Framework**

react  
 react-dom

**Styles**

sass

- I like sass for the modularity it provides, this is optional

postcss

- Postcss will handle post-processing and actually run the tailwind compiler.

tailwindcss

- Makes life easier

**Bundling and Browser Support**

webpack  
 webpack-cli

- This project uses webpack to bundle all of your js and css/scss

webpack-dev-server

- Live reloading!

clean-webpack-plugin

- Will make sure your public/scripts folder is emptied on re-build.

source-map-loader

- Will make debugging much easier.

@babel/core

- Transpiles/polyfills your JS so you can use up to date syntax.

@babel/plugin-proposal-class-properties  
 @babel/preset-env  
 @babel/preset-react  
 babel-loader

- These will all make babel play nice with react and allow webpack to actually run babel on our code.

The following are all loaders for css in webpack. They run in the order listed here, but MUST be put in the opposite order in webpack (this is already done, but is a common source of confusion).

postcss-loader  
 postcss-preset-env  
 sass-loader  
 css-loader

style-loader

- When we're in developer mode, style loader simply inlines our styles to make rebuilding quicker.

mini-css-extract-plugin

- When we run webpack in production mode this will bundle all of our css and put it in /public/scripts/style.css.

**Server**

cross-env

- Allows us to declare a .env variable. Used to determine if we are in developer mode or not so webpack knows how to handle our css files.

cors

- Cross origin resource sharing, in case you need to query a db or call an api.

dotenv

- This allows us to read from a .env file if we need to declare sensitive variables and hide them from others.

express

- Server framework to make building our backend easier.
