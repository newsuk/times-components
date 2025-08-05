# Secret Rotator README

## Overview
This document provides an overview of the **Secret Rotator** implementation for managing secrets in the **Sun Savers BACS Service** environment. The secret rotator is designed to automate secret creation, rotation, and retrieval, ensuring secure and efficient secret management across environments.

---

## Features
- Automated creation and rotation of secrets.
- AWS Lambda functions for specific secret rotation tasks.
- Support for multiple secret types such as API keys, passwords, and tokens.
- Integration with AWS Secrets Manager.
- Optional Slack notifications for secret rotation status.

---

## Module Configuration

### Terraform Module
The `secret_rotator` Terraform module is used to configure the secret rotation settings.

```hcl
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

```

---

## CircleCI Integration

### Secret Retrieval Jobs
The following jobs in the CircleCI pipeline handle secret retrieval:

- **Retrieve GH_TOKEN**

#### Example Job for Retrieving a Secret:
```yaml
get_secret_gh_token_dev:
    executor: node
    steps:
      - aws-cli/setup:
          region: SECRETS_REGION
          role_arn: arn:aws:iam::512040659177:role/circle-oidc-nuk-aws-digital-dev-tnlweb
      - aws-secrets-manager/get-aws-secret:
          aws-secret-name: times-components/dev/GH_TOKEN
```

### Secret Rotation Workflow
The workflow `secrets-rotator` automates secret creation and rotation through Terraform configurations.

#### Workflow Steps:
1. **Plan Terraform Changes**:
   - Prepares the Terraform plan for secret rotator configuration.
2. **Approval**:
   - Manual approval step to proceed with applying changes.
3. **Apply Terraform Changes**:
   - Executes the Terraform plan to create or update secret configurations.

#### Example Workflow:
```yaml
secrets-rotator:
    when:
      and:
        - equal: [true, << pipeline.parameters.deploy_secrets >>]
    jobs:
      - plan-secret-terraform:
          name: plan-terraform-secret-rotator-dev
          role: arn:aws:iam::512040659177:role/circle-oidc-nuk-aws-digital-dev-tnlweb
          env: dev
          region: eu-west-1
      - approve-apply-terraform-secret-rotator-dev:  
          type: approval  
          requires:  
            - plan-terraform-secret-rotator-dev    
      - apply-secret-terraform:  
          name: apply-terraform-secret-rotator-dev  
          role: arn:aws:iam::512040659177:role/circle-oidc-nuk-aws-digital-dev-tnlweb
          env: dev
          region: eu-west-1
          requires:  
            - approve-apply-terraform-secret-rotator-dev
```

---

## Notifications (Optional)
Slack notifications can be enabled to provide updates on secret rotation status.

```hcl
enable_notifications = {
  enable                 = true
  slack_channel          = "your-slack-channel"
  slack_token_secret_arn = "your-slack-token-secret-arn"
}
```

---

## Best Practices
- **Environment Isolation**:
  - Use separate secrets for each environment (`dev`, `staging`, `prod`) to ensure security.
- **Access Management**:
  - Restrict access to sensitive secrets and roles using AWS IAM policies.
- **Rotation Frequency**:
  - Ensure critical secrets are rotated at regular intervals to maintain security.
