Bridge = require './connect'

ourBridge = Bridge.build()
ourBridge.onFrame = (allPositions) ->
  console.log('Positions: ' + JSON.stringify(allPositions))
