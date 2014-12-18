(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, GestureActions, GestureDetails, GestureList;

GestureList = React.createClass({
  render: function() {
    var listItems, selectGesture, selectedGesture;
    selectedGesture = this.props.selectedGesture;
    selectGesture = this.props.selectGesture;
    listItems = this.props.labels.map(function(label, index) {
      var className;
      className = 'gesture_label';
      if (selectedGesture === index) {
        className += ' Selected';
      }
      return React.createElement("li", {
        "className": className,
        "onClick": selectGesture,
        "data-index": index
      }, label);
    });
    listItems.push(React.createElement("li", {
      "className": 'gesture_label',
      "id": 'new_gesture_label',
      "onClick": this.props.newGesture
    }, "+ New gesture"));
    listItems.unshift(React.createElement("h1", null, "Gestures"));
    return React.createElement("ul", {
      "id": "gesture_list"
    }, listItems);
  }
});

GestureActions = React.createClass({
  render: function() {
    return React.createElement("ul", {
      "className": 'GestureActions'
    }, React.createElement("li", null, React.createElement("button", {
      "type": 'button',
      "className": (this.props.currentAction === 'printName' ? 'Selected' : ''),
      "onClick": this.props.setAction,
      "data-index": this.props.index,
      "data-action": 'printName'
    }, "Show name")), React.createElement("li", null, React.createElement("button", {
      "type": 'button',
      "className": (this.props.currentAction === 'prevTab' ? 'Selected' : ''),
      "onClick": this.props.setAction,
      "data-index": this.props.index,
      "data-action": 'prevTab'
    }, "Prev. tab")), React.createElement("li", null, React.createElement("button", {
      "type": 'button',
      "className": (this.props.currentAction === 'nextTab' ? 'Selected' : ''),
      "onClick": this.props.setAction,
      "data-index": this.props.index,
      "data-action": 'nextTab'
    }, "Next tab")), React.createElement("li", null, React.createElement("button", {
      "type": 'button',
      "className": (this.props.currentAction === 'fistbump' ? 'Selected' : ''),
      "onClick": this.props.setAction,
      "data-index": this.props.index,
      "data-action": 'fistbump'
    }, "Fistbump")));
  }
});

GestureDetails = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name
    };
  },
  componentDidMount: function() {
    return this.refs.gestureNameField.getDOMNode().focus();
  },
  componentWillReceiveProps: function(newProps) {
    return this.setState({
      name: newProps.name
    });
  },
  handleChange: function(e) {
    this.props.setGestureName(e);
    return this.setState({
      name: e.target.value
    });
  },
  render: function() {
    console.log('Name: ' + this.props.name);
    return React.createElement("main", null, React.createElement("input", {
      "type": 'text',
      "placeholder": 'Gesture name',
      "id": 'gestureNameField',
      "value": this.state.name,
      "onChange": this.handleChange,
      "data-index": this.props.index,
      "ref": 'gestureNameField'
    }), React.createElement("h3", null, "Gesture action:"), GestureActions({
      setAction: this.props.setAction,
      index: this.props.index,
      currentAction: this.props.actions[this.props.index]
    }));
  }
});

App = React.createClass({
  bridge: {},
  componentDidMount: function() {
    var _this;
    this.bridge = window.Bridge.build();
    _this = this;
    return this.bridge.onFrame = function(frame) {
      var action, labelIndex, normalizedFrame;
      normalizedFrame = FingerUtils.toNormalizedFrame(frame);
      console.log("onframe");
      if (_this.state.isRecording) {
        return learner.addDatapoint(normalizedFrame, _this.state.currentLabel);
      } else if ((learner.net != null) && learner.train_labels.length > 0) {
        labelIndex = learner.predictLabel(normalizedFrame);
        console.log("predicting");
        _this.flashElement(document.getElementsByClassName('gesture_label')[labelIndex]);
        action = _this.state.actions[labelIndex];
        if (action) {
          this[action]();
        }
        return _this.setState({
          prediction: _this.state.labels[labelIndex]
        });
      }
    };
  },
  startRecording: function() {
    var index, name;
    if (this.state.isRecording) {
      return this.setState({
        isRecording: false
      });
    } else {
      name = prompt("What gesture is this?", "finger point");
      if (name == null) {
        return alert("Incorrect input");
      } else {
        index = this.state.labels.indexOf(name);
        if (index !== -1) {
          return this.setState({
            isRecording: true,
            currentLabel: index
          });
        } else {
          return this.setState({
            isRecording: true,
            labels: this.state.labels.concat(["" + name]),
            currentLabel: this.state.labels.length
          });
        }
      }
    }
  },
  newGesture: function() {
    var gestureIndex, labels;
    labels = this.state.labels;
    labels.push('Unnamed gesture');
    gestureIndex = labels.length - 1;
    return this.setState({
      labels: labels,
      selectedGesture: gestureIndex,
      isEditingGestures: true
    });
  },
  selectGesture: function(e) {
    var newGesture, selectedGesture;
    newGesture = parseInt(e.target.getAttribute('data-index'), 10);
    selectedGesture = newGesture === this.state.selectedGesture ? -1 : newGesture;
    return this.setState({
      selectedGesture: selectedGesture
    });
  },
  printName: function() {
    return console.log('Print name');
  },
  prevTab: function() {},
  nextTab: function() {},
  fistbump: function() {},
  setAction: function(e) {
    var action, actions, index;
    action = e.target.getAttribute('data-action');
    index = parseInt(e.target.getAttribute('data-index'), 10);
    actions = this.state.actions;
    actions[index] = action;
    return this.setState({
      actions: actions
    });
  },
  getInitialState: function() {
    return {
      isRecording: false,
      currentLabel: 0,
      actions: [null, null, null],
      labels: ["rest", "finger point", "fist"],
      prediction: "Prediction goes here",
      isEditingGestures: false,
      selectedGesture: -1
    };
  },
  flashElement: function(e) {
    e.className = 'gesture_label Selected';
    setTimeout((function() {
      return e.className = 'gesture_label';
    }), 250);
    setTimeout((function() {
      return e.className = 'gesture_label Selected';
    }), 500);
    return setTimeout((function() {
      return e.className = 'gesture_label';
    }), 750);
  },
  setGestureName: function(e) {
    var index, labels;
    index = parseInt(e.target.getAttribute('data-index'), 10);
    labels = this.state.labels;
    labels[index] = e.target.value;
    return this.setState({
      labels: labels
    });
  },
  render: function() {
    var details, startButton;
    startButton = this.state.isEditingGestures ? React.createElement("button", {
      "id": 'record_button',
      "onClick": this.startRecording
    }, (this.state.isRecording ? 'Stop recording' : 'Start recording')) : '';
    details = this.state.selectedGesture >= 0 ? GestureDetails({
      name: this.state.labels[this.state.selectedGesture],
      index: this.state.selectedGesture,
      setGestureName: this.setGestureName,
      setAction: this.setAction,
      actions: this.state.actions
    }) : React.createElement("p", {
      "id": 'nothingSelected'
    }, "Nothing selected");
    return React.createElement("section", null, React.createElement("aside", {
      "id": 'meta'
    }, React.createElement("p", null, React.createElement("strong", null, "CS 4701 (Fall 2014)")), React.createElement("p", null, "Feifan Zhou, Teresa Li, Anton Gilgur")), React.createElement("div", null, this.state.prediction), GestureList({
      labels: this.state.labels,
      newGesture: this.newGesture,
      selectedGesture: this.state.selectedGesture,
      selectGesture: this.selectGesture
    }), React.createElement("article", {
      "id": 'actions'
    }, details, startButton), React.createElement("aside", {
      "id": 'action_buttons'
    }, React.createElement("button", {
      "id": 'import'
    }, "Import data"), React.createElement("button", {
      "id": 'export'
    }, "Export data")));
  }
});

React.render(App(), document.getElementById('content'));



},{}]},{},[1]);
