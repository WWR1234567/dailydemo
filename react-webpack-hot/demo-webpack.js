const chalk = require('chalk');
const opn = require('opn');
const fs = require('fs')
const address = require('address');
const path = require('path')
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
let pathPublic = resolveApp('public');
//标识为开发环境
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const host = process.env.HOST || '0.0.0.0';

let serverConfig = {
    disableHostCheck: true,
    watchContentBase: true,
    compress: true,
    hot: true,
    // noInfo: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    quiet: true,
    overlay: false,
    host: host,
    public: address.ip(),
    publicPath: '/',
    contentBase: pathPublic,  
    historyApiFallback: {
        // Paths with dots should still use the history fallback.
        // See https://github.com/facebookincubator/create-react-app/issues/387.
        disableDotRule: true,
    },
    clientLogLevel: 'none',
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
    compiler.plugin('done',function(status){
        console.log( chalk.green('Compiled successfully!') )
    })
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

// opn('http://localhost:9000'); 使用默认浏览器打开指定的url