variable "repository" {
  type        = string
  description = "repository name for times-components"
  default     = "times-components"
}

variable "service_owner" {
  type        = string
  description = "service owner name for times-components"
  default     = "Times Media"
}

variable "environment" {
  type = string
  description = "Times components environment"
}

variable "account" {
  type        = string
  description = "account for times-components"
  default     = "aws-digital-dev-tnlweb"
}