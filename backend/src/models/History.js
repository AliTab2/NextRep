import mongoose from "mongoose"

const HistorySchema = new mongoose.Schema({
    action: {
      type: String, 
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, 
  })

const History = mongoose.model('History', HistorySchema)
export default History
