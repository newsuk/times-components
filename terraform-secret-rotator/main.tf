terraform {
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    # managed by either backend-config configs or cli vars
  }
}
