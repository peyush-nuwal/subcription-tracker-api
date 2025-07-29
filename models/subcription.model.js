import { mongoose } from "mongoose";

const subcriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subcription Name is required"],
        trim: true,
        minLength: 2,
        maxLength:100
    },
    price: {
        type: Number,
        required: [true, "Subcription Price is required"],
        min:[0,"Price must be grater than 0"],
        max:[1000,"Price must be less than 1000"]
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR'],
        default:"USD"
        
    },
    frequency: {
        type: String,
        enum: ["daily","weekly",'monthly', 'yearly'],
        
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'enterainment', 'lifestyle', 'technology', 'finance', 'other'],
        required:true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
        
    },
    status: {
        type: String,
        enum: ["active", "cancelled",'expired'],
        default:"active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date',
        }
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

},{Timestamp:true})

// Auto-calculate renewal data automaticalyy
subcriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto-update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
 })

const Subcription = mongoose.model("Subcription", subcriptionSchema)

export default Subcription