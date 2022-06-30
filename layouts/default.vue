<template>
  <div
    class="he-min-100vh he-max-100vh wi-min-100vw wi-min-100vh di-flex ai-stretch background-black-tint-1 text-white"
  >
    <div class="col-2 di-none sm:di-block">
      <div class="py-5 px-2 md:px-5 di-flex ai-center">
        <main-flock-logo class="mx-2"></main-flock-logo>
        <div
          class="flex-grow-1 te-center md:te-left fs-7 md:di-block di-none ml-2 text-tertiary-tint-6"
        >
          Flock
        </div>
      </div>
      <div class="py-5 px-2 md:px-5">
        <a-item to="/" v-ripple icon="home" class="ro-5 my-2" justify="center">
          <div class="te-center md:te-left">Home</div>
        </a-item>
        <a-item
          v-ripple
          to="/focus-session"
          class="ro-5 my-2"
          icon="circle-slice-2"
        >
          <div class="te-center lg:te-left">Focus session</div>
        </a-item>
      </div>
    </div>
    <div
      class="col-12 sm:col-10 di-flex fl-column background-black-tint-2 sm:my-5 bloom-2-black-blend-8 md:ro-left-4 ov-hidden"
    >
      <slot></slot>
      <a-bottom-bar>
        <a-bottom-bar-item
          to="/"
          color="tertiary"
          v-ripple
          icon="home"
          justify="center"
        >
          Home
        </a-bottom-bar-item>
        <a-bottom-bar-item
          v-ripple
          color="tertiary"
          to="/focus-session"
          icon="circle-slice-2"
        >
          Focus session
        </a-bottom-bar-item>
      </a-bottom-bar>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
