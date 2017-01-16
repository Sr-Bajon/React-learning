import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{
  constructor(){
    super();
    this.state = {a: ''}
    this.update = this.update;
  }

  update = (e) => {
    this.setState({
      a: this.a.value,
      b: this.refs.b.value,
      c: ReactDom.findDOMNode(this.c).value,
      d: this.d.refs.input.value
    })
  }

  render(){
    return(
      <div>
        <input
          ref={node => this.a = node}
          type="text"
          onChange={this.update.bind(this)}
          />{this.state.a}
        <hr />
        <input
          ref="b"
          type="text"
          onChange={this.update.bind(this)}
          />{this.state.b}
        <hr />
        <Input
          ref={component => this.c = component}
          update={this.update.bind(this)}
          />{this.state.c}
        <hr />
        <Input2
          ref={component => this.d = component}
          update={this.update.bind(this)}
          />{this.state.d}
      </div>
    );
  }
}

class Input extends React.Component{
  render(){
    return <input type="text" onChange={this.props.update}/>
  }
}

class Input2 extends React.Component {
    render() {
        return (
            <div>
                <input
                  type="text"
                  ref="input"
                  onChange={this.props.update}/>
            </div>
        );
    }
}


export default App;
