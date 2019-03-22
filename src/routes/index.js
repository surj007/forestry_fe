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
        component: 'User',
        showInMenu: true
      },
      {
        key: '/app/system/role', 
        title: '角色管理', 
        component: 'Role',
        showInMenu: true
      },
      {
        key: '/app/system/basic', 
        title: '基础资料维护', 
        component: 'Basic',
        showInMenu: true
      },
      {
        key: '/app/system/file', 
        title: '文件管理', 
        component: 'File',
        showInMenu: true
      },
      {
        key: '/app/system/version', 
        title: 'APP版本管理', 
        component: 'Version',
        showInMenu: true
      }
    ]
  },
  company: {
    key: '/app/company', title: '企业管理', icon: 'home',
    subs: [
      {
        key: '/app/company/companyInfo', 
        title: '企业信息管理', 
        component: 'CompanyInfo',
        showInMenu: true
      },
      {
        key: '/app/company/companyDetail', 
        title: '企业信息详情', 
        component: 'CompanyDetail',
        showInMenu: false
      }
    ]
  },
  business: {
    key: '/app/business', title: '业务办理', icon: 'laptop',
    subs: [
      {
        key: '/app/business/cert', 
        title: '开证管理', 
        component: 'Cert',
        showInMenu: true
      },
      {
        key: '/app/business/plantCert', 
        title: '运输证与检疫管理', 
        component: 'PlantCert',
        showInMenu: true
      }
    ]
  },
  inspect: { 
    key: '/app/inspect', title: '审核记录', icon: 'schedule',
    subs: [
      {
        key: '/app/inspect/check', 
        title: '定期检查记录', 
        component: 'Check',
        showInMenu: true
      },
      {
        key: '/app/inspect/quarantine', 
        title: '定期检疫记录', 
        component: 'Quarantine',
        showInMenu: true
      }
    ]
  }
};