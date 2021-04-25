<template functional>
  <a-sub-menu :key="props.currentRoute.path">
    <template slot="title">
      <svg-icon :icon="props.currentRoute.meta.icon" v-if="props.currentRoute.meta.icon"> </svg-icon>
      <span style="margin-left:16px" class="menu-title">{{ props.currentRoute.meta.title }}</span>
    </template>
    <template>
      <template v-if="props.children">
        <div>child</div>
        <!<menu-item :key="item.name" :path="props.currentRoute.path" :title="item.alia||item.name"/>-->
      </template>
      <template v-else>
        <!--<menu-item v-if="!item.children" :key="item.path" :currentRoute="item" />
        <sub-menu v-else :key="item.path" :currentRoute="item" />-->
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import menuItem from './menuItem';
export default {
  name: 'subMenu',
  components: { menuItem },
  props: {
    currentRoute: {
      type: Object,
      required: true
    },
    children: {
      type: Array
    },
  }
};
</script>
