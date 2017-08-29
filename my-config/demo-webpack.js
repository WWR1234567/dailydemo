const chalk = require('chalk');
const opn = require('opn');
const path = require('path')
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

//标识为开发环境
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

let serverConfig = {
    watchContentBase: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    // port: 8000,
}
function createCompiler() {
    let compiler;
    try {
        compiler = webpack(config);
    } catch (err) {
        console.log(chalk.red('Failed to compile.'));
        console.log(err.message || err);
        process.exit(1);
    }
    return compiler
}

// webpack(config).run( function (err,status){
//     console.log( err )
// })
let compiler = createCompiler();
const devServer = new WebpackDevServer(compiler, serverConfig)

function clearConsole() {
    process.stdout.write(
      process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
    );
  }
devServer.listen(9000, '127.0.0.1', err => {
    clearConsole();
    if (err) {
      return console.log(err);
    }
    // if (isInteractive) {
    // //   clearConsole();
    // }
    console.log(chalk.cyan('Starting the development server...\n'));
    // openBrowser(urls.localUrlForBrowser);
});
// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });

// opn('http://localhost:8000'); 使用默认浏览器打开指定的url