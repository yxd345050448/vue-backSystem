<template>
  <div class="list">
    <!-- 添加管理员按钮 -->
    <el-button class="add" type="text" @click="isadd">添加水站</el-button>

    <!-- 添加水站/修改水站 -->
    <el-dialog title="添加/修改水站" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off" placeholder="水站名称"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input
            v-model="user.score"
            autocomplete="off"
            type="number"
            min="0"
            max="5"
            placeholder="0-5之间"
            @blur="reScore"
          ></el-input>
        </el-form-item>
        <el-form-item label="月销售量" :label-width="formLabelWidth">
          <el-input
            v-model="user.count"
            autocomplete="off"
            type="number"
            placeholder="月销售量"
            min="0"
            @blur="reSale"
          ></el-input>
        </el-form-item>
        <el-form-item label="点赞数量" :label-width="formLabelWidth">
          <el-input
            v-model="user.likeNum"
            autocomplete="off"
            type="number"
            placeholder="点赞数量"
            min="0"
            @blur="reZan"
          ></el-input>
        </el-form-item>
        <el-form-item label="浏览量" :label-width="formLabelWidth">
          <el-input
            v-model="user.readNum"
            autocomplete="off"
            type="number"
            placeholder="浏览量"
            min="0"
            @blur="reBrowse"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家地址" :label-width="formLabelWidth">
          <el-input v-model="user.address" autocomplete="off" placeholder="商家地址"></el-input>
        </el-form-item>
        <el-form-item label="距离" :label-width="formLabelWidth">
          <el-input v-model="user.len" autocomplete="off" placeholder="距离 4km" @blur="reLen"></el-input>
        </el-form-item>
        <el-form-item label="商家信息" :label-width="formLabelWidth">
          <el-input v-model="user.des" autocomplete="off" placeholder="商家信息"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input
            v-model="user.tel"
            autocomplete="off"
            placeholder="商家电话400-100-1000"
            @blur="reLandline"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="user.price" autocomplete="off" placeholder="价格40元/每桶" @blur="rePrice"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="user.img" autocomplete="off" placeholder="图片路径"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native.prevent="addWater"
          v-if="show"
          :disabled="isdisabled"
        >确 定</el-button>
        <el-button type="primary" @click.native.prevent="updateWater" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <!-- 水站列表 -->
    <el-table :data="water" height="400" border style="width: 90%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="水站名称" width="180"></el-table-column>
      <el-table-column prop="tel" label="电话" width="180"></el-table-column>
      <el-table-column prop="price" label="价格" width="180"></el-table-column>
      <el-table-column prop="address" label="操作">
        <!-- 查看、删除 -->
        <template slot-scope="scope">
          <v-look @click.native.prevent="find2(scope.row.id)"></v-look>
          <v-del @click.native.prevent="open(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../util/API";
import re from "../assets/js/re";
export default {
  components: {},
  props: [],
  data() {
    return {
      show: true,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      water: [], //接收到的水站信息
      user: {}, //上传到服务器的水站信息
      isdisabled: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    isadd() {
      this.dialogFormVisible = true;
      this.isDisabled = false;
      this.show = true;
      this.user = {};
    },
    //查询水站====================================
    find() {
      this.$axios({
        //get请求
        url: API.findWater
      }).then(res => {
        // console.log(res);
        this.water = res.data.data;
      });
    },
    //删除水站====================================
    del(id) {
      this.$axios({
        url: API.delWater,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
        this.find();
      });
    },
    //删除弹窗====================================
    open(id) {
      this.$confirm("此操作将永久删除该水站?", "提示", {
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
    //添加水站====================================
    addWater() {
      this.$axios({
        url: API.addWater,
        method: "get",
        params: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            type: "succuse",
            message: res.data.info
          });
          this.find();
          this.dialogFormVisible = false;
        }
      });
    },
    //查看|修改水站===============================
    find2(id) {
      if (id) {
        (this.show = false), (this.dialogFormVisible = true);
      }
      this.$axios({
        url: API.findWater,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        this.user = res.data.data[0];
      });
    },
    updateWater() {
      //更新水站
      this.$axios({
        url: API.updateWater,
        method: "get",
        params: this.user
      }).then(res => {
        console.log(res);
        this.find();
        this.dialogFormVisible = false;
      });
    },
    //正则=========================================
    reScore() {
      //评分
      if (!re.score(this.user.score)) {
        this.$message({
          type: "error",
          message: "评分格式错误"
        });
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    },
    reZan() {
      //点赞
      if (!re.zan(this.user.likeNum)) {
        this.$message({
          type: "error",
          message: "点赞格式错误"
        });
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    },
    reSale() {
      //月销
      if (!re.zan(this.user.count)) {
        this.$message({
          type: "error",
          message: "销售格式错误"
        });
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    },
    reBrowse() {
      //浏览量
      if (!re.zan(this.user.readNum)) {
        this.$message({
          type: "error",
          message: "浏览量格式错误"
        });
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    },
    reLen() {
      //距离
      if (!re.len(this.user.len)) {
        this.$message({
          type: "error",
          message: "距离格式错误"
        });
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    },
    reLandline() {
      //商家电话
      if (!re.tel1(this.user.tel)) {
        this.$message({
          type: "error",
          message: "电话格式错误"
        });
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    },
    rePrice() {
      //价格
      if (!re.price1(this.user.price)) {
        this.$message({
          type: "error",
          message: "价格格式错误"
        });
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
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

.list {
  text-align: center;
  margin-top: 10px;

  .el-table {
    margin: 10px auto;
  }
}
</style>