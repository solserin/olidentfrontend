export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'MENÚ'
    },
    {
      name: 'Roles',
      url: '/usuarios',
      icon: 'icon-star',
      children: [
        {
          name: 'Usuarios',
          url: '/usuarios/',
          icon: 'icon-star'
        },
        {
          name: 'Roles',
          url: '/usuarios/roles',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    
  ]
}
