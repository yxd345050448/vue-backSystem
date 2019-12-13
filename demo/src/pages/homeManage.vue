<template>
  <div class="comment">
    <!-- 添加家政按钮 -->
    <el-button class="add" type="text" @click="isadd">添加Banner</el-button>
    <!-- 添加员工信息 -->
    <el-dialog title="添加家政人员" :visible.sync="dialogFormVisible">
      <el-form :model="add" :rules="rules">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="add.name" autocomplete="off" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input
            v-model="add.age"
            autocomplete="off"
            type="number"
            placeholder="0-100"
            min="0"
            max="100"
            @blur="changeAge"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="add.tel" autocomplete="off" placeholder="电话号码:13551211559"></el-input>
        </el-form-item>
        <el-form-item label="资格认证" :label-width="formLabelWidth" prop="qualification">
          <el-checkbox-group v-model="add.qualification">
            <el-checkbox
              v-for="item in getQualification"
              :key="item"
              :label="item"
              name="qualification"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="服务项目" :label-width="formLabelWidth" prop="type">
          <el-checkbox-group v-model="add.type">
            <el-checkbox v-for="item in homeType" :key="item" :label="item" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth" prop="edu">
          <el-select v-model="add.edu" placeholder="请选择学历">
            <el-option value="小学">小学</el-option>
            <el-option value="初中">初中</el-option>
            <el-option value="高中">高中</el-option>
            <el-option value="本科">本科</el-option>
            <el-option value="研究生">研究生</el-option>
            <el-option value="博士">博士</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限" :label-width="formLabelWidth" prop="year">
          <el-input v-model="add.year" autocomplete="off" type="number" placeholder="工作年限" min="0"></el-input>
        </el-form-item>
        <el-form-item label="级别" :label-width="formLabelWidth" prop="vNum">
          <el-input v-model="add.vNum" autocomplete="off" placeholder="级别"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="add.price" autocomplete="off" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
          <el-input v-model="add.city" autocomplete="off" placeholder="城市"></el-input>
        </el-form-item>
        <el-form-item label="经验" :label-width="formLabelWidth" prop="experience">
          <el-input v-model="add.experience" autocomplete="off" placeholder="工作经验"></el-input>
        </el-form-item>
        <el-form-item label="点赞数量" :label-width="formLabelWidth" prop="likeNum">
          <el-input
            v-model="add.likeNum"
            autocomplete="off"
            type="number"
            placeholder="点赞数量"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="关注人数" :label-width="formLabelWidth" prop="readNum">
          <el-input
            v-model="add.readNum"
            autocomplete="off"
            type="number"
            placeholder="关注人数"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="距离" :label-width="formLabelWidth" prop="len">
          <el-input v-model="add.len" autocomplete="off" placeholder="距离"></el-input>
        </el-form-item>
        <el-form-item label="自我评价" :label-width="formLabelWidth" prop="info">
          <el-input v-model="add.info" autocomplete="off" placeholder="自我评价"></el-input>
        </el-form-item>
        <el-form-item label="免冠照片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="add.img" autocomplete="off" placeholder="上传照片"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native.prevent="addWorker"
          v-if="show"
          :disabled="isDisabled"
        >添加</el-button>
        <el-button type="primary" @click.native.prevent="updateWorker" v-else>修改</el-button>
      </div>
    </el-dialog>
    <!-- 下拉菜单 -->
    <el-select v-model="all" placeholder="全部">
      <el-option label="全部" value="1" @click.native.prevent="findWorker()"></el-option>
      <el-option
        v-for="(item,index) in homeType"
        :key="index"
        :label="item"
        :value="item"
        @click.native.prevent="findWorker(item)"
      ></el-option>
    </el-select>
    <!-- 家政列表 -->
    <el-table :data="worker" height="400" border style="width: 90%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="tel" label="电话" width="150"></el-table-column>
      <el-table-column prop="price" label="价格" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="edu" label="学历" width="100"></el-table-column>
      <el-table-column prop="type" label="服务类型" width="150"></el-table-column>
      <el-table-column prop="address" label="操作">
        <!-- 查看、删除 -->
        <template slot-scope="scope">
          <v-look @click.native.prevent="findWorker2(scope.row.id)"></v-look>
          <v-del @click.native.prevent="open(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import re from "../assets/js/re";
import API from "../util/API";
export default {
  components: {},
  props: [],
  data() {
    var reName = (rule, value, callback) => {
      //姓名
      if (value === "") {
        callback(new Error("此为必填项"));
        this.re.name = false;
        return;
      }
      this.re.name = true;
      console.log("姓名" + this.re.name);
    };
    var reAge = (rule, value, callback) => {
      //年龄
      var re = /^[1-9][0-9]?|100$/;
      if (re.test(value) == false) {
        callback(new Error("年龄格式不正确"));
        this.re.age = false;
        return;
      }
      this.re.age = true;
      console.log("年龄" + this.re.age);
    };
    var reTel = (rule, value, callback) => {
      //电话
      var re = /^1[0123456789]\d{9}$/;
      if (re.test(value) == false) {
        callback(new Error("手机格式不正确"));
        this.re.tel = false;
        return;
      }
      this.re.tel = true;
      console.log("手机" + this.re.tel);
    };
    var reEdu = (rule, value, callback) => {
      //学历
      if (value === "") {
        callback(new Error("此为必填项"));
        this.re.edu = false;
        return;
      }
      this.re.edu = true;
      console.log("学历" + this.re.edu);
    };
    var reYear = (rule, value, callback) => {
      //工作年限
      if (value == "") {
        callback(new Error("此项必填"));
        this.re.year = false;

        return;
      }
      this.re.year = true;
      console.log("年限" + this.re.year);
    };
    var reVnum = (rule, value, callback) => {
      //级别
      var re = /^v[0-9]$/;
      if (re.test(value) == false) {
        callback(new Error("请输入正确的级别格式"));
        this.re.vNum = false;
        return;
      }
      this.re.vNum = true;
      console.log("级别" + this.re.vNum);
    };
    var rePrice = (rule, value, callback) => {
      //价格
      var re = /^(\d)+(元\/每小时)$/;
      if (re.test(value) == false) {
        callback(new Error("请输入正确的价格"));
        this.re.price = false;
        return;
      }
      this.re.price = true;
      console.log("价格" + this.re.price);
    };
    var reCity = (rule, value, callback) => {
      //城市
      if (value === "") {
        callback(new Error("此为必填项"));
        this.re.city = false;
        return;
      }
      this.re.city = true;
      console.log("城市" + this.re.city);
    };
    var reExperience = (rule, value, callback) => {
      //经验
      var re = /^\d+年$/;
      if (re.test(value) == false) {
        callback(new Error("请输入正确的工作经验"));
        this.re.experience = false;
        return;
      }
      this.re.experience = true;
      console.log("经验" + this.re.experience);
    };
    var reLikeNum = (rule, value, callback) => {
      //点赞
      if (value < 0) {
        callback(new Error("请输入正确的点赞数量"));
        this.re.likeNum = false;
        return;
      }
      this.re.likeNum = true;
      console.log("点赞" + this.re.likeNum);
    };
    var reReadNum = (rule, value, callback) => {
      //关注
      if (value < 0) {
        callback(new Error("请输入正确的关注量"));
        this.re.readNum = false;
        return;
      }
      this.re.readNum = true;
      console.log("关注" + this.re.readNum);
    };
    var reLen = (rule, value, callback) => {
      //距离
      var re = /^\d+(km)|\d+\.\d(km)$/;
      if (re.test(value) == false) {
        callback(new Error("请输入正确的距离格式"));
        this.re.len = false;
        return;
      }
      this.re.len = true;
      console.log("距离" + this.re.len);
    };
    var reImg = (rule, value, callback) => {
      //照片
      if (value === "") {
        callback(new Error("此为必填项"));
        this.re.img = false;
        return;
      }
      this.re.img = true;
      console.log("照片" + this.re.img);
    };
    var reInfo = (rule, value, callback) => {
      //自我描述
      if (value === "") {
        callback(new Error("此为必填项"));
        this.re.info = false;
        return;
      }
      this.re.info = true;
      console.log("描述" + this.re.info);
    };
    return {
      formLabelWidth: "100px",
      dialogFormVisible: false,
      isDisabled: false,
      show: false,
      all: "1", //默认全部
      worker: [], //接收到的员工信息
      homeType: [], //接收的家政服务类型
      getQualification: [], //接收的资格证书
      //需要添加的员工类型
      add: {
        img: "",
        name: "",
        age: "",
        edu: "小学", //学历
        year: "", //工作年限
        vNum: "",
        price: "", //收费
        city: "",
        experience: "", //几年经验
        readNum: "", //关注人数
        likeNum: "", //好评
        len: "",
        tel: "",
        info: "", //自我评价
        qualification: [], //资格认证
        type: [] //服务类型
      },
      re: {
        //提交判断
        name: false,
        age: false,
        tel: false,
        year: false,
        vNum: false,
        price: false,
        city: false,
        experience: false,
        likeNum: false,
        readNum: false,
        len: false,
        info: false,
        img: false
      },
      rules: {
        name: [{ required: true, validator: reName, trigger: "blur" }],
        age: [{ required: true, validator: reAge, trigger: "blur" }],
        tel: [{ required: true, validator: reTel, trigger: "blur" }],
        qualification: [
          { required: true, message: "此项必填", trigger: "change" }
        ],
        type: [
          { required: true, message: "请至少选择一项", trigger: "change" }
        ],
        edu: [{ required: true, validator: reEdu, trigger: "blur" }],
        year: [{ required: true, validator: reYear, trigger: "blur" }],
        vNum: [{ required: true, validator: reVnum, trigger: "blur" }],
        price: [{ required: true, validator: rePrice, trigger: "blur" }],
        city: [{ required: true, validator: reCity, trigger: "blur" }],
        experience: [
          { required: true, validator: reExperience, trigger: "blur" }
        ],
        likeNum: [{ required: true, validator: reLikeNum, trigger: "blur" }],
        readNum: [{ required: true, validator: reReadNum, trigger: "blur" }],
        len: [{ required: true, validator: reLen, trigger: "blur" }],
        info: [{ required: true, validator: reInfo, trigger: "blur" }],
        img: [{ required: true, validator: reImg, trigger: "blur" }]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    //添加按钮===================================================
    isadd() {
      this.dialogFormVisible = true;
      this.show = true;
      this.user = {};
    },
    //获取家政服务类型信息===========================================
    find() {
      this.$axios({
        //get请求
        url: API.getHomeType
      }).then(res => {
        console.log(res);
        this.homeType = res.data.type;
        console.log(this.homeType);
      });
    },
    //获取证书类型==============================================
    getCertificate() {
      this.$axios({
        url: API.getQualification
      }).then(res => {
        this.getQualification = res.data.qualification;
      });
    },
    //获取家政员工信息===========================================
    findWorker(type) {
      this.$axios({
        url: API.findHomeWorker,
        method: "get",
        params: {
          type: type
        }
      }).then(res => {
        console.log(res);
        this.worker = res.data.data;
      });
    },
    //查看/修改家政员工==========================================
    findWorker2(id) {
      if (id) {
        this.dialogFormVisible = true;
      }
      this.$axios({
        url: API.findHomeWorker,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        // console.log(res.data.data[0].qualification);
        // console.log(res.data.data[0].type);
        var data = res.data.data[0];
        if (data.qualification.includes("[")) {
          data.qualification = JSON.parse(data.qualification);
        } else {
          data.qualification = data.qualification.split(",");
        }
        if (data.type.includes("[")) {
          data.type = JSON.parse(data.type);
        } else {
          data.type = data.type.split(",");
        }
        this.add = data;
      });
    },
    updateWorker() {
      this.$axios({
        url: API.updateHomeWorker,
        method: "get",
        params: this.add
      }).then(res => {
        console.log(res);
        this.dialogFormVisible = false;
        this.findWorker();
      });
    },
    //删除员工====================================================
    del(id) {
      this.$axios({
        url: API.delHomeWorker,
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
        this.findWorker();
      });
    },
    //删除弹窗===================================================
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
    //添加员工===================================================
    addWorker() {
      var arr = []; //接收判断条件
      for (let item in this.re) {
        arr.push(this.re[item]);
      }
      //判断是否满足提交条件
      if (arr.every(item => item == true)) {
        this.$axios({
          url: API.addHomeWorker,
          params: this.add
        }).then(res => {
          this.findWorker();
          this.dialogFormVisible = false;
        });
      } else {
        this.$message(
          {
            type: "error",
            message: "不满足添加条件"
          },
          console.log(arr)
        );
      }
    },
    //正则======================================================
    changeAge() {
      re.age(this.add.age);
      console.log(re.age(this.add.age));
    }
  },
  created() {},
  mounted() {
    this.find();
    this.findWorker();
    this.getCertificate();
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

  .add {
    padding: 10px 30px;
    color: white;
  }
}
</style>