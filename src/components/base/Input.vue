<template>
  <div class="normal-box">
    <label
      for="employee-code"
      :class="[required ? 'compulsory-label' : '', 'top-label']"
    >
      <slot />
    </label>
    <input
      :type="inputType"
      :class="inputStyle"
      :placeholder="[placeHolder ? placeHolder : '']"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="tool-tip-container">
      <div class="wrong-notif-tooltip">
        {{ notifTooltip ? notifTooltip : "Mã nhân viên không được để trống" }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    inputType: String,
    inputStyle: String,
    modelValue: String,
    required: Boolean,
    placeHolder: String,

    notifTooltip: String,
  },
};
</script>
<style lang="css"></style>
