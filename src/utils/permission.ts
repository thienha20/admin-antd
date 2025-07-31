import { User } from '@/interfaces/prisma';
import type { NavSectionProps } from '@/components/nav-section';
import { NavItemBaseProps } from '@/components/nav-section';

const allowPaths: {
  path: string,
  method?: string | string[]
}[] = [{
  path: '/account',
}];

type Permission = { path: string, method: string }
export const permissions = (user: Partial<User>, navData: NavSectionProps['data']) => {
    const newNavData = [...navData];
    const resultNavData: { subheader: string, items: NavItemBaseProps[] }[] = [];
    if (user.UserLink && user.UserLink.length > 0) {
      const permission: Array<string> = getPermissionsAllowMethod(user, 'get');
      if (permission.length > 0) {
        for (const n in newNavData) {
          if (newNavData[n].items.length > 0) {
            const items: NavItemBaseProps[] = [];
            for (const idx in newNavData[n].items) {
              if (typeof newNavData[n].items[idx] === 'undefined' && typeof newNavData[n].items[idx]['path'] === 'undefined') {
                continue;
              }
              if (permission.some((item) => newNavData[n].items[idx].path === item || newNavData[n].items[idx].path.startsWith(item + '?'))) {

                if ('children' in newNavData[n].items[idx] && newNavData[n].items[idx].children.length > 0) {
                  const child: { title: string; path: string; }[] = [];
                  for (const c in newNavData[n].items[idx].children) {
                    if (permission.some((item) => newNavData[n].items[idx].children[c].path === item || newNavData[n].items[idx].children[c].path.startsWith(item + '?'))) {
                      child.push(newNavData[n].items[idx].children[c]);
                    }
                  }
                  if (child.length > 0) {
                    items.push({
                      ...newNavData[n].items[idx],
                      children: child,
                    });
                  }
                } else {
                  if(newNavData[n].items[idx]){
                    items.push(newNavData[n].items[idx])
                  }
                }
              }
            }
            if (items.length > 0) {
              resultNavData.push({
                subheader: newNavData[n].subheader ?? '',
                items,
              });
            }
          }
        }
      } else {
        return newNavData;
      }
    } else {
      return newNavData;
    }
    return resultNavData;
  }
;

export const checkPermission = (user: Partial<User>, path: string, method: string = 'get'): boolean => {
  const permission: Array<Permission> = getPermissions(user);
  if (permission.length === 0) return true;
  if (allowPaths.some(item => (path === item.path || item.path.startsWith(path + '?')) && (!item.method || item.method.includes(method.toLowerCase())))) {
    return true;
  }

  return permission.some((item) => {
    if ((path.indexOf('/create') > 0 || path.indexOf('/update') > 0) && path.startsWith(item.path) && Array.isArray(item.method)
      && item.method.some(m => ['post', 'put', 'patch'].includes(m))) {
      return true;
    }
    return (path === item.path || item.path.startsWith(path + '?')) && item.method.includes(method.toLowerCase());
  });
};

export const getPermissionsAllowMethod = (user: Partial<User>, method: string = 'get'): string[] => {
  const permission: Array<string> = [];
  if (user.UserLink && user.UserLink.length > 0) {
    for (const l of user.UserLink) {
      if (l.UserGroup?.settings) {
        const settings: Array<Permission> = typeof l.UserGroup?.settings === 'string' ? JSON.parse(l.UserGroup?.settings) : l.UserGroup?.settings;
        for (const j of settings) {
          if (j.method.includes(method?.toLowerCase()) && j.path) {
            permission.push(j.path);
          }
        }
      }
    }
  }
  return permission;
};

export const getPermissions = (user: Partial<User>): Array<Permission> => {
  let permission: Array<Permission> = [];
  if (user.UserLink && user.UserLink.length > 0) {
    for (const l of user.UserLink) {
      if (l.UserGroup?.settings) {
        const settings: Array<Permission> = typeof l.UserGroup?.settings === 'string' ? JSON.parse(l.UserGroup?.settings) : l.UserGroup?.settings;
        permission = [...permission, ...settings];
      }
    }
  }
  return permission;
};