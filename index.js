const exp = require('express');
const mongoose = require('mongoose');
const NodeSchema = require('./DATABASE/schema');
const { encryptValue, decryptValue, hashValue } = require('./helper/hash')

const app = exp();


/*
@dbURL setting arbitary url for mongodb
*/
const db = 'mongodb://fakelink/posist';
mongoose.connect(db,function(err){
        if(err)
        {
                console.log(err);
        }
        else{
                console.log('Connected Successfully');
        }
});

app.get('/', (req, res) => {

});

app.post('/', async (req, res) => {
  try{
    const {
      data,
      name,
      childrenname,
      parentname,
      genesisname
    } = req.body;

    const referenceNodeIdPromise = NodeSchema.findOne({name:
parentname,_id:1});

    const childReferenceNodeIdPromise = NodeSchema.find({name: { $in:
childrenname },_id:1});

    const genesisReferenceNodeIdPromise = NodeSchema.findOne({name:
parentname,_id:1});

    const [referenceNodeId, childReferenceNodeId,
genesisReferenceNodeId ] = await Promise.all([
childReferenceNodeIdPromise, childReferenceNodeIdPromise,
genesisReferenceNodeId
    ]);

    const encryptData = encryptValue(data)
    const toHash =
`${Date.now()}${data}${referenceNodeId}${childReferenceNodeId}${genesisReferenceNodeId}`
    const hash = hashValue(toHash)

    let newNode = new NodeSchema({
      data:encryptData,
      name,
      referenceNodeId,
      childReferenceNodeId,
      genesisReferenceNodeId,
      hash
    })
    newNode = await newNode.save();
    res.send(200).json({status: true, data: newNode})
  }
  catch(err) {
    if(err.code == 11000) {
      res.status(400).json({message: 'Name is used already'})
    }
    else
    {
    res.status(504).json({message: 'something went wrong'})
    }
  }
})

app.listen(3000, () => {
  console.log('server started');
});