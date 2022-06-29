<template>
  <div
    class="he-min-100vh he-max-100vh wi-min-100vw wi-min-100vh di-flex ai-stretch background-black-tint-1 text-white"
  >
    <div class="col-2">
      <div class="py-5 px-2 md:px-5">
        <a-item v-ripple icon="home" class="ro-2 my-2" justify="center">
          <div class="te-center md:te-left">Home</div>
        </a-item>
        <a-item v-ripple class="ro-2 my-2" icon="text-box-multiple">
          <div class="te-center md:te-left">Tasks</div>
        </a-item>
        <a-item v-ripple class="ro-2 my-2" icon="circle-slice-2">
          <div class="te-center md:te-left">Focus session</div>
        </a-item>
        <a-item v-ripple class="ro-2 my-2" icon="progress-check">
          <div class="te-center md:te-left">Sessions</div>
        </a-item>
      </div>
    </div>
    <div
      class="col-10 di-flex fl-column background-black-tint-2 my-5 bloom-2-black-blend-8 ro-left-4 ov-hidden"
    >
      <div class="background-primary">
        <!--  <div class="fs-8 fw-7 ma-4 text-primary-tint-9">
          <div class="te-center">New focus session</div>
        </div> -->
      </div>

      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
