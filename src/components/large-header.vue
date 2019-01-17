<template>
    <div class="mianHeader">
        <a @click="$router.go(-1)">
        <i class="arrow_forward"></i>
        </a>
        <p><slot></slot></p>
        <img src="@/../image/mainWhite.png">
    </div>
</template>
