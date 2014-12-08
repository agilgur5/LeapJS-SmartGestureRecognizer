# Bridge = require './connect'

ourBridge = window.Bridge.build()
ourBridge.onFrame = (allPositions) ->
  frame = FingerUtils.toNormalizedFrame(allPositions)
  console.log('Frame: ' + JSON.stringify(frame))
