const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
     
   const db = client.db("hero_db")
   const heroCollection = db.collection("hero") 
   const booksCollection =db.collection("books")

  // limit 6 card in home page
   app.get('/latest-home',async (req,res)=>{
    const cursor = heroCollection.find({}).limit(6)
    const result = await cursor.toArray()
    res.send({
      // success:true,
      result
    })
   })
  //  limit 3 card in home page
   app.get('/slider-home',async (req,res)=>{
    const cursor = heroCollection.find().sort({price:1}).limit(3)
    const result = await cursor.toArray()
    res.send({
      // success:true,
      result
    })
   })
  //  all heros services
   app.get('/services',async (req,res)=>{
    const cursor = heroCollection.find()
    const result = await cursor.toArray()
    res.send({
      // success:true,
      result
    })
   })
  // add services
  app.post('/services',async(req,res)=>{
    const data = req.body 
    const result = await heroCollection.insertOne(data)
    res.send(result)
  }) 
  // add my services in users table format
  app.get('/service',async(req,res)=>{
    const email = req.query.email 
    const query = {email:email}
    const result = await heroCollection.find(query).toArray()
    res.send(result)
  })
  // my service update
  app.put('/service/:id',async(req,res)=>{
    const id = req.params.id
    const query = {_id:new ObjectId(id)}
    const updateService = req.body 
    const update ={
      $set:updateService
    }
    const result = await heroCollection.updateOne(query,update)
    res.send(result)
     })
    //  service delete table theke
    app.delete('/service/:id',async(req,res)=>{
      const id = req.params.id
      console.log(id);
      const query = {_id:new ObjectId(id)}
      const result = await heroCollection.deleteOne(query)
      console.log(result);
      res.send(result)
    })

  //  services details find one
   app.get('/servicesdetails/:id',async (req,res)=>{
    const id = req.params.id
    const query = {_id:new ObjectId(id)}
    const result =await heroCollection.findOne(query)
 
    res.send({
      // success:true,
      result
    })
   })
  // books post database insert one
  app.post('/books',async (req,res)=>{
    const data = req.body 
    const result = await booksCollection.insertOne(data) 
    res.send(result)
  })
    // my bookins page get
    app.get('/bookings',async(req,res)=>{
      const email = req.query.email 
      const query = {user_email:email}
      const result = await booksCollection.find(query).toArray()
      res.send(result)
    })
    // booking delete
    app.delete('/bookings/:id',async (req,res)=>{
      const id =req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await booksCollection.deleteOne(query)
      res.send(result)
    })
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
