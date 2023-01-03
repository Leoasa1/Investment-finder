import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const STATEMENT_MODEL_NAME = 'statement';

const statementSchema = new Schema({
	budget: {
		type: Number,
		required: true,
	},
	zipCode: {
		type: Number,
		required: true,
	},
});

exports.STATEMENT_MODEL_NAME = STATEMENT_MODEL_NAME;
exports.roomModel = mongoose.model(STATEMENT_MODEL_NAME, statementSchema);
