import mongoose from "mongoose";

const quotaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    
  },
 
});
export default mongoose.model("Quote",quotaSchema)
