This is a Dashboard template built with Next.js fullstack setup (Helpful for small to medium size apps)

## Stacks

- Next.js
- typescript
- tailwindcss
- trpc
- zustand
- prisma
- cognito
- mailersend

## ENV VARS

- DATABASE_URL = pirsma connection to database (mongodb, planetscale, mysql)
- AWS_CONFIG_CLIENT_REGION={aws region}
- AWS_CONFIG_ACCESS_KEY_ID={aws user account accesssKeyId (create a specific user for this and make sure to apply least privilege)}
- AWS_CONFIG_SECRET_KEY={aws user account secret key (create a specific user for this and make sure to apply least privilege)}
- AWS_CONFIG_CLIENT_APP_CLIENT_ID={cognito user pool app client id}
- AWS_CONFIG_CLIENT_APP_SECRET={cognito user pool app client secret}
- COGNITO_USER_POOL_ID={aws cognito user pool id}

- GENERAL_APP_NAME={app name}
- GENERAL_COMPANY_NAME={company name that uses this app}

- MAILER_SEND_TEMPLATE_ID={mailer send template id}
- MAILER_SEND_FROM_EMAIL={mailer send from email}
- MAILER_SEND_FROM_NAME={mailer send from name}
- MAILER_SEND_API_KEY={api key of your mailer send account domain}