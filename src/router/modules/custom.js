import mainLayout from '@/layouts/mainLayout';

export const customRouter={
    name:'custom',
    path:'/custom',
    component:mainLayout,
    meta:{
        title:'个性化',
        icon:'diy'
    },
    children:[]
}
export default customRouter