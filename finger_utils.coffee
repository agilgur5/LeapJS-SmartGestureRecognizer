window.FingerUtils = {
  toFrame: (allPositions) ->
    fingers = allPositions.fingers
    flattenedFingers = [].concat.apply([], fingers)
    console.log('Flattened fingers: ' + JSON.stringify(flattenedFingers))
    frame = flattenedFingers.map((flatFinger) ->
      [flatFinger.x, flatFinger.y, flatFinger.z]
    )
    return frame
}
