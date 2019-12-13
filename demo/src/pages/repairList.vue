<template>
  <div class="list">
    <!-- 添加维修按钮 -->
    <el-button class="add" type="text" @click="isadd">添加维修</el-button>

    <!-- 添加维修/修改维修 -->
    <el-dialog title="添加/修改维修" :visible.sync="dialogFormVisible">
      <el-form :model="user" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop='name'>
          <el-input v-model="user.name" autocomplete="off" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth" prop='score'>
          <el-input
            v-model="user.score"
            autocomplete="off"
            type="number"
            min="0"
            max="5"
            placeholder="0-5之间"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop='type'>
          <el-input v-model="user.type" autocomplete="off" placeholder="维修类型"></el-input>
        </el-form-item>
        <el-form-item label="点赞数量" :label-width="formLabelWidth" prop='likeNum'>
          <el-input
            v-model="user.likeNum"
            autocomplete="off"
            type="number"
            placeholder="点赞数量"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="关注人数" :label-width="formLabelWidth" prop='readNum'>
          <el-input
            v-model="user.readNum"
            autocomplete="off"
            type="number"
            placeholder="关注人数"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家地址" :label-width="formLabelWidth" prop='address'>
          <el-input v-model="user.address" autocomplete="off" placeholder="商家地址"></el-input>
        </el-form-item>
        <el-form-item label="距离" :label-width="formLabelWidth" prop='len'>
          <el-input v-model="user.len" autocomplete="off" placeholder="距离"></el-input>
        </el-form-item>
        <el-form-item label="商家信息" :label-width="formLabelWidth" prop='info'>
          <el-input v-model="user.info" autocomplete="off" placeholder="商家信息"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop='tel'>
          <el-input v-model="user.tel" autocomplete="off" placeholder="商家电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="addRepair" v-if="show">确 定</el-button>
        <el-button type="primary" @click.prevent="updateRepair" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <!-- 维修列表 -->
    <el-table :data="repair" height="400" border style="width: 90%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="维修名称" width="180"></el-table-column>
      <el-table-column prop="tel" label="电话" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
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
    return {
      show: true,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      repair: [], //接收到的维修信息
      user: {},//上传到服务器的维修信息
      rules:{//验证规则
          name:[{ required: true, message: '请输入名称', trigger: 'blur' },{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
          score:[{ required: true, message: '请输入评分', trigger: 'blur' }],
          type:[{required: true, message: '此项必填', trigger: 'blur'}],
          likeNum:[{required: true, message: '此项必填', trigger: 'blur'}],
          readNum:[{required: true, message: '此项必填', trigger: 'blur'}],
          info:[{required: true, message: '此项必填', trigger: 'blur'}],
          tel:[{required: true, message: '此项必填', trigger: 'blur'}],   
          len:[{required: true, message: '此项必填', trigger: 'blur'}],
          address:[{required: true, message: '此项必填', trigger: 'blur'}],      
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    //添加按钮====================================
    isadd() {
      this.dialogFormVisible = true;
      this.isDisabled = false;
      this.show = true;
      this.user = {};
    },
    //查询维修====================================
    find() {
      this.$axios({
        //get请求
        url: API.findRepair
      }).then(res => {
        // console.log(res);
        this.repair = res.data.data;
      });
    },
    //删除维修====================================
    del(id) {
      this.$axios({
        url: API.delRepair,
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
    //添加维修====================================
    addRepair() {
      this.$axios({
        url: API.addRepair,
        method: "get",
        params: this.user
      }).then(res => {
        alert("添加成功"), 
        this.find(), 
        this.dialogFormVisible = false;
      });
    },
    //查看|修改维修===============================
    find2(id) {
      if (id) {
        this.show = false, 
        this.dialogFormVisible = true;
      }
      this.$axios({
        url: API.findRepair,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        this.user = res.data.data[0];
      });
    },
    updateRepair(){//更新维修
    
        this.$axios({
            url:API.updateRepair ,
            method:'get',
            params:this.user
        }).then(res=>{
            console.log(res);
            this.find()
            this.dialogFormVisible = false;
        })
    },

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