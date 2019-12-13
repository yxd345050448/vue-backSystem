<template>
  <div class="homeBanner">
    <!-- 添加家政按钮 -->
    <el-button class="add" type="text" @click="isadd">添加Banner</el-button>
    <!-- 添加家政Banner展示框 -->
    <el-dialog title="添加家政banner" :visible.sync="dialogFormVisible">
      <el-form :model="add">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="add.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="addBanner">添加</el-button>
      </div>
    </el-dialog>
    <!-- 家政展示表格 -->
    <el-table :data="banner" height="400" border style="width: 90%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="500">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!-- 删除 -->
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
      dialogFormVisible: false,
      formLabelWidth: "100px",
      banner: [], //接收请求到的图片
      add: {
        //要添加的banner
        img: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    //添加banner按钮
    isadd() {
      this.dialogFormVisible = true;
      this.show = true;
      this.user = {};
    },
    //查找家政banner===========================
    find() {
      this.$axios({
        url: API.homeBanner
      }).then(res => {
        // console.log(res);
        this.banner = res.data.data;
      });
    },
    //添加家政banner===========================
    addBanner() {
      this.$axios({
        url: API.addHomeBanner,
        method: "get",
        params: this.add
      }).then(res => {
        (this.dialogFormVisible = false), this.find();
      });
    },
    //删除家政banner===========================
    del(id) {
      this.$axios({
        url: API.delHomeBanner,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        this.find();
      });
    },
    //删除弹窗======================
    open(id) {
      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
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
    }
  },
  created() {},
  mounted() {
    this.find();
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.homeBanner {
  margin-top: 10px;
  text-align: center;

  .el-table {
    margin: 10px auto;

    img {
      width: 150px;
      height: 150px;
    }
  }

  .add {
    padding: 10px 30px;
    color: white;
  }
}
</style>