GestureList = React.createClass
  render: ->
    listItems = @props.labels.map (label) ->
      <li>{label}</li>
    return <ul>{listItems}</ul>

App = React.createClass
  bridge: {}
  componentDidMount: ->
    @bridge = window.Bridge.build()
    _this = @
    @bridge.onFrame = (frame) ->
      normalizedFrame = FingerUtils.toNormalizedFrame(frame)
      if _this.state.isRecording
        learner.addInstanceData(normalizedFrame, _this.state.currentLabel)
      else if learner.currentNet?
        labelIndex = learner.predictLabel(normalizedFrame)
        _this.setState(prediction: _this.state.labels[labelIndex])
  startRecording: ->
    if @state.isRecording
      learner.createMagicNet({}, () -> return)
      @setState(isRecording: false)
    else
      name = prompt("What gesture is this?", "Finger Tap")
      if !name?
        alert("Incorrect input")
      else 
        index = @state.labels.indexOf(name) 
        if index != -1
          @setState(isRecording: true, currentLabel: index)
        else
          @setState(isRecording: true, @state.labels.concat(["" + name]), currentLabel: @state.labels.length)
  getInitialState: ->
    return isRecording: false, currentLabel: 0, labels: ["rest", "nothing"], prediction: "Prediction goes here"
  render: ->
    <section>
      {GestureList(labels: @state.labels)}
      <button id="record" onClick={@startRecording}>
        {if @state.isRecording then "Stop Recording" else "Start Recording"}
      </button>
      <div id="predicted_label">{@state.prediction}</div>
    </section>
    
React.render(App(), document.getElementById('content'))
