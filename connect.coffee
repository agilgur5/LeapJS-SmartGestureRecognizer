# Leap = require './leap.min' if require

window.Bridge = {}
window.Bridge.fingerNameMap = ["thumb", "index", "middle", "ring", "pinky"]
window.Bridge.onFrame = (positions) -> console.log('Bridge onFrame not set')
window.Bridge.parsePointable = (thing) ->
  tipPosition = thing.tipPosition
  return {
    x: tipPosition[0]
    y: tipPosition[1]
    z: tipPosition[2]
  }
window.Bridge.parseFinger = (finger) ->
  pointable = parsePointable(finger)
  tipPosition = finger.tipPosition
  pointable['type'] = Bridge.fingerNameMap[finger.type]
  return pointable
window.Bridge.build = ->
  _t = this
  _onFrame = (frame) ->
    return if frame.hands.length < 1
    allPositions = {}
    allFingers = []
    for hand in frame.hands
      handFingers = []
      for finger in frame.fingers
        handFingers.push(Bridge.parseFinger(finger)) if finger.IsValid
      allFingers.push(handFingers)
    allPositions['fingers'] = allFingers
    allTools = []
    for tool in frame.tools
      allTools.push(Bridge.parsePointable(tool)) if tool.IsValid
    allPositions['tools'] = allTools
    _t.onFrame(allPositions) if _t.onFrame

  controllerOpts = {
    host: '127.0.0.1',
    port: 6437,
    enableGestures: true,
    frameEventName: 'animationFrame',
    useAllPlugins: false
  }
  Leap.loop(controllerOpts, _onFrame)
  return this

# module.exports = Bridge if module && module.exports
