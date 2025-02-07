import mongoose from "mongoose";

// Connexion à la base de données
const connectDB = () => {
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connexion with database done successfuly"))
.catch(err => console.log(err))
}

export default connectDB