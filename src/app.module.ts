import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
