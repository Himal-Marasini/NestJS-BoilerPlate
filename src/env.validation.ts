import { plainToInstance } from "class-transformer"
import { IsEnum, IsNumber, IsString, IsUrl, Matches, validateSync } from "class-validator"

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Staging = "staging"
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  PORT: number

  @IsUrl({ require_tld: false })
  APP_URL: string

  @IsString()
  @Matches(/^(postgres|postgresql):\/\//, {
    message: 'DATABASE_URL must start with "postgresql://"'
  })
  DATABASE_URL: string
}

interface AppConfig {
  PORT: number
  NODE_ENV: Environment
  APP_URL: string
}

interface DbConfig {
  DATABASE_URL: string
}

export interface IAppConfigurations {
  appConfig: AppConfig
  dbConfig: DbConfig
}

export function validate(config: Record<string, unknown>): IAppConfigurations {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  const { PORT, NODE_ENV, APP_URL, DATABASE_URL } = validatedConfig

  return {
    appConfig: {
      PORT,
      NODE_ENV,
      APP_URL
    },
    dbConfig: {
      DATABASE_URL
    }
  }
}
