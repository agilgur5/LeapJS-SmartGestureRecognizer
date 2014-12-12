# Bridge = require './connect'

ourBridge = window.Bridge.build()
count = 0
graph = new cnnvis.Graph()
ourBridge.onFrame = (allPositions) ->
  frame = FingerUtils.toNormalizedFrame(allPositions)
  console.log('Frame: ' + JSON.stringify(frame))
  for finger in frame
    graph.add(count, finger[0])
    graph.drawSelf(document.getElementById('graph'))
    console.log('Finger: ' + JSON.stringify(finger))

  count++

#graph.drawSelf(document.getElementById("graph"))
