// Generated by CoffeeScript 1.8.0
(function() {
  window.FingerUtils = {
    flattenFingers: function(fingers) {
      var flattenedFingers, frame;
      flattenedFingers = [].concat.apply([], fingers);
      frame = flattenedFingers.map(function(flatFinger) {
        var flatBones, flatterBones;
        flatBones = [].concat.apply([], flatFinger.bones);
        flatterBones = [].concat.apply([], flatBones);
        return [flatFinger.x, flatFinger.y, flatFinger.z].concat(flatterBones);
      });
      console.log('Frame: ' + JSON.stringify(frame));
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
          return {
            x: finger.x - hand.x,
            y: finger.y - hand.y,
            z: finger.z - hand.z
          };
        });
        fingers.push(normalizedFingers);
      }
      return this.flattenFingers(fingers);
    }
  };

}).call(this);
