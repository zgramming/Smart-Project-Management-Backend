import { Module } from '@nestjs/common';
import { CategoryModulModule } from './v1/setting/category-modul/category-modul.module';
import { RoleModule } from './v1/setting/role/role.module';
import { UserModule } from './v1/setting/user/user.module';
import { ModulModule } from './v1/setting/modul/modul.module';
import { MenuModule } from './v1/setting/menu/menu.module';
import { AccessModulModule } from './v1/setting/access-modul/access-modul.module';
import { AccessMenuModule } from './v1/setting/access-menu/access-menu.module';
import { MasterCategoryModule } from './v1/setting/master-category/master-category.module';
import { MasterDataModule } from './v1/setting/master-data/master-data.module';
import { ParameterModule } from './v1/setting/parameter/parameter.module';
import { AuthModule } from './v1/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constant';
import envConfiguration from './config/env_configuration';

@Module({
  imports: [
    // Env config
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [envConfiguration],
    }),

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),

    // V1 Module
    CategoryModulModule,
    RoleModule,
    UserModule,
    ModulModule,
    MenuModule,
    AccessModulModule,
    AccessMenuModule,
    MasterCategoryModule,
    MasterDataModule,
    ParameterModule,
    AuthModule,
  ],
})
export class AppModule {}
