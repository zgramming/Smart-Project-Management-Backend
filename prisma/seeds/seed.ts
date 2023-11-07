import { AccessMenuAllowedEnum, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type SeederType = {
  onlyTruncate?: boolean;
};

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

const roleSeeder = async ({ onlyTruncate = false }: SeederType) => {
  // Delete all data
  await prisma.role.deleteMany();

  if (onlyTruncate) {
    return;
  }

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

const userSeeder = async ({ onlyTruncate = false }: SeederType) => {
  // Delete all data
  await prisma.user.deleteMany();

  if (onlyTruncate) {
    return;
  }

  const result = await prisma.user.createMany({
    data: [
      {
        id: 1,
        roleId: IDRole.SUPERADMIN,
        username: 'zeffry',
        name: 'Zeffry Reynando',
        password: await encryptPassword('12345678'),
      },
      {
        id: 2,
        roleId: IDRole.ADMIN,
        username: 'syarif',
        name: 'Syarif Hidayatullah',
        password: await encryptPassword('12345678'),
      },
      {
        id: 3,
        roleId: IDRole.DEVELOPER,
        username: 'nakia',
        name: 'Annisa Nakia Shakila',
        password: await encryptPassword('12345678'),
      },
      {
        id: 4,
        roleId: IDRole.PROYEK_MANAGER,
        username: 'rifda',
        name: 'Rifda Kamila',
        password: await encryptPassword('12345678'),
      },
      {
        id: 5,
        roleId: IDRole.OWNER,
        username: 'ricky',
        name: 'Ricky Achmad Alvieri',
        password: await encryptPassword('12345678'),
      },
    ],
  });

  console.log({
    seederUser: result,
  });
};

const categoryModulSeeder = async ({ onlyTruncate = false }: SeederType) => {
  // Delete all data
  await prisma.categoryModul.deleteMany();

  if (onlyTruncate) {
    return;
  }

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

const modulSeeder = async ({ onlyTruncate = false }: SeederType) => {
  // Delete all data
  await prisma.modul.deleteMany();

  if (onlyTruncate) {
    return;
  }

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

const menuSeeder = async ({ onlyTruncate = false }: SeederType) => {
  // Delete all data
  await prisma.menu.deleteMany();

  if (onlyTruncate) {
    return;
  }

  const result = await prisma.menu.createMany({
    data: [
      // Developer
      {
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_DASHBOARD',
        name: 'Dashboard',
        prefix: 'developer/dashboard',
      },
      {
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_TASK',
        name: 'Task',
        prefix: 'developer/task',
      },
      {
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_PROJECT',
        name: 'Project',
        prefix: 'developer/project',
      },
      {
        modulId: IDModul.DEVELOPER,
        code: 'MNU_DEVELOPER_MEEETING',
        name: 'Meeting',
        prefix: 'developer/meeting',
      },

      // Proyek Manager
      {
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_DASHBOARD',
        name: 'Dashboard',
        prefix: 'proyek-manager/dashboard',
      },
      {
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MN_PROYEK_MANAGER_ASSIGN_TASK',
        name: 'Assign Task',
        prefix: 'proyek-manager/assign-task',
      },
      {
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_PROJECT',
        name: 'Project',
        prefix: 'proyek-manager/project',
      },
      {
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_MEEETING',
        name: 'Meeting',
        prefix: 'proyek-manager/meeting',
      },

      {
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_DOCUMENT',
        name: 'Document',
        prefix: 'proyek-manager/document',
      },
      {
        modulId: IDModul.PROYEK_MANAGER,
        code: 'MNU_PROYEK_MANAGER_CLIENT',
        name: 'Client',
        prefix: 'proyek-manager/client',
      },

      // Owner
      {
        modulId: IDModul.OWNER,
        code: 'MNU_OWNER_DASHBOARD',
        name: 'Dashboard',
        prefix: 'owner/dashboard',
      },
      {
        modulId: IDModul.OWNER,
        code: 'MNU_OWNER_REPORT',
        name: 'Report',
        prefix: 'owner/report',
      },

      // Admin
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ROLE',
        name: 'Role',
        prefix: 'setting/role',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_USER',
        name: 'User',
        prefix: 'setting/user',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_CATEGORY_MODUL',
        name: 'Category Modul',
        prefix: 'setting/category-modul',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_MODUL',
        name: 'Modul',
        prefix: 'setting/modul',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_MENU',
        name: 'Menu',
        prefix: 'setting/menu',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ACCESS_CATEGORY_MODUL',
        name: 'Access Category Modul',
        prefix: 'setting/access-category-modul',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ACCESS_MODUL',
        name: 'Access Modul',
        prefix: 'setting/access-modul',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_ACCESS_MENU',
        name: 'Access Menu',
        prefix: 'setting/access-menu',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_MASTER_CATEGORY',
        name: 'Master Category',
        prefix: 'setting/master-category',
      },
      {
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_PARAMETER',
        name: 'Parameter',
        prefix: 'setting/parameter',
      },
      {
        id: 9999,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_PARENT_MENU',
        name: 'Parent Menu',
        prefix: 'setting/parent-menu',
      },
      {
        parentMenuId: 9999,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_PARENT_MENU_CHILDREN_1',
        name: 'Parent Menu Children 1',
        prefix: 'setting/parent-menu/children-1',
      },
      {
        parentMenuId: 9999,
        modulId: IDModul.SETTING,
        code: 'MNU_SETTING_PARENT_MENU_CHILDREN_2',
        name: 'Parent Menu Children 2',
        prefix: 'setting/parent-menu/children-2',
      },
    ],
  });

  console.log({
    seederMenu: result,
  });
};

const accessCategoryModulSeeder = async ({
  onlyTruncate = false,
}: SeederType) => {
  // Delete all data
  await prisma.accessCategoryModul.deleteMany();

  if (onlyTruncate) {
    return;
  }

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

const accessModulSeeder = async ({ onlyTruncate = false }: SeederType) => {
  // Delete all data
  await prisma.accessModul.deleteMany();

  if (onlyTruncate) {
    return;
  }

  const modul = await prisma.modul.findMany();

  const result = await prisma.accessModul.createMany({
    data: [
      // Super Admin
      ...modul.map((item) => ({
        modulId: item.id,
        roleId: IDRole.SUPERADMIN,
        categoryModulId: item.categoryModulId,
      })),

      // Admin
      ...modul
        .filter((item) => item.code === 'MDL_SETTING')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.ADMIN,
          categoryModulId: item.categoryModulId,
        })),

      // Developer
      ...modul
        .filter((item) => item.code === 'MDL_DEVELOPER')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.DEVELOPER,
          categoryModulId: item.categoryModulId,
        })),

      // Proyek Manager
      ...modul
        .filter((item) => item.code === 'MDL_PROYEK_MANAGER')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.PROYEK_MANAGER,
          categoryModulId: item.categoryModulId,
        })),

      // Owner
      ...modul
        .filter((item) => item.code === 'MDL_OWNER')
        .map((item) => ({
          modulId: item.id,
          roleId: IDRole.OWNER,
          categoryModulId: item.categoryModulId,
        })),
    ],
  });

  console.log({
    seederAccessModul: result,
  });
};

const accessMenuSeeder = async ({ onlyTruncate = false }: SeederType) => {
  // Delete all data
  await prisma.accessMenu.deleteMany();

  if (onlyTruncate) {
    return;
  }

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

      // Admin
      ...menus
        .filter((item) => item.prefix.startsWith('setting'))
        .map((item) => ({
          menuId: item.id,
          roleId: IDRole.ADMIN,
          modulId: item.modulId,
          allowedAccess: allAccess,
        })),

      // Developer
      ...menus
        .filter((item) => item.prefix.startsWith('developer'))
        .map((item) => ({
          menuId: item.id,
          roleId: IDRole.DEVELOPER,
          modulId: item.modulId,
          allowedAccess: allAccess,
        })),

      // Proyek Manager
      ...menus
        .filter((item) => item.prefix.startsWith('proyek-manager'))
        .map((item) => ({
          menuId: item.id,
          roleId: IDRole.PROYEK_MANAGER,
          modulId: item.modulId,
          allowedAccess: allAccess,
        })),

      // Owner
      ...menus
        .filter((item) => item.prefix.startsWith('owner'))
        .map((item) => ({
          menuId: item.id,
          roleId: IDRole.OWNER,
          modulId: item.modulId,
          allowedAccess: allAccess,
        })),
    ],
  });

  console.log({
    seederAccessMenu: result,
  });
};

const projectClientSeeder = async () => {
  // Delete all data
  await prisma.projectClient.deleteMany();

  const result = await prisma.projectClient.createMany({
    data: [
      { id: '1', code: 'CLT_1', name: 'PT. ABC' },
      { id: '2', code: 'CLT_2', name: 'PT. DEF' },
      { id: '3', code: 'CLT_3', name: 'PT. GHI' },
    ],
  });

  console.log({
    seederProjectClient: result,
  });
};

const main = async () => {
  const onlyTruncate = false;
  try {
    // Execute seeders
    await roleSeeder({ onlyTruncate });
    await userSeeder({ onlyTruncate });
    await categoryModulSeeder({ onlyTruncate });
    await modulSeeder({ onlyTruncate });
    await menuSeeder({ onlyTruncate });
    await accessCategoryModulSeeder({ onlyTruncate });
    await accessModulSeeder({ onlyTruncate });
    await accessMenuSeeder({ onlyTruncate });

    // Start Project Seeder
    await projectClientSeeder();
  } catch (error) {
    console.log({
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

main();