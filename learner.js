/* 
  takes in an array of training data, the labels that correspond to it,
  a dictionary of options, and a callback for when the learning is complete

  @param train_data an array of convnetjs.Vol()
  @param train_labels an array of integers (class indices 0-length) corresponding to train_data
  @param opts MagicNet options dictionary
  @param callback function to be called back at end of learning
  @return the MagicNet
*/
function createMagicNet(train_data, train_labels, opts, callback) {
  var magicNet = new convnetjs.MagicNet(train_data, train_labels, opts);
  magicNet.onFinishBatch(callback); // callback once learning is complete
 
  // start training MagicNet. Every call trains all candidates in current batch
  setInterval(magicNet.step, 0});
  return magicNet;
}