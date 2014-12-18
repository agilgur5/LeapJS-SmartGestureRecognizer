/* 
  Learner class is a wrapper class for machine learning
*/
var learner = {};

/*
  train_data = an array of convnetjs.Vol() (a 3D array of numbers)
  train_labels = an array of numbers (class indices 0-length) corresponding to train_data
  currentThreadID = the current thread that the training is being done on
  currentNet = the current Neural Net/MagicNet
*/
learner.train_data = [];
learner.train_labels = [];  
//learner.currentThreadID = -1;
learner.net = null;
learner.trainer = null;

/*
  @param datapoint a 1D to 3D array of data
  @param train_label a number corresponding to train_data
*/  
learner.addDatapoint = function(datapoint, train_label) {
  this.train_data.push(datapoint);  
  this.train_labels.push(train_label);
  this.trainer.train(this.createVolume(datapoint), train_label);
  console.log(this.train_data);
}

/*
  @param train_data an array of convnetjs.Vol() (a 3D array of numbers)
  @param train_labels an array of numbers (class indices 0-length) corresponding to train_data
*/  
learner.addData = function(train_data, train_labels) {
  // loop through each data point and splice it into the array
  for(var i = 0; i < train_labels.length; i++) {
    this.train_data.splice(this.train_data.length, 0, train_data[i]);  
    this.train_labels.splice(this.train_labels.length, 0, train_labels[i]);
  }
}

/* 
  takes in a dictionary of options, and a callback for when the current batch is complete

  @param opts MagicNet options dictionary
  @param callback function to be called back at end of learning a single batch
  @return the MagicNet
*/
learner.createNet = function() {
  
  /* old magicnet code
  clearInterval(this.currentThreadID); // stop previous net's learning

  var opts = opts || {};
  var magicNet = new convnetjs.MagicNet(this.createVolumes(this.train_data), this.train_labels, opts);
  
  start training MagicNet. Every call trains all candidates in current batch
  this.currentThreadID = setInterval(function() {
    magicNet.step();
  }, 0); */

  var layer_defs = [];
  // input layer of size 5x48x1 (all volumes are 3D)
  layer_defs.push({type:'input', out_sx:5, out_sy:48, out_depth:1});
  // some fully connected layers
  layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
  // a softmax classifier predicting probabilities for three classes: 0,1,2
  layer_defs.push({type:'softmax', num_classes:3});
   
  // create a net out of it
  var net = new convnetjs.Net();
  net.makeLayers(layer_defs);

  var trainer = new convnetjs.Trainer(net, {learning_rate:0.01, l2_decay:0.001});
  
  this.trainer = trainer;
  return this.net = net;
}

/* 
  takes in a datapoint (1D to 3D array), outputting the predicted label for that datapoint

  @param datapoint 1D to 3D array containing the data
  @return the predicted label, a number corresponding to one from train_labels
*/
learner.predictLabel = function(datapoint) {
  // old magicnet version
  //return this.net.predict(this.createVolume(datapoint));
  var vol = this.net.forward(this.createVolume(datapoint));
  console.log(vol);
  console.log(vol.w);
  return this.net.getPrediction();
}


/* 
  takes in an array of data (2D to 4D) and outputs an array of labels for it

  @param test_data array of data
  @return the array of labels
*/ 
learner.predictLabels = function(test_data) {
  var test_labels = [];
  for(var i = 0; i < test_data.length; i++) {
    test_labels.push(this.predictLabel(test_data[i]));
  }
  return test_labels;
}

/* 
  takes in datapoint (1D to 3D array) and converts it into a volumes

  @param datapoint 1D to 3D array containing the data
  @return a single volume
*/
learner.createVolume = function(datapoint) {
  // check if 1D, 2D, or 3D
  var vol = {};
  if(typeof datapoint[0] == "number") {
    vol = new convnetjs.Vol(datapoint);
  } else if(typeof datapoint[0][0] == "number") {
    vol = new convnetjs.Vol(datapoint.length, datapoint[0].length, 1);
    for(var j = 0; j < datapoint.length; j++) {
      for(var k = 0; k < datapoint[j].length; k++) {
        vol.set(j, k, 1, datapoint[j][k]);
      }
    }
  } else {
    vol = new convnetjs.Vol(datapoint.length, datapoint[0].length, datapoint[0][0].length);
    for(var i = 0; i < datapoint.length; i++) {
      for(var j = 0; j < datapoint[i].length; j++) {
        for(var k = 0; k < datapoint[i][j].length; k++) {
          vol.set(i, j, k, datapoint[i][j][k]);
        }
      }
    }
  } // end else
  return vol;
}

/* 
  takes in an array of data (2D to 4D) and converts it into an array of volumes

  @param train_data array of data
  @return the array of volumes
*/ 
learner.createVolumes = function(train_data) {
  var volArr = [];
  for(var i = 0; i < train_data.length; i++) {
    volArr.push(this.createVolume(train_data[i]));
  }
  console.log(volArr);
  return volArr;
}

learner.createNet();