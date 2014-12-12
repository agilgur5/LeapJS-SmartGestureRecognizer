GestureList = React.createClass
  render: ->
    listItems = @props.gestures.map (gesture) ->
      React.DOM.li
        children: gesture
    React.DOM.ul
      children: listItems

Visualizer = React.createClass
  render: ->
    React.DOM.article
      children: 'Visualizer goes here'

App = React.createClass
  getInitialState: ->
    gestures = [
      '2 Finger tap'
      '3 Finger Swipe Left'
      '3 Finger Swipe Right'
      '5 Finger Spread'
      '5 Finger Pinch'
    ]
    return gestures: gestures
  render: ->
    React.DOM.section
      children: [
        GestureList(gestures: @state.gestures)
        Visualizer()
      ]
    
React.renderComponent(App(), document.getElementById('content'))
