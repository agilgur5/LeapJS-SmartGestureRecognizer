GestureList = React.createClass
  render: ->
    selectedGesture = @props.selectedGesture
    selectGesture = @props.selectGesture
    listItems = @props.labels.map((label, index) ->
      className = 'gesture_label'
      className += ' Selected' if selectedGesture == index
      <li className={className} onClick={selectGesture} data-index={index}>{label}</li>
    )
    listItems.push(
      <li className='gesture_label' id='new_gesture_label' onClick={@props.newGesture}>+ New gesture</li>
    )
    listItems.unshift(
      <h1>Gestures</h1>
    )
    return <ul id="gesture_list">{listItems}</ul>

GestureDetails = React.createClass
  render: ->
    <main>
      <p>{@props.name}</p>
    </main>

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
  newGesture: ->
    @setState({ isEditingGestures: true })
  selectGesture: (e) ->
    newGesture = parseInt(e.target.getAttribute('data-index'), 10)
    selectedGesture = if newGesture == @state.selectedGesture then -1 else newGesture
    @setState({ selectedGesture: selectedGesture })
  getInitialState: ->
    return isRecording: false, currentLabel: 0, labels: ["rest", "finger point", "fist"], prediction: "Prediction goes here", isEditingGestures: false, selectedGesture: -1
  render: ->
    startButton = if @state.isEditingGestures then <button id='record_button' onClick={@startRecording}>{if @state.isRecording then 'Stop recording' else 'Start recording'}</button> else ''
    details = if @state.selectedGesture >= 0 then GestureDetails(name: @state.labels[@state.selectedGesture]) else <p id='nothingSelected'>Nothing selected</p>
    <section>
      <aside id='meta'>
        <p><strong>CS 4701 (Fall 2014)</strong></p>
        <p>Feifan Zhou, Teresa Li, Anton Gilgur</p>
      </aside>
      <div>{@state.prediction}</div>
      {GestureList(labels: @state.labels, newGesture: @newGesture, selectedGesture: @state.selectedGesture, selectGesture: @selectGesture)}
      <article id='actions'>
        {startButton}
        {details}
      </article>
      <aside id='action_buttons'>
        <button id='import'>Import training data</button>
        <button id='export'>Export training data</button>
      </aside>
    </section>
    
React.render(App(), document.getElementById('content'))
