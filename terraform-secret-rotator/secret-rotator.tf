module "secret_rotator_times_components_dev" {
  source                                  = "git@github.com:newsuk/nuk-secret-rotator.git?ref=v0.20.0"
  create_secrets                          = true
  environment                             = "dev"
  account                                 = "aws-digital-dev-tnlweb"
  custom_role_arn                         = "arn:aws:iam::512040659177:role/circle-oidc-nuk-aws-digital-dev-tnlweb"
  create_role                             = false
  enable_notifications = {
    enable                 = false
    slack_channel          = ""
    slack_token_secret_arn = ""
  }

  secrets = {
    "times-components/dev/GH_TOKEN" = {
      description             = "The Github token for dev"
      recovery_window_in_days = 0
      enable_rotation         = false
      tags = {
        Environment    = "dev"
        Repository     = var.repository
        SecretRotation = "auto"
        SecretType     = "external"
        ServiceName    = "Github"
        SecretOwner    = var.service_owner
      }
    }
  }
}





