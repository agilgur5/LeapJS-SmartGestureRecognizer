# Bridge = require './connect'

ourBridge = window.Bridge.build()
console.log('Our bridge: ' + JSON.stringify(ourBridge))
ourBridge.onFrame = (allPositions) ->
  console.log('Positions: ' + JSON.stringify(allPositions))
