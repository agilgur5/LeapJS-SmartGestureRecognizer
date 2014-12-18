GestureList = React.createClass
  render: ->
    listItems = @props.labels.map (label) ->
      <li className="gesture_label">{label}</li>
    listItems.push(
      <li className='gesture_label' id='new_gesture_label'>+ New/Edit gesture</li>
    )
    return <ul id="gesture_list">{listItems}</ul>

App = React.createClass
  bridge: {}
  componentDidMount: ->
    @bridge = window.Bridge.build()
    _this = @
    @bridge.onFrame = (frame) ->
      normalizedFrame = FingerUtils.toNormalizedFrame(frame)
      if _this.state.isRecording
        learner.addDatapoint(normalizedFrame, _this.state.currentLabel)
      else if learner.currentNet?
        labelIndex = learner.predictLabel(normalizedFrame)
        _this.setState(prediction: _this.state.labels[labelIndex])
  startRecording: ->
    if @state.isRecording
      learner.createNet()
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
          @setState(isRecording: true, labels: @state.labels.concat(["" + name]), currentLabel: @state.labels.length)
  getInitialState: ->
    return isRecording: false, currentLabel: 0, labels: ["nothing", "rest"], prediction: "Prediction goes here"
  render: ->
    <section>
      <aside id='meta'>
        <p><strong>CS 4701 (Fall 2014)</strong></p>
        <p>Feifan Zhou, Teresa Li, Anton Gilgur</p>
      </aside>
      <div>List of gestures:</div>
      {GestureList(labels: @state.labels)}
      <article id='actions'>
        <button id="record_button" onClick={@startRecording}>
          {if @state.isRecording then "Stop Recording" else "Start Recording"}
        </button>
        <div id="predicted_label_div">{@state.prediction}</div>
      </article>
      <aside id='action_buttons'>
        <button id='import'>Import training data</button>
        <button id='export'>Export training data</button>
      </aside>
    </section>
    
React.render(App(), document.getElementById('content'))
