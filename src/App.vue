<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  NInputNumber,
  NGrid,
  NCard,
  NGridItem,
} from "naive-ui";
import { calculate } from "./utils/calculator";
import { format } from "./utils/format";
import { setConfig, getConfig } from "./utils/storage";

import { reactive, computed } from "vue";
import { watchEffect } from "vue";
import { useWindowSize } from '@vueuse/core';

const state = reactive(getConfig());
const result = computed(() => calculate(state));
watchEffect(() => setConfig(state));

const { width } = useWindowSize();
const isSmallScreen = computed(() => width.value < 768);
const gridCols = computed(() => (isSmallScreen.value ? 1 : 3));
</script>

<template>
  <n-config-provider style="padding: 20px">
    <NGlobalStyle />
    <n-grid :cols="gridCols" :x-gap="12" :y-gap="12">
      <n-grid-item>
        <label for="equity">Equity</label>
        <n-input-number
          id="equity"
          v-model:value="state.equity"
          size="large"
          :min="0"
        >
          <template #prefix> $ </template>
        </n-input-number>
      </n-grid-item>
      <n-grid-item>
        <label for="riskRatio">Risk Ratio</label>
        <n-input-number
          id="riskRatio"
          v-model:value="state.riskRatio"
          size="large"
          :min="1"
          :max="100"
        >
          <template #suffix> % </template>
        </n-input-number>
      </n-grid-item>
      <n-grid-item>
        <label for="riskReward">Risk Reward</label>
        <n-input-number
          id="riskReward"
          v-model:value="state.riskReward"
          size="large"
          :min="1"
        >
          <template #suffix> RR </template>
        </n-input-number>
      </n-grid-item>
    </n-grid>
    <br />
    <n-grid :cols="isSmallScreen.value ? 1 : 2" :x-gap="12" :y-gap="12">
      <n-grid-item>
        <n-card title="Target">
          <strong style="font-size: x-large; color: #555">
            {{ format(result.profit) }}
          </strong>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Drawdown">
          <strong style="font-size: x-large; color: #f00">
            {{ format(result.maxDrawdown) }}
          </strong>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-config-provider>
</template>
