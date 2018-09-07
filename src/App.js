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
    this.buttonRef = React.createRef();
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  componetDidMount() {
    this.buttonRef.current.disabled = false;
  }

  createFrame() {
    if (this.buttonRef.current.disabled) {
      // Press enter key on input area during create the frame.
      return;
    }
    this.setState({
      label: "Wait for finishing load the frame."
    });

    let count = 0;
    this.buttonRef.current.disabled = true;
    let intervalId = setInterval((function() {
      let frame = document.createElement("iframe");
      document.body.appendChild(frame);
      if (++count >= this.state.createNum) {
        clearInterval(intervalId);
        this.setState({
          label: "Go! Click the frames button!."
        });
        this.buttonRef.current.disabled = false;
      }
    }).bind(this), 50);
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
          ref: this.buttonRef,
          disabled: false
        },
        "Go"
      )
    );
    return (React.createElement("div", {}, children));
  }
}

export default App;
