// Generated by CoffeeScript 1.8.0
(function() {
  window.FingerUtils = {
    flattenFingers: function(fingers) {
      var flattenedFingers, frame;
      flattenedFingers = [].concat.apply([], fingers);
      frame = flattenedFingers.map(function(flatFinger) {
        var flatBones, flatterBones;
        //console.log('Flat finger: ' + JSON.stringify(flatFinger));
        flatBones = [].concat.apply([], flatFinger.bones);
        flatterBones = [].concat.apply([], flatBones);
        return [flatFinger.x, flatFinger.y, flatFinger.z]//.concat(flatterBones).concat(flatFinger.dip).concat(flatFinger.mcp).concat(flatFinger.pip);
      });
      //console.log('Frame: ' + JSON.stringify(frame));
      return frame;
    },
    toFrame: function(allPositions) {
      var fingers;
      fingers = allPositions.fingers;
      return this.flattenFingers(fingers);
    },
    toNormalizedFrame: function(allPositions) {
      var fingers, fingersForHand, hand, index, normalizedFingers, _i, _len, _ref;
      fingers = [];
      _ref = allPositions.hands;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        hand = _ref[index];
        fingersForHand = allPositions.fingers[index];
        normalizedFingers = fingersForHand.map(function(finger) {
          var f;
          f = {
            x: finger.x - hand.x,
            y: finger.y - hand.y,
            z: finger.z - hand.z,
            bones: finger.bones
          };
          f['dip'] = finger.dip === void 0 ? [] : finger.dip;
          f['mcp'] = finger.mcp === void 0 ? [] : finger.mcp;
          f['pip'] = finger.pip === void 0 ? [] : finger.pip;
          return f;
        });
        fingers.push(normalizedFingers);
      }
      return this.flattenFingers(fingers);
    }
  };

}).call(this);
