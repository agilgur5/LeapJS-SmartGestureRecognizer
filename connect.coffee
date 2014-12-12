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
  pointable = Bridge.parsePointable(finger)
  bones = finger.bones
  boneBases = bones.map((bone) -> bone.basis)
  pointable['bones'] = boneBases
  #console.log('Bone bases: ' + JSON.stringify(boneBases))
  pointable['type'] = Bridge.fingerNameMap[finger.type]
  return pointable
window.Bridge.build = ->
  _t = this
  _onFrame = (frame) ->
    return if frame.hands.length < 1
    allPositions = {}
    allPositions.hands = []
    allFingers = []
    for hand in frame.hands
      handFingers = []
      for finger in frame.fingers
        handFingers.push(Bridge.parseFinger(finger))
      allFingers.push(handFingers)
      handPos = {
        x: hand.sphereCenter[0]
        y: hand.sphereCenter[1]
        z: hand.sphereCenter[2]
      }
      allPositions.hands.push(handPos)
    allPositions['fingers'] = allFingers
    allTools = []
    for tool in frame.tools
      allTools.push(Bridge.parsePointable(tool))
    allPositions['tools'] = allTools
    #console.log('All positions: ' + JSON.stringify(allPositions))
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
