!function e(t,r,n){function s(i,l){if(!r[i]){if(!t[i]){var c="function"==typeof require&&require;if(!l&&c)return c(i,!0);if(a)return a(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var o=r[i]={exports:{}};t[i][0].call(o.exports,function(e){var r=t[i][1][e];return s(r?r:e)},o,o.exports,e,t,r,n)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)s(n[i]);return s}({1:[function(e,t,r){var n,s,a;a=React.createClass({render:function(){var e,t,r;return r=this.props.selectedGesture,t=this.props.selectGesture,e=this.props.labels.map(function(e,n){var s;return s="gesture_label",r===n&&(s+=" Selected"),React.createElement("li",{className:s,onClick:t,"data-index":n},e)}),e.push(React.createElement("li",{className:"gesture_label",id:"new_gesture_label",onClick:this.props.newGesture},"+ New gesture")),e.unshift(React.createElement("h1",null,"Gestures")),React.createElement("ul",{id:"gesture_list"},e)}}),s=React.createClass({componentDidMount:function(){return this.refs.gestureNameField.getDOMNode().focus()},render:function(){return React.createElement("main",null,React.createElement("input",{type:"text",placeholder:"Gesture name",id:"gestureNameField",defaultValue:this.props.name,onKeyUp:this.props.setGestureName,"data-index":this.props.index,ref:"gestureNameField"}))}}),n=React.createClass({bridge:{},componentDidMount:function(){var e;return this.bridge=window.Bridge.build(),e=this,this.bridge.onFrame=function(t){var r,n;return n=FingerUtils.toNormalizedFrame(t),console.log("onframe"),e.state.isRecording?learner.addDatapoint(n,e.state.currentLabel):null!=learner.net&&learner.train_labels.length>0?(r=learner.predictLabel(n),console.log("predicting"),e.setState({prediction:e.state.labels[r]})):void 0}},startRecording:function(){var e,t;return this.state.isRecording?this.setState({isRecording:!1}):(t=prompt("What gesture is this?","finger point"),null==t?alert("Incorrect input"):(e=this.state.labels.indexOf(t),this.setState(-1!==e?{isRecording:!0,currentLabel:e}:{isRecording:!0,labels:this.state.labels.concat([""+t]),currentLabel:this.state.labels.length})))},newGesture:function(){var e,t;return t=this.state.labels,t.push("Unnamed gesture"),e=t.length-1,this.setState({labels:t,selectedGesture:e})},selectGesture:function(e){var t,r;return t=parseInt(e.target.getAttribute("data-index"),10),r=t===this.state.selectedGesture?-1:t,this.setState({selectedGesture:r})},getInitialState:function(){return{isRecording:!1,currentLabel:0,labels:["rest","finger point","fist"],prediction:"Prediction goes here",isEditingGestures:!1,selectedGesture:-1}},flashElement:function(e){return e.className="gesture_label Selected",setTimeout(function(){return e.className="gesture_label"},250),setTimeout(function(){return e.className="gesture_label Selected"},500),setTimeout(function(){return e.className="gesture_label"},750)},componentDidMount:function(){return setTimeout(function(){return this.flashElement(document.getElementsByClassName("gesture_label")[0])}.bind(this),300)},setGestureName:function(e){var t,r;return t=parseInt(e.target.getAttribute("data-index"),10),r=this.state.labels,r[t]=e.target.value,this.setState({labels:r})},render:function(){var e,t;return t=this.state.isEditingGestures?React.createElement("button",{id:"record_button",onClick:this.startRecording},this.state.isRecording?"Stop recording":"Start recording"):"",e=this.state.selectedGesture>=0?s({name:this.state.labels[this.state.selectedGesture],index:this.state.selectedGesture,setGestureName:this.setGestureName}):React.createElement("p",{id:"nothingSelected"},"Nothing selected"),React.createElement("section",null,React.createElement("aside",{id:"meta"},React.createElement("p",null,React.createElement("strong",null,"CS 4701 (Fall 2014)")),React.createElement("p",null,"Feifan Zhou, Teresa Li, Anton Gilgur")),a({labels:this.state.labels,newGesture:this.newGesture,selectedGesture:this.state.selectedGesture,selectGesture:this.selectGesture}),React.createElement("article",{id:"actions"},t,e),React.createElement("aside",{id:"action_buttons"},React.createElement("button",{id:"import"},"Import training data"),React.createElement("button",{id:"export"},"Export training data")))}}),React.render(n(),document.getElementById("content"))},{}]},{},[1]);