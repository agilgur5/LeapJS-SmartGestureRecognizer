(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, GestureList;

GestureList = React.createClass({
  render: function() {
    var listItems;
    listItems = this.props.labels.map(function(label) {
      return React.createElement("li", {
        "class": "gesture_label"
      }, label);
    });
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
            isRecording: true
          }, this.state.labels.concat(["" + name]), {
            currentLabel: this.state.labels.length
          });
        }
      }
    }
  },
  getInitialState: function() {
    return {
      isRecording: false,
      currentLabel: 0,
      labels: ["nothing", "rest"],
      prediction: "Prediction goes here"
    };
  },
  render: function() {
    return React.createElement("section", null, GestureList({
      labels: this.state.labels
    }), React.createElement("button", {
      "id": "record_button",
      "onClick": this.startRecording
    }, (this.state.isRecording ? "Stop Recording" : "Start Recording")), React.createElement("div", {
      "id": "predicted_label_div"
    }, this.state.prediction));
  }
});

React.render(App(), document.getElementById('content'));



},{}]},{},[1]);
