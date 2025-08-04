import { User } from '@/schemas/user';
import { menuData, MenuType } from '@/components/layout/Menu';

// ✅ Sửa kiểu: permissions là một function, không phải array trực tiếp
export const permissions = (user: User): MenuType[] => {
  const newNavData: MenuType[] = [...menuData];

  if (!user.permission) {
    return [];
  }

  const menuCreate: MenuType[] = [];

  for (const row of newNavData) {
    if (row.permission) {
      if (checkPermission(user, row.permission)) {
        menuCreate.push(row);
      }
    } else if (row.routes && row.routes.length > 0) {
      const filteredRoutes = row.routes.filter(menu =>
        checkPermission(user, menu.permission),
      );

      if (filteredRoutes.length > 0) {
        // ✅ Sửa: copy row, và gán routes mới
        menuCreate.push({...row, routes: filteredRoutes});
      }
    } else {
      menuCreate.push(row);
    }
  }

  return menuCreate;
};

// ✅ Hàm kiểm tra permission
export const checkPermission = (
  user: Partial<User>,
  permissionKey: string = '',
  id?: string | number | null,
): boolean => {
  if (!user.permission) return false;
  if (!permissionKey || !user.permission[permissionKey.toLowerCase()]) return true;

  for (const key in user.permission) {
    if (
      key.toLowerCase() === permissionKey.toLowerCase() &&
      (user.permission[key] === true ||
        (user.permission[key]?.allow &&
          Array.isArray(user.permission[key].id) &&
          (id ? user.permission[key].id.includes(id) : true)))
    ) {
      return true;
    }
  }

  return false;
};
