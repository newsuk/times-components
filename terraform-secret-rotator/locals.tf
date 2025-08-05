locals {
  dev_env_secrets = var.environment == "dev" ? {
    "times-components/dev/GH_TOKEN" = {
      description             = "The Github token for dev"
      recovery_window_in_days = 0
      enable_rotation         = false
      tags = {
        Environment    = var.environment
        Repository     = var.repository
        SecretRotation = "auto"
        SecretType     = "external"
        ServiceName    = "Github"
        SecretOwner    = var.service_owner
      }
    }
  } : {}
}