<template>
  <div class="type" :style="styleObject">
    <p>{{typeName}}</p>
  </div>
</template>

<script>

export default {

  props: {
    typeName: String,
  },

  computed: {
    styleObject () {
      return {
        background: this.colors.colorType,
        color: this.colors.colorFont,
      };
    },

    colors () {
      if (this.typeName === 'fire') {
        return {
          colorType: '#ff912e',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'grass') {
        return {
          colorType: '#9bcc50',
          colorFont: '#000',
        };
      }
      if (this.typeName === 'poison') {
        return {
          colorType: '#b97fc9',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'water') {
        return {
          colorType: '#4592c4',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'flying') {
        return {
          colorType: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'bug') {
        return {
          colorType: '#729f3f',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'normal') {
        return {
          colorType: '#b3babd',
          colorFont: '#000',
        };
      }
      if (this.typeName === 'electric') {
        return {
          colorType: '#eed535',
          colorFont: '#000',
        };
      }
      if (this.typeName === 'ground') {
        return {
          colorType: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
          colorFont: '#000',
        };
      }
      if (this.typeName === 'fairy') {
        return {
          colorType: '#fdb9e9',
          colorFont: '#000',
        };
      }
      if (this.typeName === 'fighting') {
        return {
          colorType: '#d56723',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'psychic') {
        return {
          colorType: '#f366b9',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'rock') {
        return {
          colorType: '#a38c21',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'steel') {
        return {
          colorType: '#9eb7b8',
          colorFont: '#000',
        };
      }
      if (this.typeName === 'ghost') {
        return {
          colorType: '#7b62a3',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'ice') {
        return {
          colorType: '#51c4e7',
          colorFont: '#212121',
        };
      }
      if (this.typeName === 'dragon') {
        return {
          colorType: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
          colorFont: '#fff',
        };
      }
      if (this.typeName === 'dark') {
        return {
          colorType: '#707070',
          colorFont: '#fff',
        };
      }

      return {
        colorType: '#000',
        colorFont: '#fff',
      };
    },
  },

};
</script>

<style lang="scss">
.type {
  display: inline-block;
  // float: left;
  margin-left: 10px;
  border-radius: 3px;
  width: 75px;
  height: 20px;
  text-align: center;

  p {
    margin: 0 1.5625% 0 0;
    line-height: 18px;
    font-size: 11px;
  }

  p:first-letter {
    text-transform: uppercase;
  }
}
</style>
