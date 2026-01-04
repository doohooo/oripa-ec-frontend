import { db } from "./db"

export type OrderStatus = "created" | "pending" | "paid" | "failed"

export interface Order {
  id: number
  order_no: string
  amount: number
  currency: string
  status: OrderStatus
  stripe_payment_intent_id?: string | null
  created_at: string
  updated_at: string
}

export function generateOrderNo() {
  const date = new Date()
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "")
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `ORD-${ymd}-${rand}`
}

export function createOrder(params: {
  amount: number
  currency: string
}): Order {
  const now = new Date().toISOString()
  const orderNo = generateOrderNo()

  const stmt = db.prepare(`
    INSERT INTO orders (
      order_no,
      amount,
      currency,
      status,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    orderNo,
    params.amount,
    params.currency,
    "created",
    now,
    now
  )

  return {
    id: result.lastInsertRowid as number,
    order_no: orderNo,
    amount: params.amount,
    currency: params.currency,
    status: "created",
    stripe_payment_intent_id: null,
    created_at: now,
    updated_at: now,
  }
}

export function attachPaymentIntent(orderNo: string, paymentIntentId: string) {
  const now = new Date().toISOString()
  db.prepare(`
    UPDATE orders
    SET stripe_payment_intent_id = ?, status = ?, updated_at = ?
    WHERE order_no = ?
  `).run(paymentIntentId, "pending", now, orderNo)
}

export function updateOrderStatus(orderNo: string, status: OrderStatus) {
  const now = new Date().toISOString()
  db.prepare(`
    UPDATE orders
    SET status = ?, updated_at = ?
    WHERE order_no = ?
  `).run(status, now, orderNo)
}

export function getOrderByOrderNo(orderNo: string): Order | null {
  const row = db
    .prepare(`SELECT * FROM orders WHERE order_no = ?`)
    .get(orderNo)

  return row ?? null
}

export function markOrderPaid(orderNo: string) {
  const now = new Date().toISOString()
  db.prepare(`
    UPDATE orders
    SET status = ?, updated_at = ?
    WHERE order_no = ?
  `).run("paid", now, orderNo)
}

export function markOrderFailed(orderNo: string, reason?: string) {
  const now = new Date().toISOString()
  db.prepare(`
    UPDATE orders
    SET status = ?, failure_reason = ?, updated_at = ?
    WHERE order_no = ?
  `).run("failed", reason ?? null, now, orderNo)
}
