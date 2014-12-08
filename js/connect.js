// Generated by CoffeeScript 1.7.1
(function() {
  window.Bridge = {};

  window.Bridge.fingerNameMap = ["thumb", "index", "middle", "ring", "pinky"];

  window.Bridge.onFrame = function(positions) {
    return console.log('Bridge onFrame not set');
  };

  window.Bridge.parsePointable = function(thing) {
    var tipPosition;
    tipPosition = thing.tipPosition;
    return {
      x: tipPosition[0],
      y: tipPosition[1],
      z: tipPosition[2]
    };
  };

  window.Bridge.parseFinger = function(finger) {
    var pointable, tipPosition;
    pointable = parsePointable(finger);
    tipPosition = finger.tipPosition;
    pointable['type'] = Bridge.fingerNameMap[finger.type];
    return pointable;
  };

  window.Bridge.build = function() {
    var controllerOpts, _onFrame, _t;
    _t = this;
    _onFrame = function(frame) {
      var allFingers, allPositions, allTools, finger, hand, handFingers, tool, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (frame.hands.length < 1) {
        return;
      }
      allPositions = {};
      allFingers = [];
      _ref = frame.hands;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hand = _ref[_i];
        handFingers = [];
        _ref1 = frame.fingers;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          finger = _ref1[_j];
          if (finger.IsValid) {
            handFingers.push(Bridge.parseFinger(finger));
          }
        }
        allFingers.push(handFingers);
      }
      allPositions['fingers'] = allFingers;
      allTools = [];
      _ref2 = frame.tools;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        tool = _ref2[_k];
        if (tool.IsValid) {
          allTools.push(Bridge.parsePointable(tool));
        }
      }
      allPositions['tools'] = allTools;
      if (_t.onFrame) {
        return _t.onFrame(allPositions);
      }
    };
    controllerOpts = {
      host: '127.0.0.1',
      port: 6437,
      enableGestures: true,
      frameEventName: 'animationFrame',
      useAllPlugins: false
    };
    Leap.loop(controllerOpts, _onFrame);
    return this;
  };

}).call(this);


//# sourceMappingURL=connect.map
