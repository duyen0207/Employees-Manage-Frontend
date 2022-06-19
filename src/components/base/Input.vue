<template>
  <!-- input dạng text -->
  <div :class="[wrapperStyle ? wrapperStyle : '', 'normal-box']">
    <label :class="[required ? 'compulsory-label' : '', 'top-label']">
      <slot />
    </label>

    <!-- input dạng text, email, date -->
    <input
      v-if="inputType != 'select' && inputType != 'radio'"
      :type="inputType"
      :class="inputStyle"
      :placeholder="[placeHolder ? placeHolder : '']"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- input dạng radio -->
    <div v-if="inputType == 'radio'" id="sex-select-group">
      <div
        class="rows-flexbox horizontal-select-group"
        v-for="(option, index) in optionGroups"
        :key="index"
      >
        <input
          :name="radioName"
          type="radio"
          :value="option.value"
          :checked="modelValue==option.value"
          @change="$emit('update:modelValue', $event.target.value)"
        />
        <label for="">{{ option.label }}</label>
      </div>
    </div>

    <!-- input dạng select -->
    <select
      v-if="inputType == 'select'"
      :class="inputStyle"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="(option, index) in optionGroups"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <div class="tool-tip-container">
      <div class="wrong-notif-tooltip">
        {{ notifTooltip ? notifTooltip : "Mã nhân viên không được để trống" }}
      </div>
    </div>
  </div>

  <!-- input dạng bộ các radio -->
</template>
<script>
export default {
  props: {
    inputType: String,
    inputStyle: String,
    wrapperStyle: String,

    modelValue: String,
    required: Boolean,
    placeHolder: String,

    notifTooltip: String,

    optionGroups: Array,
    radioName: String,
  },
};
</script>
<style lang="css"></style>
