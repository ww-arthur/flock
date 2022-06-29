<template>
  <div
    class="he-min-100vh he-max-100vh wi-min-100vw wi-min-100vh di-flex ai-stretch background-black-tint-1 text-white"
  >
    <div class="col-2">
      <a-item v-ripple icon="home">Home</a-item>
    </div>
    <div
      class="col-10 di-flex fl-column background-black-tint-2 my-5 bloom-2-black-blend-8 ro-left-4 ov-hidden"
    >
      <div class="background-primary">
        <div class="fs-8 fw-7 ma-4 text-primary-tint-9">Focus session</div>
      </div>
      <div
        class="oy-auto ox-hidden fl-grow-1 fl-column di-flex jc-center ai-center"
      >
        <main-timer></main-timer>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
