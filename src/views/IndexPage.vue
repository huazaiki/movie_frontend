<template>
  <div>
    <!-- 右上角用户信息按钮 -->
    <div style="position: absolute; top: 20px; right: 20px;">
      <el-button type="primary" @click="showUserInfo">
        <el-icon><User /></el-icon> 用户信息
      </el-button>
    </div>

    <!-- 主体内容 -->
    <h2 style="text-align: center; margin-bottom: 20px;">排片信息</h2>
    <div class="table-container">
      <el-table :data="scheduleList" style="width: 80%; margin: 0 auto;" v-loading="loading">
        <el-table-column prop="schId" label="Schedule ID" min-width="120" align="center"></el-table-column>
        <el-table-column prop="movTitle" label="Movie Title" min-width="200" align="center"></el-table-column>
        <el-table-column prop="cinName" label="Cinema Name" min-width="200" align="center"></el-table-column>
        <el-table-column prop="cinAddress" label="Cinema Address" min-width="250" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cinPhone" label="Cinema Phone" min-width="180" align="center"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        v-model:current-page="pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        class="pagination"
      />
    </div>

    <div style="text-align: center; margin-top: 30px; height: 400px;">
      <el-button type="primary" @click="userLogout">退出登陆</el-button>
    </div>

    <!-- 用户信息弹窗 -->
    <el-dialog v-model="dialogVisible" title="用户信息" :visible.sync="dialogVisible">
      <div v-if="Object.keys(userInfo).length">
        <p>用户名: {{ userInfo.userName }}</p>
        <p>邮箱: {{ userInfo.userEmail }}</p>
        <p>联系方式: {{ userInfo.userPhone }}</p>
      </div>
      <div v-else>
        <p>用户信息加载中...</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/main';
import { User } from '@element-plus/icons-vue';

export default {
  data() {
    return {
      scheduleList: [],
      loading: false,
      pageNum: 1, // 当前页码
      total: 1,
      dialogVisible: false,
      userInfo: {}, // 初始化为空对象，确保正确渲染
      userId: sessionStorage.getItem('userId'), // 假设从sessionStorage中获取userId
    };
  },
  components: {
    User,
  },
  created() {
    this.fetchScheduleData();
  },
  methods: {
    async fetchScheduleData() {
      try {
        this.loading = true;
        const response = await axios.get(`/api/v1/consumer/info/listMoviesByPage/${this.pageNum}/5`);
        if (response.data.code === 200) {
          this.scheduleList = response.data.data.list;
          this.total = response.data.data.total;
        } else {
          console.error('Failed to load schedule data:', response.data.msg);
        }
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
      } finally {
        this.loading = false;
      }
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.fetchScheduleData();
    },
    userLogout() {
      sessionStorage.removeItem('userId');
      router.push('/');
    },
    // 显示用户信息弹窗
    showUserInfo() {
      this.dialogVisible = true;
      this.getUserInfo(); // 获取用户信息
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const response = await axios.get(`/api/v1/consumer/info/user/${this.userId}`);
        if (response.data.code === 200) {
          this.userInfo = response.data.data;
        } else {
          console.warn('获取用户信息失败:', response.data.message);
        }
      } catch (error) {
        console.error('获取用户信息出错:', error);
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  position: relative;
  width: 80%;
  margin: 0 auto;
}

.pagination {
  position: absolute;
  bottom: -50px; /* 根据需要调整 */
  right: 20px;  /* 与右端的距离 */
}
</style>
