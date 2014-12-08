Bridge = Bridge || {}
Bridge.fingerNameMap = ["thumb", "index", "middle", "ring", "pinky"]
Bridge.prototype.onFrame = (positions) -> console.log('Bridge onFrame not set')
Bridge.prototype.parsePointable = (thing) ->
  tipPosition = thing.tipPosition
  return {
    x: tipPosition[0]
    y: tipPosition[1]
    z: tipPosition[2]
  }
Bridge.prototype.parseFinger = (finger) ->
  pointable = parsePointable(finger)
  tipPosition = finger.tipPosition
  pointable['type'] = Bridge.fingerNameMap[finger.type]
  return pointable
Bridge.prototype.build = ->
  _t = this
  _onFrame = (frame) ->
    return if frame.hands.length < 1
    allPositions = {}
    allFingers = []
    for hand in frame.hands
      handFingers = []
      for finger in frame.fingers
        handFingers.push(_t.parseFinger(finger)) if finger.valid()
      allFingers.push(handFingers)
    allPositions['fingers'] = allFingers
    allTools = []
    for tool in frame.tools
      allTools.push(_t.parsePointable(tool)) if tool.valid()
    allPositions['tools'] = allTools
    _t.onFrame(allPositions)

  controller = new Leap.Controller({
    host: '127.0.0.1',
    port: 6437,
    enableGestures: true,
    frameEventName: 'animationFrame',
    useAllPlugins: false
  })
  controller.connect()
  controller.on('frame', _onFrame)
