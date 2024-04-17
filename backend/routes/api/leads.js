const express = require("express");
const { Lead, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLead = [
	check("name").exists({ checkFalsy: true }).withMessage("Please provide a name for the lead"),
	check("zipCode")
		.exists({ checkFalsy: true })
		.isLength({ min: 5, max: 5 })
		.withMessage("Please provide a valid zip code for the lead"),
	check("phoneNumber")
		.exists({ checkFalsy: true })
		.isLength({ min: 10, max: 11 })
		.withMessage("Please provide a valid phone number for the lead"),
	check("notes").exists({ checkFalsy: true }).isLength({ min: 1 }).withMessage("Please provide notes for the lead"),
	handleValidationErrors,
];

//Get Lead by leadId
router.get("/:leadId", requireAuth, async (req, res, next) => {
	try {
		const leadId = req.params.leadId;
		const lead = await Lead.getLeadById(leadId);

		if (!lead) {
			const err = new Error("Lead not found");
			err.title = "Not Found";
			err.status = 404;
			return next(err);
		}

		return res.json(lead);
	} catch (err) {
		next(err);
	}
});

//Update lead by leadId
router.put("/:leadId", requireAuth, async (req, res, next) => {
	try {
		const { setterId, closerId, name, address, zipCode, phoneNumber, email, notes, disposition } = req.body;
		const leadId = req.params.leadId;

		//check to see if lead exsists
		const lead = await Lead.findByPk(leadId);

		if (!lead) {
			const err = new Error("Lead not found");
			err.title = "Not Found";
			err.status = 404;
			return next(err);
		}

		const updateLead = await lead.update({
			setterId,
			closerId,
			name,
			address,
			zipCode,
			phoneNumber,
			email,
			notes,
			disposition,
		});

		const setter = await User.findByPk(setterId);
		let closer = {};
		if (closerId) {
			closer = await User.findByPk(closerId);
		}

		const safeLead = {
			id: updateLead.id,
			setterId,
			Setter: {
				firstName: setter.firstName,
			},
			closerId,
			Closer: {
				firstName: closer.firstName || "None",
			},
			name,
			address,
			zipCode,
			phoneNumber,
			email,
			notes,
			disposition,
		};

		return res.json(safeLead);
	} catch (err) {
		next(err);
	}
});

//Delete a lead by leadId
router.delete("/:leadId", requireAuth, async (req, res, next) => {
    try {

        const { user } = req
        if(user.role !== "manager"){
            const err = new Error("Forbidden - Only a manager can delete a lead");
			err.title = "Unauthorized";
			err.status = 403;
			return next(err);
        }

        const leadId = req.params.leadId;

		//check to see if lead exsists
		const lead = await Lead.findByPk(leadId);

		if (!lead) {
			const err = new Error("Lead not found");
			err.title = "Not Found";
			err.status = 404;
			return next(err);
		}

        await lead.destroy();

		return res.json({
			message: "Successfully deleted",
		});
    } catch (err) {
        next(err)
    }
})

//Get All Leads
router.get("/", async (req, res, next) => {
	try {
		const leads = await Lead.getAllLeads();
		return res.json({ Leads: leads });
	} catch (err) {
		next(err);
	}
});

//Create a lead
router.post("/", requireAuth, validateLead, async (req, res, next) => {
	try {
		const { user } = req;
		const { name, address, zipCode, phoneNumber, email, notes, disposition } = req.body;
		const newLead = await Lead.create({
			setterId: user.id,
			closerId: null,
			name,
			address,
			zipCode,
			phoneNumber,
			email,
			notes,
			disposition,
		});

		const lead = {
			id: newLead.id,
			setterId: newLead.setterId,
			Setter: {
				firstName: user.firstName,
			},
			closerId: null,
			name,
			address,
			zipCode,
			phoneNumber,
			email,
			notes,
			disposition,
		};
		res.status(201);

		return res.json(lead);
	} catch (err) {
		next(err);
	}
});

module.exports = router;

