GestureList = React.createClass
  render: ->
    listItems = @props.labels.map (label) ->
      <li className="gesture_label">{label}</li>
    return <ul id="gesture_list">{listItems}</ul>

App = React.createClass
  bridge: {}
  componentDidMount: ->
    @bridge = window.Bridge.build()
    _this = @
    @bridge.onFrame = (frame) ->
      normalizedFrame = FingerUtils.toNormalizedFrame(frame)
      console.log("onframe")
      if _this.state.isRecording
        learner.addDatapoint(normalizedFrame, _this.state.currentLabel)
      else if learner.net? and learner.train_labels.length > 0
        labelIndex = learner.predictLabel(normalizedFrame)
        console.log("predicting")
        _this.setState(prediction: _this.state.labels[labelIndex])
  startRecording: ->
    if @state.isRecording
      @setState(isRecording: false)
    else
      name = prompt("What gesture is this?", "finger point")
      if !name?
        alert("Incorrect input")
      else 
        index = @state.labels.indexOf(name) 
        if index != -1
          @setState(isRecording: true, currentLabel: index)
        else
          @setState(isRecording: true, labels: @state.labels.concat(["" + name]), currentLabel: @state.labels.length)
  getInitialState: ->
    return isRecording: false, currentLabel: 0, labels: ["rest", "finger point", "fist"], prediction: "Prediction goes here"
  render: ->
    <section>
      <div>List of gestures:</div>
      {GestureList(labels: @state.labels)}
      <article id='actions'>
        <button id="record_button" onClick={@startRecording}>
          {if @state.isRecording then "Stop Recording" else "Start Recording"}
        </button>
        <div id="predicted_label_div">{@state.prediction}</div>
      </article>
    </section>
    
React.render(App(), document.getElementById('content'))
