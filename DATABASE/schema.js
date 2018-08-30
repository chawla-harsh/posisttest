const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Node = new schema({
    name: {
    type: String,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: String
  },
  nodeNumber: {
    type: Number
  },
  referenceNodeId: {
    type: schema.Types.ObjectId
  },
  childReferenceNodeId: [{
    type: schema.Types.ObjectId
  }],
  genesisReferenceNodeId: {
    type: schema.Types.ObjectId
  },
  hashValue: {
    type: String
  }
})

module.exports = mongoose.model('Node',Node);