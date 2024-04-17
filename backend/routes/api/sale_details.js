const express = require("express");
const { Lead, User, Sale_Details } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//delete a sale by saleId
router.delete("/:id", requireAuth, async (req, res, next) => {
    try {
        const {user} = req
        const saleId = req.params.id

        if (user.role === "setter") {
            const err = new Error("Forbidden - Only a manager or closer can delete a sale");
			err.title = "Unauthorized";
			err.status = 403;
			return next(err);
        }

        //check to see if sale exists
		const saleDetails = await Sale_Details.findByPk(saleId);

		if (!saleDetails) {
			const err = new Error("Sale not found");
			err.title = "Not Found";
			err.status = 404;
			return next(err);
		}

        await saleDetails.destroy();

        return res.json({
			message: "Successfully deleted",
		});

    } catch (err) {
        next(err)
    }
})

//update sale by saleId
router.put("/:id", requireAuth, async (req, res, next) => {
	try {
		const {
			leadId,
			accountNumber,
			agreementLength,
			planType,
			initialPrice,
			recurringPrice,
			autopay,
			ach,
			initialDate,
		} = req.body;
		const saleId = req.params.id;

		//check to see if sale exists
		const saleDetails = await Sale_Details.findByPk(saleId);

		if (!saleDetails) {
			const err = new Error("Sale not found");
			err.title = "Not Found";
			err.status = 404;
			return next(err);
		}

		const updateSale = await saleDetails.update({
			leadId,
			accountNumber,
			agreementLength,
			planType,
			initialPrice,
			recurringPrice,
			autopay,
			ach,
			initialDate,
		});

		return res.json(updateSale);
	} catch (err) {
		next(err);
	}
});

//Get all sales
router.get("/", async (req, res, next) => {
	try {
		const soldLeads = await Sale_Details.getAllSales();
		return res.json(soldLeads);
	} catch (err) {
		next(err);
	}
});

//Create a sale
router.post("/", requireAuth, async (req, res, next) => {
	try {
		const {
			leadId,
			accountNumber,
			agreementLength,
			planType,
			initialPrice,
			recurringPrice,
			autopay,
			ach,
			initialDate,
		} = req.body;

		const newSale = await Sale_Details.create({
			leadId,
			accountNumber,
			agreementLength,
			planType,
			initialPrice,
			recurringPrice,
			autopay,
			ach,
			initialDate,
			serviced: "Pending",
		});

		res.status(201);
		return res.json(newSale);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
