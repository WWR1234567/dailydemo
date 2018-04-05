import React,{ Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
import './index.less'

class App extends Component {
    render () {
        return <div>测试代码,什么鬼啊？可以了<Link to='/home'>go home</Link></div>
    }
}
class Home extends Component {
    render () {
        return <div>测试代码,什么鬼啊？可以了<Link to='/'>go index</Link></div>
    }
}
render(<Router history={browserHistory}>
    <Route path='/' component = { App }/>
    <Route path='/home' component = { Home }/>    
</Router>, document.getElementById('root'));