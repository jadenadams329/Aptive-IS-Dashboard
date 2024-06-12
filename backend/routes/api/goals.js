const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Goal } = require("../../db/models");

const router = express.Router();

//delete goal by id
router.delete("/:id", requireAuth, async (req, res, next) => {
	try {
		const goalId = req.params.id;

		//check to see if goal exists
		const goal = await Goal.findByPk(goalId);

		if (!goal) {
			const err = new Error("Goal not found");
			err.title = "Not Found";
			err.status = 404;
			return next(err);
		}

		await goal.destroy();

		return res.json({
			message: "Successfully deleted",
		});
	} catch (err) {
		next(err);
	}
});

//update goal by goal id
router.put("/:id", requireAuth, async (req, res, next) => {
    try {
		const goalId = req.params.id;

		//check to see if goal exists
		const goal = await Goal.findByPk(goalId);

		if (!goal) {
			const err = new Error("Goal not found");
			err.title = "Not Found";
			err.status = 404;
			return next(err);
		}

        const { name, value, type, targetDate, status } = req.body;

        const updatedGoal = await goal.update({
            name,
			value,
			type,
			targetDate,
			status,
        })

        return res.json(updatedGoal)

	} catch (err) {
		next(err);
	}
})

//create a goal
router.post("/", requireAuth, async (req, res, next) => {
	try {
		const { name, value, type, targetDate, status } = req.body;
		const { user } = req;
		const newGoal = await Goal.create({
			userId: user.id,
			name,
			value,
			type,
			targetDate,
			status,
		});

		res.status(201);
		return res.json(newGoal);
	} catch (err) {
		next(err);
	}
});

//get goals by current user
router.get("/", requireAuth, async (req, res, next) => {
	try {
		const { user } = req;
		const userGoals = await Goal.getUserGoals(user.id);
		return res.json(userGoals);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
