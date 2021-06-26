import mainLayout from '@/layouts/mainLayout';

const componentsRouter = {
  name: 'components',
  path: '/components',
  component: mainLayout,
  redirect: '/components/vr',
  meta: {
    title: 'component',
    icon: 'component',
  },
  children: [
    {
      name: 'vr',
      path: '/components/vr',
      component: () => import('@/views/components/vr/index'),
      meta: { title: 'vr', role: ['admin', 'test'] }
    },
    {
      name: 'Markdown',
      path: '/components/markdown',
      component: () => import('@/views/components/markdown/index'),
      meta: { title: 'markdown' }
    },
    {
      name: 'lottery',
      path: '/components/lottery',
      component: () => import('@/views/components/lottery/index'),
      meta: { title: 'lottery', role: ['admin', 'test'] }
    },
    {
      name: 'table',
      path: '/components/table',
      component: () => import('@/views/components/table/index'),
      meta: { title: 'table', role: ['admin', 'test'] }
    },
    {
      name: 'form',
      path: '/components/form',
      component: () => import('@/views/components/form/index'),
      meta: { title: 'form', role: ['admin', 'test'] }
    },
    {
      name: 'loading',
      path: '/components/loading',
      component: () => import('@/views/components/loading/index'),
      meta: { title: 'loading', role: ['admin', 'test'] }
    },
    {
      name: 'webSocket',
      path: '/components/webSocket',
      component: () => import('@/views/components/webSocket/index'),
      meta: { title: 'webSocket', role: ['admin', 'test'] }
    },
    {
      name: 'screenshot',
      path: '/components/screenshot',
      component: () => import('@/views/components/screenshot/index'),
      meta: { title: 'screenshot', role: ['admin', 'test'] }
    }
  ]
};

export default componentsRouter;
