# Bridge = require './connect'

ourBridge = window.Bridge.build()
console.log('Our bridge: ' + JSON.stringify(ourBridge))
ourBridge.onFrame = (allPositions) ->
  #console.log('Positions: ' + JSON.stringify(allPositions))
  frame = FingerUtils.toFrame(allPositions)
  console.log('Frame: ' + JSON.stringify(frame))
