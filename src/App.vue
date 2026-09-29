<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    Y2加入者一覧作成ツール
      <nav>
        <RouterLink to="/">ファイルアップロード</RouterLink>
        <RouterLink to="/regist">出力内容確認</RouterLink>
        <RouterLink to="/order">作成履歴</RouterLink>
      </nav>
  
  </header>
  <main class="app-main">
  <RouterView />
  </main>
</template>

<style scoped>
header {
  position: sticky;
  text-align:center;
  padding:20px 0;
  top:0;
  background-color: white;
  z-index: 1000;
  border-bottom: 1px solid #ddd;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  font: 16px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  flex:1;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
.app-header {
  text-align: center;
  padding: 20px 0;
}

.app-main {
  display: flex;
  justify-content: center;
}
</style>