export default {
  home: { 
    key: '/app/home/index', 
    title: '概览', 
    icon: 'area-chart', 
    component: 'Home'
  },
  system: {
    key: '/app/system', title: '系统管理', icon: 'setting',
    subs: [
      {
        key: '/app/system/user', 
        title: '用户管理', 
        component: 'User'
      },
      {
        key: '/app/system/role', 
        title: '角色管理', 
        component: 'Role'
      },
      {
        key: '/app/system/basic', 
        title: '基础资料维护', 
        component: 'Basic'
      },
      {
        key: '/app/system/file', 
        title: '文件管理', 
        component: 'File'
      },
      {
        key: '/app/system/version', 
        title: 'APP版本管理', 
        component: 'Version'
      }
    ]
  },
  company: {
    key: '/app/company', title: '企业管理', icon: 'home',
    subs: [
      {
        key: '/app/company/companyInfo', 
        title: '企业信息管理', 
        component: 'CompanyInfo'
      }
    ]
  },
  business: {
    key: '/app/business', title: '业务办理', icon: 'laptop',
    subs: [
      {
        key: '/app/business/issue', 
        title: '开证办理', 
        component: 'Issue'
      }
    ]
  },
  inspect: { 
    key: '/app/inspect/index', 
    title: '定期检查记录', 
    icon: 'schedule', 
    component: 'Inspect'
  }
};