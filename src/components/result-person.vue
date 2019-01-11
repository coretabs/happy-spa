<template>
    <div class="personPost">
        <a href="#">
            <img src="@/../image/puppy.jpg">
        </a>
        <p>علق<a href="#" class="personName"> {{isResult.name}} </a>على صورتك
        <br>
        <span>الوقت</span>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        isResult: Object
    }
}
</script>

