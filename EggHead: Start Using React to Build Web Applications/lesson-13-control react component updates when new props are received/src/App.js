import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            increasing: false
        }
    }

    update() {
        ReactDom.render(
            <App val={this.props.val + 1}/>, document.getElementById('root'));
    }

    componentWillReceiveProps(nextProps) {
        console.log(`componentWillReceiveProps, ${nextProps.val}`);
        this.setState({
            increasing: nextProps.val > this.props.val
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`shouldComponentUpdate, nextProps=${nextProps.val} nextState={increasing : ${nextState.increasing}}`);
        console.log(`¿Se actualiza? ${nextProps.val % 5 === 0}`);
        return nextProps.val % 5 === 0;
    }

    render() {
        console.log(this.state.increasing);

        return <button onClick={this.update.bind(this)}>
            {this.props.val}
        </button>
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(`componentDidUpdate, prevProps=${prevProps.val} prevState={increasing : ${prevState.increasing}}`);

        console.log(`prevProps: ${prevProps.val}`);
    }
}

App.defaultProps = {
    val: 0
}

export default App;
