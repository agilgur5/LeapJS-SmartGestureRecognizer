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

GestureActions = React.createClass
  render: ->
    <ul className='GestureActions'>
      <li><button type='button' className={if @props.currentAction == 'printName' then 'Selected' else ''} onClick={@props.setAction} data-index={@props.index} data-action='printName'>Show name</button></li>
      <li><button type='button' className={if @props.currentAction == 'prevTab' then 'Selected' else ''} onClick={@props.setAction} data-index={@props.index} data-action='prevTab'>Prev. tab</button></li>
      <li><button type='button' className={if @props.currentAction == 'nextTab' then 'Selected' else ''} onClick={@props.setAction} data-index={@props.index} data-action='nextTab'>Next tab</button></li>
      <li><button type='button' className={if @props.currentAction == 'fistbump' then 'Selected' else ''} onClick={@props.setAction} data-index={@props.index} data-action='fistbump'>Fistbump</button></li>
    </ul>

GestureDetails = React.createClass
  getInitialState: ->
    { name: @props.name }
  componentDidMount: ->
    @refs.gestureNameField.getDOMNode().focus()
  componentWillReceiveProps: (newProps) ->
    @setState({ name: newProps.name })
  handleChange: (e) ->
    @props.setGestureName(e)
    @setState({ name: e.target.value })
  render: ->
    console.log('Name: ' + @props.name)
    <main>
      <input type='text' placeholder='Gesture name' id='gestureNameField' value={@state.name} onChange={@handleChange} data-index={@props.index} ref='gestureNameField' />
      <h3>Gesture action:</h3>
      {GestureActions(setAction: @props.setAction, index: @props.index, currentAction: @props.actions[@props.index])}
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
        _this.flashElement(document.getElementsByClassName('gesture_label')[labelIndex])
        action = _this.state.actions[labelIndex]
        if action
          this[action]()
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
    labels = @state.labels
    labels.push('Unnamed gesture')
    gestureIndex = labels.length - 1
    @setState({ labels: labels, selectedGesture: gestureIndex, isEditingGestures: true })
  selectGesture: (e) ->
    newGesture = parseInt(e.target.getAttribute('data-index'), 10)
    selectedGesture = if newGesture == @state.selectedGesture then -1 else newGesture
    @setState({ selectedGesture: selectedGesture })
  printName: ->
    console.log('Print name')
  prevTab: ->
    return
  nextTab: ->
    return
  fistbump: ->
    return
  setAction: (e) ->
    action = e.target.getAttribute('data-action')
    index = parseInt(e.target.getAttribute('data-index'), 10)
    actions = @state.actions
    actions[index] = action
    @setState({ actions: actions })
  getInitialState: ->
    return isRecording: false, currentLabel: 0, actions: [null, null, null], labels: ["rest", "finger point", "fist"], prediction: "Prediction goes here", isEditingGestures: false, selectedGesture: -1
  flashElement: (e) ->
    e.className = 'gesture_label Selected'
    setTimeout((-> e.className = 'gesture_label'), 250)
    setTimeout((-> e.className = 'gesture_label Selected'), 500)
    setTimeout((-> e.className = 'gesture_label'), 750)
  setGestureName: (e) ->
    index = parseInt(e.target.getAttribute('data-index'), 10)
    labels = @state.labels
    labels[index] = e.target.value
    @setState({ labels: labels })
  render: ->
    startButton = if @state.isEditingGestures then <button id='record_button' onClick={@startRecording}>{if @state.isRecording then 'Stop recording' else 'Start recording'}</button> else ''
    details = if @state.selectedGesture >= 0 then GestureDetails(name: @state.labels[@state.selectedGesture], index: @state.selectedGesture, setGestureName: @setGestureName, setAction: @setAction, actions: @state.actions) else <p id='nothingSelected'>Nothing selected</p>
    <section>
      <aside id='meta'>
        <p><strong>CS 4701 (Fall 2014)</strong></p>
        <p>Feifan Zhou, Teresa Li, Anton Gilgur</p>
      </aside>
      <div>{@state.prediction}</div>
      {GestureList(labels: @state.labels, newGesture: @newGesture, selectedGesture: @state.selectedGesture, selectGesture: @selectGesture)}
      <article id='actions'>
        {details}
        {startButton}
      </article>
      <aside id='action_buttons'>
        <button id='import'>Import data</button>
        <button id='export'>Export data</button>
      </aside>
    </section>
    
React.render(App(), document.getElementById('content'))
