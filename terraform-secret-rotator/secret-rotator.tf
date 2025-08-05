module "secret_rotator_times_components_dev" {
  source                                  = "git@github.com:newsuk/nuk-secret-rotator.git?ref=v0.20.0"
  create_secrets                          = true
  environment                             = var.environment
  account                                 = var.account
  custom_role_arn                         = "arn:aws:iam::512040659177:role/circle-oidc-nuk-aws-digital-dev-tnlweb"
  create_role                             = false
  create_kubernetes_external_secrets_role = false
  enable_notifications = {
    enable                 = false
    slack_channel          = ""
    slack_token_secret_arn = ""
  }

  secrets =  merge(local.dev_env_secrets)
}





