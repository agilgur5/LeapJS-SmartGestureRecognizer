window.FingerUtils = {
  flattenFingers: (fingers) ->
    flattenedFingers = [].concat.apply([], fingers)
    frame = flattenedFingers.map((flatFinger) ->
      [flatFinger.x, flatFinger.y, flatFinger.z]
    )
    return frame
  toFrame: (allPositions) ->
    fingers = allPositions.fingers
    return @flattenFingers(fingers)
  toNormalizedFrame: (allPositions) ->
    fingers = []
    for hand, index in allPositions.hands
      fingersForHand = allPositions.fingers[index]
      normalizedFingers = fingersForHand.map((finger) ->
        {
          x: finger.x - hand.x
          y: finger.y - hand.y
          z: finger.z - hand.z
        }
      )
      fingers.push(normalizedFingers)
    return @flattenFingers(fingers)
}
