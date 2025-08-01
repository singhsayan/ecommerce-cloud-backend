output "products_table" {
  value = aws_dynamodb_table.products.name
}

output "orders_table" {
  value = aws_dynamodb_table.orders.name
}

output "users_table" {
  value = aws_dynamodb_table.users.name
}

output "s3_bucket" {
  value = aws_s3_bucket.uploads.bucket
}