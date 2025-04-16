import { NextFunction, Request, Response } from "express";
import { paymentService } from "../../services/PaymentService";
import { StatusCode } from "../../types";
import { PaymentError } from "../../types/CustomError";

const webhookController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers["stripe-signature"] as string;

    const { invoice, eventType } = await paymentService.handleInvoicePaid(req.body, signature);

    switch (eventType) {
      case "payment_intent.payment_failed":
        break;
      case "payment_intent.payment_succeeded":
        break;
      case "invoice.payment_failed":
        break;
      case "invoice.payment_succeeded":
        break;
      case "customer.subscription_updated":
        break;
      case "customer.subscription_deleted":
        break;
      default:
        throw new PaymentError("Invalid event type", "PaymentService");
    }

    res.status(StatusCode.OK).json({ received: true });
  } catch (error) {
    next(error);
  }
};

export default webhookController;

// const stripe = require("stripe")(process.env.STRIPE_SECRET);
// var db = require("../db.js");
// var { updateInvoice, upsertInvoiceFunc } = require("./crmController");
// var { invoiceLogger } = require("../utils/logger");

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
// module.exports.stripeInvoiceStatus = async (req, res) => {
//     try {

//         let event;

//         try {
//             if (webhookSecret) {
//                 // Get the signature sent by Stripe
//                 const signature = req.headers["stripe-signature"];
//                 invoiceLogger.info({ body: req.body, signature, webhookSecret }, "Webhook event");
//                 try {
//                     event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
//                 } catch (err) {
//                     console.log("⚠️  Webhook signature verification failed.", err.message);
//                     return res.status(400).send(`Webhook Error: ${err.message}`);
//                     //return res.sendStatus(400);
//                 }
//             }
//             //	event = req.body;

//             const dataObject = event.data.object;
//             invoiceLogger.info("dataObject", { dataObject, event: event.type });
//             // Handle the event
//             // Review important events for Billing webhooks
//             // https://stripe.com/docs/billing/webhooks
//             // Remove comment to see the various objects sent for this sample
//             let status;
//             switch (event.type) {
//                 case "payment_intent.payment_failed":
//                     break;
//                 case "invoice.payment_succeeded":
//                     status = await updateInvoice(dataObject);

//                     break;
//                 case "invoice.created":
//                     status = await upsertInvoiceFunc(dataObject);
//                     console.log("status: ", status);
//                     break;

//                 case "invoice.payment_failed":
//                     status = await updateInvoice(dataObject);
//                     // biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
//                     const sql = "CALL spUpdateCustomerStatusByStripeCustomerId(?,?);";
//                     // biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
//                     const params = [dataObject.customer, "Suspended"];
//                     await db.query(sql, params);
//                     break;
//                 case "customer.subscription.updated":
//                     if (dataObject && dataObject.status === "active") {
//                         let sql2 = "CALL spUpdateCustomerStatusByStripeCustomerId(?,?);";
//                         var params2 = [dataObject.customer, "Reactivate"];
//                         try {
//                             await db.query(sql2, params2);
//                             console.log("status: ", status);
//                             invoiceLogger.info("SUBSCRIPTION UPDATED", { dataObject });
//                         } catch (error) {
//                             invoiceLogger.info("SUBSCRIPTION UPDATE ERROR", { error });
//                         }
//                     }
//                     break;
//                 case "customer.subscription.deleted":
//                     const sql3 = "CALL spUpdateCustomerStatusByStripeCustomerId(?,?);";
//                     const params3 = [dataObject.customer, "Cancelled"];
//                     try {
//                         await db.query(sql3, params3);
//                         invoiceLogger.info("SUBSCRIPTION UPDATED", { dataObject });
//                     } catch (error) {
//                         invoiceLogger.info("SUBSCRIPTION UPDATE ERROR", { error });
//                     }

//                     break;
//                 default:
//                 // Unexpected event type
//             }
//             res.json({ received: true });
//         } catch (err) {
//             console.log("err: ", err);
//             res.status(400).send(`Webhook Error: ${err.message}`);
//         }
//     } catch (error) {
//         console.log("error: ", error);
//         res.status(400).send(`Webhook Error: ${error}`);
//     }
// };
