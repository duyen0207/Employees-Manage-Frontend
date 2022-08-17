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
      :class="[inputStyle, styleWrongInput]"
      :placeholder="[placeHolder ? placeHolder : '']"
      :value="modelValue"
      @focus="turnOffWrongNotif"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- input dạng radio -->
    <div v-if="inputType == 'radio'" id="sex-select-group">
      <div
        class="rows-flexbox horizontal-select-group"
        v-for="(option, index) in optionGroups"
        :key="index"
      >
        <label class="custom-radio-container">
          <input
            :name="radioName"
            class="custom-radio-input"
            type="radio"
            :value="option.value"
            :checked="modelValue == option.value"
            @focus="turnOffWrongNotif"
            @change="$emit('update:modelValue', $event.target.value)"
          />
          {{ option.label }}
          <span class="custom-radio-checkmark"><span></span></span>
        </label>
      </div>
    </div>

    <!-- input dạng select -->
    <select
      v-if="inputType == 'select'"
      :class="[inputStyle, styleWrongInput]"
      :value="modelValue"
      @focus="turnOffWrongNotif"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option
        class="custom-select-option"
        v-for="(option, index) in optionGroups"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <div class="tool-tip-container">
      <div
        v-show="showWrongNotif"
        v-if="notifTooltip ? true : false"
        class="wrong-notif-tooltip"
      >
        {{ notifTooltip ? notifTooltip : "" }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showWrongNotif: false,
      styleWrongInput: "",
    };
  },
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

  methods: {
    // tắt thông báo lỗi
    turnOffWrongNotif() {
      this.showWrongNotif = false;
      this.styleWrongInput = "";
      this.$emit("inputFocus");
    },
    // bật thông báo lỗi
    turnOnWrongNotif() {
      this.showWrongNotif = true;
      this.styleWrongInput = "wrong-input";
    },
  },
};
</script>
<style lang="css"></style>
