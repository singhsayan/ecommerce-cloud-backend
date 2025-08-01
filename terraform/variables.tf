variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "products_table" {
  description = "Products DynamoDB table name"
  type        = string
  default     = "ProductsTable"
}

variable "orders_table" {
  description = "Orders DynamoDB table name"
  type        = string
  default     = "OrdersTable"
}

variable "users_table" {
  description = "Users DynamoDB table name"
  type        = string
  default     = "UsersTable"
}

variable "s3_bucket" {
  description = "S3 bucket for uploads"
  type        = string
  default     = "ecommerce-uploads-bucket"
}