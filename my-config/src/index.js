import React,{ Component } from 'react';
import { render } from 'react-dom';
import './index.less'

class App extends Component {
    render () {
        return <div>测试一下?</div>
    }
}

render(<App />, document.getElementById('root'));