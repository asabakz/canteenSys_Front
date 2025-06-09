<template>
  <div>
    <el-table :data="orderList" border stripe>
      <!-- 展开行：显示订单中的商品列表 -->
      <el-table-column type="expand">
        <template #default="scope">
          <el-table :data="scope.row.goodsList" border stripe>
            <el-table-column label="商品图片" prop="goodsImage">
              <template #default="scope">
                <el-image
                  :src="scope.row.goodsImage.split(' ')[0]"
                  style="height: 60px; width: 60px; border-radius: 50%;"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column label="名称" prop="goodsName"></el-table-column>
            <el-table-column label="单价" prop="price"></el-table-column>
            <el-table-column label="规格" prop="specName"></el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <!-- 订单基本信息列 -->
      <el-table-column label="姓名"     prop="userName"></el-table-column>
      <el-table-column label="电话"     prop="phone"></el-table-column>
      <el-table-column label="地址"     prop="address"></el-table-column>
      <el-table-column label="价钱"     prop="price"></el-table-column>
      <el-table-column label="下单时间" prop="createTime"></el-table-column>

      <!-- 物流状态列 -->
      <el-table-column label="物流信息" prop="status">
        <template #default="scope">
          <el-tag
            v-if="scope.row.status === '0'"
            type="danger"
            size="normal"
          >待发货</el-tag>
          <el-tag
            v-else-if="scope.row.status === '1'"
            size="normal"
            effect="blank"
          >已发货</el-tag>
          <el-tag
            v-else-if="scope.row.status === '2'"
            size="normal"
            effect="dark"
          >已收货</el-tag>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column  label="操作" width="200" align="center">
        <template #default="scope">
          <el-button
          @click="sendOrder(scope.row.orderId)"
            el-button class="custom-btn"
            :icon="Edit"
            size="large"
            
          >发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="edgeDivide_slot0"
        @current-change="edgeDivide_slot1"
        :current-page.sync="listParm.currentPage"
        :page-sizes="[18, 20, 40, 80, 100]"
        :page-size="listParm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listParm.total"
        background
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../assets/m_button.scss';
import { Edit,Place,Delete,Search, Plus } from '@element-plus/icons-vue';
import userOrderTable from '../../sections/order/userOrderTable'


const {
  order_data: orderList,
  Getlist: getOrderList,
  sendOrder,
  listParm,form_height,Search_slog,Reset,edgeDivide_slot0,edgeDivide_slot1} = userOrderTable()


</script>


<style scoped>
/* 分页容器样式 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>