<template>
  <div class="graph-wrapper">
    <div class="graph-list">
      <chart-panel title="PHP天下第一" :hoverable="true" :bordered="false">
        <surround-graph class="chart-graph" />
      </chart-panel>
    </div>
    <div class="graph-list">
      <chart-panel title="海贼王人物关系图" :hoverable="true" :bordered="false">
        <tree-graph class="chart-graph" style="height:750px" />
      </chart-panel>
    </div>
  </div>
</template>

<script>
import surroundGraph from './components/surroundGraph';
import treeGraph from './components/treeGraph';
export default {
  name: 'graph',
  components: { surroundGraph, treeGraph },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.graph-list {
  width: 100%;
  margin-bottom: 25px;
  .chart-graph {
    height: 600px;
  }
}
</style>
