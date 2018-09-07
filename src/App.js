import React, { Component } from 'react';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      createNum: 30,
      label: "Log here",
    };

    this.createFrame = this.createFrame.bind(this);
    this.setCreateNum = this.setCreateNum.bind(this);
    this.keyHandle = this.keyHandle.bind(this);
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  createFrame() {
    this.setState({
      label: "Wait for finishing load the frame."
    });

    let count = 0;
    let intervalId = setInterval(() => {
      let frame = document.createElement("iframe");
      document.body.appendChild(frame);
      if (count++ > this.state.createNum) {
        clearInterval(intervalId);
        this.setState({
          label: "Go! Click the frames button!."
        });
      }
    }, 50);
  }

  setCreateNum(event) {
    this.setState({createNum: event.target.value});
  }

  keyHandle(event) {
    const code = event.key;
    switch (code) {
      case "Enter":
        this.createFrame();
        break;
      default:
        break;
    }
  }
  render() {
    const children = [];

    // Log Element
    children.push(
      React.createElement(
        "div",
        {
          key: "logLabel",
          ref: "logLabel",
        },
        this.state.label
      )
    );

    // Input Element
    children.push(
      React.createElement(
        "input",
        {
          type: "number",
          ref: "tryNumber",
          key: "tryNumber",
          value: this.state.createNum,
          onChange: this.setCreateNum,
          onKeyDown: this.keyHandle,
        }
      )
    );

    // Button Element
    children.push(
      React.createElement(
        "button",
        {
          key: "GoButton",
          onClick: this.createFrame,
        },
        "Go"
      )
    );
    return (React.createElement("div", {}, children));
  }
}

export default App;
