# Bridge = require './connect'

ourBridge = window.Bridge.build()
count = 0
graph = new cnnvis.Graph()
ourBridge.onFrame = (allPositions) ->
  frame = FingerUtils.toNormalizedFrame(allPositions)

  for finger, finger_index in frames
    for cord, cord_index in finger
      graph.add(count, frame[finger_index][cord_index])

  count++
  console.log('Frame: ' + JSON.stringify(frame))

graph.drawSelf(document.getElementById("graph"));