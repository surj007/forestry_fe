import * as userService from './user';
import * as menuService from './menu';

export default {
  ...userService,
  ...menuService
}