import crypto from 'node:crypto'

const ESEWA_TEST_URL = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'

function createSignature(message, secret) {
  return crypto.createHmac('sha256', secret).update(message).digest('base64')
}

export function initiateEsewaPayment(req, res) {
  const { items = [], totalAmount } = req.body
  const merchantCode = process.env.ESEWA_MERCHANT_CODE
  const secretKey = process.env.ESEWA_SECRET_KEY

  if (!merchantCode || !secretKey) {
    return res.status(503).json({ message: 'eSewa payment is not configured on the server.' })
  }

  if (!Array.isArray(items) || items.length === 0 || !Number.isFinite(Number(totalAmount)) || Number(totalAmount) <= 0) {
    return res.status(400).json({ message: 'A valid cart is required to start payment.' })
  }

  const amount = Number(totalAmount).toFixed(2)
  const transactionUuid = `BHOJ-${Date.now()}`
  const signedFieldNames = 'total_amount,transaction_uuid,product_code'
  const signatureMessage = `total_amount=${amount},transaction_uuid=${transactionUuid},product_code=${merchantCode}`
  const signature = createSignature(signatureMessage, secretKey)
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

  return res.json({
    paymentUrl: process.env.ESEWA_PAYMENT_URL || ESEWA_TEST_URL,
    fields: {
      amount,
      tax_amount: '0',
      total_amount: amount,
      transaction_uuid: transactionUuid,
      product_code: merchantCode,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: `${frontendUrl}/payment/success`,
      failure_url: `${frontendUrl}/payment/failure`,
      signed_field_names: signedFieldNames,
      signature,
    },
  })
}
