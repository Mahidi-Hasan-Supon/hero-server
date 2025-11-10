const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// uri user: hero-db
//uri password: OsgvE4TYcN7krN3q
const uri = "mongodb+srv://hero-db:OsgvE4TYcN7krN3q@cluster0.d4lgux6.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
     





    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`HomeHero server side on port ${port}`)
})
