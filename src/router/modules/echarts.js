import mainLayout from '@/layouts/mainLayout';

const echartRouter = {
  name: 'echarts',
  path: '/echarts',
  component: mainLayout,
  redirect: '/echarts/bar',
  meta: {
    role: ['admin', 'test'],
    title: '图表',
    icon: 'echarts'
  },
  children: [
    {
      name: 'bar',
      path: '/echarts/bar',
      component: () => import('@/views/echarts/bar/index'),
      meta: { title: '年龄分析' }
    }
  ]
};

export default echartRouter;
