import mainLayout from '@/layouts/mainLayout';

const echartRouter = {
  name: 'echarts',
  path: '/echarts',
  component: mainLayout,
  redirect: '/echarts/bar',
  meta: {
    role: ['admin', 'test'],
    title: 'echarts',
    icon: 'echarts'
  },
  children: [
    {
      name: 'bar',
      path: '/echarts/bar',
      component: () => import('@/views/echarts/bar/index'),
      meta: { title: 'bar' }
    },
    {
      name: 'line',
      path: '/echarts/line',
      component: () => import('@/views/echarts/line/index'),
      meta: { title: 'line' }
    },
    {
      name: 'pie',
      path: '/echarts/pie',
      component: () => import('@/views/echarts/pie/index'),
      meta: { title: 'pie' }
    },
    {
      name: 'other',
      path: '/echarts/other',
      component: () => import('@/views/echarts/other/index'),
      meta: {
        role: ['admin'],
        title: 'other'
      }
    }
  ]
};

export default echartRouter;
