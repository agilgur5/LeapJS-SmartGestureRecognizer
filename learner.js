var learner = {};
/*
  train_data = an array of convnetjs.Vol() (a 3D array of numbers)
  train_labels = an array of numbers (class indices 0-length) corresponding to train_data
  currentThreadID = the current thread that the training is being done on
  currentNet = the current Neural Net/MagicNet
*/
learner.train_data = [];
learner.train_labels = [];  
learner.currentThreadID = -1;
learner.currentNet = {};

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
learner.createMagicNet = function(opts, callback) {
  clearInterval(this.currentThreadID); // stop previous net's learning
  var magicNet = new convnetjs.MagicNet(this.train_data, this.train_labels, opts);
  magicNet.onFinishBatch(callback); // callback once learning is complete
 
  // start training MagicNet. Every call trains all candidates in current batch
  this.currentThreadID = setInterval(magicNet.step, 0);
  return this.currentNet = magicNet;
}

/* 
  takes in a MagicNet and a 2D array of data, outputting the predicted label for that data

  @param magicNet a MagicNet object
  @param data a 2D array of numbers
  @return the predicted label, a number corresponding to one from train_labels
*/
learner.predictLabel = function(data) {
  return magicNet.predict(data);
}