import React,{ Component } from 'react';
import { render } from 'react-dom';
import './index.less'

class App extends Component {
    render () {
        return <div>奇怪啊?有用了吗？测试一下?是吗？可以了？终于有用了啊？</div>
    }
}

render(<App />, document.getElementById('root'));