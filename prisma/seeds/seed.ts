import { AccessMenuAllowedEnum, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const encryptPassword = async (password: string) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const prisma = new PrismaClient();

const IDRole = {
  SUPERADMIN: 1,
  ADMIN: 2,
  DEVELOPER: 3,
  PROYEK_MANAGER: 4,
  OWNER: 5,
};

const IDModul = {
  DEVELOPER: 1,
  PROYEK_MANAGER: 2,
  OWNER: 3,
  SETTING: 4,
};

const roleSeeder = async () => {
  // Delete all data
  await prisma.role.deleteMany();

  const result = await prisma.role.createMany({
    data: [
      { id: IDRole.SUPERADMIN, code: 'SUPERADMIN', name: 'Super Admin' },
      {
        id: IDRole.ADMIN,
        code: 'ADMIN',
        name: 'Admin',
      },
      {
        id: IDRole.DEVELOPER,
        code: 'DEVELOPER',
        name: 'Developer',
      },
      {
        id: IDRole.PROYEK_MANAGER,
        code: 'PROYEK_MANAGER',
        name: 'Proyek Manager',
      },
      {
        id: IDRole.OWNER,
        code: 'OWNER',
        name: 'Owner',
      },
    ],
  });

  console.log({
    seederRole: result,
  });
};

const userSeeder = async () => {
  // Delete all data
  await prisma.user.deleteMany();

  const result = await prisma.user.createMany({
    data: [
      {
        id: 1,
        roleId: IDRole.SUPERADMIN,
        username: 'superadmin',
        name: 'Super Admin',
        password: await encryptPassword('12345678'),
      },
      {
        id: 2,
        roleId: IDRole.ADMIN,
        username: 'admin',
        name: 'Admin',
        password: await encryptPassword('12345678'),
      },
      {
        id: 3,
        roleId: IDRole.DEVELOPER,
        username: 'developer',
        name: 'Developer',
        password: await encryptPassword('12345678'),
      },
      {
        id: 4,
        roleId: IDRole.PROYEK_MANAGER,
        username: 'proyekmanager',
        name: 'Proyek Manager',
        password: await encryptPassword('12345678'),
      },
      {
        id: 5,
        roleId: IDRole.OWNER,
        username: 'owner',
        name: 'Owner',
        password: await encryptPassword('12345678'),
      },
    ],
  });

  console.log({
    seederUser: result,
  });
};

const categoryModulSeeder = async () => {
  // Delete all data
  await prisma.categoryModul.deleteMany();

  const result = await prisma.categoryModul.createMany({
    data: [
      {
        id: 1,
        code: 'CTG_MAIN',
        name: 'Main',
        prefix: 'main',
      },
      {
        id: 2,
        code: 'CTG_SETTING',
        name: 'Setting',
        prefix: 'setting',
      },
    ],
  });

  console.log({
    seederCategoryModul: result,
  });
};

const modulSeeder = async () => {
  // Delete all data
  await prisma.modul.deleteMany();

  const result = await prisma.modul.createMany({
    data: [
      {
        id: IDModul.DEVELOPER,
        categoryModulId: 1,
        code: 'MDL_DEVELOPER',
        name: 'Developer',
        prefix: 'developer',
      },
      {
        id: IDModul.PROYEK_MANAGER,
        categoryModulId: 1,
        code: 'MDL_PROYEK_MANAGER',
        name: 'Proyek Manager',
        prefix: 'proyek-manager',
      },
      {
        id: IDModul.OWNER,
        categoryModulId: 1,
        code: 'MDL_OWNER',
        name: 'Owner',
        prefix: 'owner',
      },
      {
        id: IDModul.SETTING,
        categoryModulId: 2,
        code: 'MDL_SETTING',
        name: 'Setting',
        prefix: 'setting',
      },
    ],
  });

  console.log({
    seederModul: result,
  });
};

const menuSeeder = async () => {
  // Delete all data
  await prisma.menu.deleteMany();

  const result = await prisma.menu.createMany({
    data: [
      // Developer
      {
        id: 1,
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_DASHBOARD',
        name: 'Dashboard',
        prefix: 'developer/dashboard',
      },
      {
        id: 2,
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_TASK',
        name: 'Task',
        prefix: 'developer/task',
      },
      {
        id: 3,
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_PROJECT',
        name: 'Project',
        prefix: 'developer/project',
      },
      {
        id: 4,
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_MEEETING',
        name: 'Meeting',
        prefix: 'developer/meeting',
      },

      // Proyek Manager
      {
        id: 5,
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_DASHBOARD',
        name: 'Dashboard',
        prefix: 'proyek-manager/dashboard',
      },
      {
        id: 6,
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MN_PROYEK_MANAGER_ASSIGN_TASK',
        name: 'Assign Task',
        prefix: 'proyek-manager/assign-task',
      },
      {
        id: 7,
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_PROJECT',
        name: 'Project',
        prefix: 'proyek-manager/project',
      },
      {
        id: 8,
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_MEEETING',
        name: 'Meeting',
        prefix: 'proyek-manager/meeting',
      },

      {
        id: 9,
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_DOCUMENT',
        name: 'Document',
        prefix: 'proyek-manager/document',
      },

      // Owner
      {
        id: 10,
        modulId: IDModul.OWNER,
        code: 'MNU_OWNER_DASHBOARD',
        name: 'Dashboard',
        prefix: 'owner/dashboard',
      },
      {
        id: 11,
        modulId: IDModul.OWNER,
        code: 'MNU_OWNER_REPORT',
        name: 'Report',
        prefix: 'owner/report',
      },

      // Admin
      {
        id: 12,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ROLE',
        name: 'Role',
        prefix: 'setting/role',
      },
      {
        id: 13,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_USER',
        name: 'User',
        prefix: 'setting/user',
      },
      {
        id: 14,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_CATEGORY_MODUL',
        name: 'Category Modul',
        prefix: 'setting/category-modul',
      },
      {
        id: 15,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_MODUL',
        name: 'Modul',
        prefix: 'setting/modul',
      },
      {
        id: 16,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_MENU',
        name: 'Menu',
        prefix: 'setting/menu',
      },
      {
        id: 17,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ACCESS_CATEGORY_MODUL',
        name: 'Access Category Modul',
        prefix: 'setting/access-category-modul',
      },
      {
        id: 18,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ACCESS_MODUL',
        name: 'Access Modul',
        prefix: 'setting/access-modul',
      },
      {
        id: 19,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ACCESS_MENU',
        name: 'Access Menu',
        prefix: 'setting/access-menu',
      },
      {
        id: 20,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_MASTER_CATEGORY',
        name: 'Master Category',
        prefix: 'setting/master-category',
      },
      {
        id: 21,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_PARAMETER',
        name: 'Parameter',
        prefix: 'setting/parameter',
      },
    ],
  });

  console.log({
    seederMenu: result,
  });
};

const accessCategoryModulSeeder = async () => {
  // Delete all data
  await prisma.accessCategoryModul.deleteMany();

  const categoryModuls = await prisma.categoryModul.findMany();
  const result = await prisma.accessCategoryModul.createMany({
    data: [
      // Super Admin
      ...categoryModuls.map((item) => ({
        categoryModulId: item.id,
        roleId: IDRole.SUPERADMIN,
      })),
      // Admin
      {
        categoryModulId: 2,
        roleId: IDRole.ADMIN,
      },
      // Developer
      {
        categoryModulId: 1,
        roleId: IDRole.DEVELOPER,
      },
      // Proyek Manager
      {
        categoryModulId: 1,
        roleId: IDRole.PROYEK_MANAGER,
      },
      // Owner
      {
        categoryModulId: 1,
        roleId: IDRole.OWNER,
      },
    ],
  });

  console.log({
    seederAccessCategoryModul: result,
  });
};

const accessModulSeeder = async () => {
  // Delete all data
  await prisma.accessModul.deleteMany();

  const modul = await prisma.modul.findMany();

  const result = await prisma.accessModul.createMany({
    data: [
      // Super Admin
      ...modul.map((item) => ({ modulId: item.id, roleId: IDRole.SUPERADMIN })),

      // Admin
      ...modul
        .filter((item) => item.code === 'MDL_SETTING')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.ADMIN,
        })),

      // Developer
      ...modul
        .filter((item) => item.code === 'MDL_DEVELOPER')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.DEVELOPER,
        })),

      // Proyek Manager
      ...modul
        .filter((item) => item.code === 'MDL_PROYEK_MANAGER')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.PROYEK_MANAGER,
        })),

      // Owner
      ...modul
        .filter((item) => item.code === 'MDL_OWNER')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.OWNER,
        })),
    ],
  });

  console.log({
    seederAccessModul: result,
  });
};

const accessMenuSeeder = async () => {
  // Delete all data
  await prisma.accessMenu.deleteMany();

  const menus = await prisma.menu.findMany();

  const allAccess = [
    'VIEW',
    'CREATE',
    'UPDATE',
    'DELETE',
    'PRINT',
    'EXPORT',
    'IMPORT',
    'APPROVE',
  ] as AccessMenuAllowedEnum[];

  const result = await prisma.accessMenu.createMany({
    data: [
      // Superadmin
      ...menus.map((item) => ({
        menuId: item.id,
        roleId: IDRole.SUPERADMIN,
        modulId: item.modulId,
        allowedAccess: allAccess,
      })),
    ],
  });

  console.log({
    seederAccessMenu: result,
  });
};

const main = async () => {
  try {
    // Execute seeders
    await roleSeeder();
    await userSeeder();
    await categoryModulSeeder();
    await modulSeeder();
    await menuSeeder();
    await accessCategoryModulSeeder();
    await accessModulSeeder();
    await accessMenuSeeder();
  } catch (error) {
    console.log({
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

main();
