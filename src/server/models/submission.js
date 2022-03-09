const { MODEL_NAME } = require('@server/constants/db');
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		senderNumber: { type: String },
		contactName: { type: String },
		contactEmail: { type: String },
		contactMobile: { type: String },
		evaluation: {type: String, required: true, enum: ['Secure', 'Phishing', 'Unevaluated'], default: 'Unevaluated'},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model(MODEL_NAME.SUBMISSION, submissionSchema);
