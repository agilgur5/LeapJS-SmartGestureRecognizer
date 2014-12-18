window.FingerUtils = {
  flattenFingers: (fingers) ->
    flattenedFingers = [].concat.apply([], fingers)
    frame = flattenedFingers.map((flatFinger) ->
      #console.log('Flat finger: ' + JSON.stringify(flatFinger))
      flatBones = [].concat.apply([], flatFinger.bones)
      flatterBones = [].concat.apply([], flatBones)
      return (
        [flatFinger.x, flatFinger.y, flatFinger.z]
        .concat(flatterBones)
        .concat(flatFinger.dip)
        .concat(flatFinger.mcp)
        .concat(flatFinger.pip)
      )
    )
    #console.log('Frame: ' + JSON.stringify(frame))
    return frame
  toFrame: (allPositions) ->
    fingers = allPositions.fingers
    return @flattenFingers(fingers)
  toNormalizedFrame: (allPositions) ->
    fingers = []
    for hand, index in allPositions.hands
      fingersForHand = allPositions.fingers[index]
      normalizedFingers = fingersForHand.map((finger) ->
        f = {
          x: finger.x - hand.x
          y: finger.y - hand.y
          z: finger.z - hand.z
          bones: finger.bones
        }
        f['dip'] = if finger.dip == undefined then [] else finger.dip
        f['mcp'] = if finger.mcp == undefined then [] else finger.mcp
        f['pip'] = if finger.pip == undefined then [] else finger.pip
        return f
      )
      fingers.push(normalizedFingers)
    return @flattenFingers(fingers)
}
