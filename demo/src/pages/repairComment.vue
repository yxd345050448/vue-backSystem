<template>
  <div class="comment">
    <!-- 下拉菜单 -->
    <el-select v-model="all" placeholder="全部">
      <el-option label="全部" value="1" @click.native.prevent="findComment()"></el-option>
      <el-option v-for="item in repair" :key="item.id" :label="item.name" :value="item.id" @click.native.prevent="findComment(item.id)"></el-option>
    </el-select>
    <!-- 维修评论列表 -->
    <el-table :data="options" height="400" border style="width: 90%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="用户名" width="180"></el-table-column>
      <el-table-column prop="content" label="评论内容" width="180"></el-table-column>
      <el-table-column prop="time" label="时间" width="180">
          <template slot-scope="scope">{{scope.row.time|getTime}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!-- 查看、删除 -->
        <template slot-scope="scope">
          <v-del @click.native.prevent="open(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../util/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      all: "1", //默认全部
      repair: [], //接收到的维修名
      options: [] //获取维修的评论
    };
  },
  watch: {},
  computed: {},
  methods: {
    //获取维修===========================================
    find() {
      this.$axios({
        //get请求
        url: API.findRepair
      }).then(res => {
        // console.log(res);
        this.repair = res.data.data;
      });
    },
    //获取维修评论========================================
    findComment(id) {
      this.$axios({
        url: API.findRepairComment,
        method: "get",
        params: {
          repairId: id
        }
      }).then(res => {
        console.log(res);
        this.options = res.data.data;
      });
    },
    //删除维修评论========================================
    del(id) {
      this.$axios({
        url: API.delRepairComment,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
        this.findComment();
      });
    },
    //删除弹窗====================================
    open(id) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.del(id); //调用删除方法
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
  created() {},
  mounted() {
    this.find();
    this.findComment();
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.comment {
  text-align: center;
  margin-top: 10px;

  .el-table {
    margin: 10px auto;
  }
}
</style>