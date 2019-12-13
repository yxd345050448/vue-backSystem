<template>
  <div class="manage">
    <!-- 添加家教按钮 -->
    <el-button class="add" type="text" @click="isadd">添加Banner</el-button>

    <!-- 添加家教展示框 -->
    <el-dialog title="添加家教banner" :visible.sync="dialogFormVisible">
      <el-form :model="add">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="add.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="add.des" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="addBanner">添加</el-button>
      </div>
    </el-dialog>

    <!-- 家教展示表格 -->
    <el-table :data="tBanner" height="400" border style="width: 90%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="图片" width="300">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述" width="180"></el-table-column>
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
      tBanner: [], //接收请求到的banner
      dialogFormVisible: false,
      formLabelWidth: "100px",
      //往数据库添加图片
      add: {
        img: "", //图片
        des: "" //描述
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
    //查询=================
    find() {
      this.$axios({
        url: API.teacherBanner
      }).then(res => {
        console.log(res);
        this.tBanner = res.data.data;
      });
    },
    //添加==========================
    addBanner() {
      this.$axios({
        url: API.addTeacherBanner,
        method: "get",
        params: this.add
      }).then(res => {
        this.dialogFormVisible = false;
        this.find();
      });
    },
    //删除=================
    del(id) {
      this.$axios({
        url: API.delTeacherBanner,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
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
    //页面加载就查询数据
    this.find();
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.manage {
  text-align: center;
  margin-top 10px
  .el-table {
    text-align: center;
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