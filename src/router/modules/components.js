import mainLayout from '@/layouts/mainLayout';

const componentsRouter = {
  name: 'components',
  path: '/components',
  component: mainLayout,
  redirect: '/components/vr',
  meta: {
    title: 'component',
    icon: 'component'
  },
  children: [
    {
      name: 'vr',
      path: '/components/vr',
      component: () => import('@/views/components/vr/index'),
      meta: { title: 'vr' }
    },
    {
      name: 'lottery',
      path: '/components/lottery',
      component: () => import('@/views/components/lottery/index'),
      meta: { title: 'lottery' }
    }
  ]
};

export default componentsRouter;
