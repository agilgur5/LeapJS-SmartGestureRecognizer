window.FingerUtils = {
  flattenFingers: (fingers) ->
    flattenedFingers = [].concat.apply([], fingers)
    frame = flattenedFingers.map((flatFinger) ->
      flatBones = [].concat.apply([], flatFinger.bones)
      flatterBones = [].concat.apply([], flatBones)
      return [flatFinger.x, flatFinger.y, flatFinger.z].concat(flatterBones)
    )
    console.log('Frame: ' + JSON.stringify(frame))
    return frame
  toFrame: (allPositions) ->
    #console.log('All positions: ' + JSON.stringify(allPositions))
    fingers = allPositions.fingers
    return @flattenFingers(fingers)
  toNormalizedFrame: (allPositions) ->
    #console.log('All positions: ' + JSON.stringify(allPositions))
    fingers = []
    for hand, index in allPositions.hands
      fingersForHand = allPositions.fingers[index]
      normalizedFingers = fingersForHand.map((finger) ->
        {
          x: finger.x - hand.x
          y: finger.y - hand.y
          z: finger.z - hand.z
          bones: finger.bones
        }
      )
      fingers.push(normalizedFingers)
    return @flattenFingers(fingers)
}
