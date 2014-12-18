(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, GestureList;

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

App = React.createClass({
  bridge: {},
  componentDidMount: function() {
    var _this;
    this.bridge = window.Bridge.build();
    _this = this;
    return this.bridge.onFrame = function(frame) {
      var labelIndex, normalizedFrame;
      normalizedFrame = FingerUtils.toNormalizedFrame(frame);
      if (_this.state.isRecording) {
        return learner.addDatapoint(normalizedFrame, _this.state.currentLabel);
      } else if (learner.currentNet != null) {
        labelIndex = learner.predictLabel(normalizedFrame);
        return _this.setState({
          prediction: _this.state.labels[labelIndex]
        });
      }
    };
  },
  startRecording: function() {
    var index, name;
    if (this.state.isRecording) {
      learner.createNet();
      return this.setState({
        isRecording: false
      });
    } else {
      name = prompt("What gesture is this?", "Finger Tap");
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
    return this.setState({
      isEditingGestures: true
    });
  },
  selectGesture: function(e) {
    return this.setState({
      selectedGesture: parseInt(e.target.getAttribute('data-index'), 10)
    });
  },
  getInitialState: function() {
    return {
      isRecording: false,
      currentLabel: 0,
      labels: ["nothing", "rest"],
      prediction: "Prediction goes here",
      isEditingGestures: false,
      selectedGesture: -1
    };
  },
  render: function() {
    var startButton;
    startButton = this.state.isEditingGestures ? React.createElement("button", {
      "id": 'record_button',
      "onClick": this.startRecording
    }, (this.state.isRecording ? 'Stop recording' : 'Start recording')) : '';
    return React.createElement("section", null, React.createElement("aside", {
      "id": 'meta'
    }, React.createElement("p", null, React.createElement("strong", null, "CS 4701 (Fall 2014)")), React.createElement("p", null, "Feifan Zhou, Teresa Li, Anton Gilgur")), GestureList({
      labels: this.state.labels,
      newGesture: this.newGesture,
      selectedGesture: this.state.selectedGesture,
      selectGesture: this.selectGesture
    }), React.createElement("article", {
      "id": 'actions'
    }, startButton), React.createElement("aside", {
      "id": 'action_buttons'
    }, React.createElement("button", {
      "id": 'import'
    }, "Import training data"), React.createElement("button", {
      "id": 'export'
    }, "Export training data")));
  }
});

React.render(App(), document.getElementById('content'));



},{}]},{},[1]);
