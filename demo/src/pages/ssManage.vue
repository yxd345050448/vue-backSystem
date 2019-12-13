<template>
  <div class="ssManage">
    <h1>管理员管理</h1>
    <!-- 添加管理员按钮 -->
    <el-button class="add" type="text" @click="isadd">添加管理员</el-button>

    <!-- 添加管理员展示框 -->
    <el-dialog title="添加/修改管理员" :visible.sync="dialogFormVisible">
      <el-form :model="user" :rules="rules">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="name">
          <el-input v-model="user.name" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
          <el-input v-model="user.pass" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" v-if="show" prop="confirm">
          <el-input v-model="confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop='des'>
          <el-input v-model="user.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="user.time" align="right" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="addManage" v-if="show">确 定</el-button>
        <el-button type="primary" @click.native.prevent="updateManage" v-else>修 改</el-button>
      </div>
    </el-dialog>

    <!-- 管理员展示表格 -->
    <el-table :data="manage" height="400" border style="width: 90%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="des" label="属性" width="180"></el-table-column>
      <el-table-column prop="time" label="时间" width="180">
        <template slot-scope="scope">{{scope.row.time|getTime}}</template>
      </el-table-column>
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
export default {
  components: {},
  props: [],
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      }
    };
    var validatePass2 = (rule, value, callback) => {
     
      if (value != this.user.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      manage: [], //接收请求的数据
      // isadd:true,
      isDisabled: false,
      dialogFormVisible: false,
      show: true, //是否显示

      //向数据库添加的管理员信息
      user: {
        name: "", //账号
        pass: "", //密码
        time: "", //日期
        des: "" ,//描述
      },
      confirm: "", //确认密码
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirm: [{ required: true, validator: validatePass2, trigger: "blur" }],
        des:[{required: true, message: "此为必填项", trigger: "blur" }]
      }
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
    //查询=========================
    find() {
      this.$axios({
        url: API.ssManage,
        method: "post"
      }).then(res => {
        this.manage = res.data.data;
      });
    },
    //删除=========================
    del(id) {
      this.$axios({
        url: API.delManage,
        method: "post",
        data: {
          id: id
        }
      }).then(res => {
        this.find();
      });
    },
    //删除弹窗======================
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
    //添加==========================
    addManage() {
      this.show = true;
      this.isDisabled = true;
      if (this.user.pass != this.confirm) {
        alert("两次密码不正确");
        return;
      }
      this.$axios({
        url: API.addManage,
        method: "post",
        data: {
          name: this.user.name,
          pass: this.user.pass,
          des: this.user.des,
          time: this.user.time.getTime() //转成时间戳
        }
      }).then(res => {
        console.log(res);
        this.dialogFormVisible = false;
        this.find();
      });
    },
    //查看|修改|返回=================
    find2(id) {
      if (id) {
        this.show = false;
        this.isDisabled = true;
      }
      (this.dialogFormVisible = true),
        this.$axios({
          url: API.ssManage,
          method: "post",
          data: {
            id: id
          }
        }).then(res => {
          this.user = res.data.data[0];
          this.user.time = new Date(parseInt(this.user.time));
        });
    },
    //修改==========================
    updateManage() {
      this.$axios({
        url: API.updateManage,
        method: "post",
        data: {
          id: this.user.id,
          des: this.user.des,
          time: this.user.time.getTime()
        }
      }).then(res => {
        console.log(res);
        this.find();
        this.dialogFormVisible = false;
      });
    }
  },
  created() {},
  mounted() {
    //查询数据
    this.find();
  },
  //组件内拦截
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("isAdmin") == "0") {
      next();
    } else {
      next("/index/welcome");
      // this.$message({ message: '你没有超级管理员权限', type: "error" });
      alert("你不是超级管理员");
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.ssManage {
  text-align: center;

  .el-table {
    text-align: center;
    margin: 10px auto;
  }

  .add {
    padding: 10px 30px;
    color: white;
  }
}
</style>