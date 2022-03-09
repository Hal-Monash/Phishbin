const express = require('express'); 
// require相当于import express 意思是很快 是个包
const router = express.Router();
// 根据请求路径分配不同的action post put 下面具体做的事情

const Submission = require('@server/models/submission');

router.post('/', async (req, res, next) => {
	try {
		const submission = await Submission.create(req.body);
		res.json(submission);
	} catch (e) {
		next(e);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const { limit } = req.query;
		const submissions = await Submission.find().sort({ createdAt: -1 }).limit(limit);
		res.json(submissions);
	} catch (e) {
		next(e);
	}
});


router.get('/:hao', async (req, res, next) => { //冒号表示变量 req请求（前发给后），res回应后发给前
	try {
		const submission = await Submission.findById(req.params.hao);
		res.json(submission);
	} catch (e) {
		next(e); //有点复杂
	}
});


router.put('/:id', async (req, res, next) => {
	try {
		const submission = await Submission.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
		res.json(submission);
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		await Submission.findByIdAndDelete(req.params.id);
		res.status(200).end();
	} catch (e) {
		next(e);
	}
});

module.exports = router;
